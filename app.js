// ============================================================
// Hyperfocus — lógica de la app
// Todo el estado vive en localStorage: sin servidor, sin cuentas.
// ============================================================

const STORAGE_KEY = "hyperfocus-state-v1";

const defaultState = {
  onboarded: false,
  interests: [],          // ids de temas
  dailyGoal: 5,           // ideas por día
  readIds: [],            // ideas leídas (histórico)
  savedIds: [],           // ideas guardadas
  savedDynamic: [],       // tarjetas dinámicas guardadas (objeto completo)
  dynamicMigrated: false, // migración: activar «Descubre» a usuarios previos
  todayCount: 0,          // ideas leídas hoy
  lastActiveDay: null,    // "YYYY-MM-DD" del último día con lectura
  streak: 0,
  bestStreak: 0,
  goalCelebrated: false,  // ya se mostró el toast hoy
};

let state = loadState();
let queue = [];           // cola de ideas del feed
let currentIdea = null;

// ---------- catálogo externo ----------
// La app arranca con las ideas incluidas en data.js y luego sincroniza
// con IDEAS_SOURCE_URL. La última descarga se cachea en localStorage
// para que el catálogo completo funcione también sin conexión.
const CATALOG_CACHE_KEY = "hyperfocus-catalog-v1";
const BUILTIN_COUNT = IDEAS.length;
let catalogStatus = "local"; // local | cache | online | error

function mergeCatalog(ext) {
  if (!ext || !Array.isArray(ext.ideas)) return false;
  let changed = false;
  (ext.topics || []).forEach((t) => {
    if (t && t.id && t.name && !TOPICS.some((x) => x.id === t.id)) {
      TOPICS.push({ emoji: "💡", color: "#9aa1bd", ...t });
      changed = true;
    }
  });
  ext.ideas.forEach((i) => {
    if (!i || !i.id || !i.title || !i.body || !TOPICS.some((t) => t.id === i.topic)) return;
    const idx = IDEAS.findIndex((x) => x.id === i.id);
    if (idx >= 0) IDEAS[idx] = i;
    else IDEAS.push(i);
    changed = true;
  });
  return changed;
}

function loadCachedCatalog() {
  try {
    const raw = localStorage.getItem(CATALOG_CACHE_KEY);
    if (raw && mergeCatalog(JSON.parse(raw))) catalogStatus = "cache";
  } catch { /* caché corrupta: se ignora */ }
}

async function fetchCatalog() {
  try {
    const res = await fetch(IDEAS_SOURCE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(data));
    mergeCatalog(data);
    catalogStatus = "online";
    onCatalogUpdated();
  } catch {
    if (catalogStatus !== "cache") catalogStatus = "error";
    renderCatalogInfo();
  }
}

// Refresca las vistas que dependen del catálogo sin interrumpir
// la tarjeta que el usuario esté leyendo.
function onCatalogUpdated() {
  if (!state.onboarded) renderOnboardingInterests();
  renderTopicPills();
  renderExplore();
  if (state.onboarded) {
    buildQueue();
    if (!currentIdea) nextCard();
    renderProfile();
  }
  renderCatalogInfo();
}

// ---------- fuente dinámica: Wikipedia en español ----------
// El tema «Descubre» se alimenta en vivo de la API pública de Wikimedia
// (gratuita, sin claves, con CORS abierto): resúmenes de artículos al
// azar y efemérides del día. Contenido infinito sin mantener nada.
const WIKI_RANDOM_URL = "https://es.wikipedia.org/api/rest_v1/page/random/summary";
const WIKI_ONTHISDAY_URL = () => {
  const d = new Date();
  return `https://es.wikipedia.org/api/rest_v1/feed/onthisday/events/${d.getMonth() + 1}/${d.getDate()}`;
};

let wikiBuffer = [];        // tarjetas dinámicas listas para el feed
let wikiFetching = false;
let onThisDayPool = null;   // efemérides de hoy (se piden una vez por sesión)
let readsSinceDynamic = 0;  // para intercalar 1 dinámica cada 3 tarjetas

function dynamicActive() {
  return state.interests.includes("descubre");
}

async function fetchRandomWikiCard() {
  const res = await fetch(WIKI_RANDOM_URL);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const p = await res.json();
  // Solo artículos normales con un resumen con sustancia
  if (p.type !== "standard" || !p.extract || p.extract.length < 120) return null;
  return {
    id: "wiki-" + p.pageid,
    topic: "descubre",
    title: p.title,
    body: p.extract.length > 420 ? p.extract.slice(0, 400).trimEnd() + "…" : p.extract,
    url: p.content_urls && p.content_urls.desktop ? p.content_urls.desktop.page : null,
    source: "Wikipedia · CC BY-SA",
  };
}

async function fetchOnThisDayCard() {
  if (onThisDayPool === null) {
    const res = await fetch(WIKI_ONTHISDAY_URL());
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    onThisDayPool = shuffle((data.events || []).filter((e) => e.text && e.year));
  }
  const e = onThisDayPool.pop();
  if (!e) return null;
  const page = (e.pages && e.pages[0]) || null;
  return {
    id: "wiki-otd-" + e.year + "-" + Math.random().toString(36).slice(2, 7),
    topic: "descubre",
    title: `Tal día como hoy, en ${e.year}`,
    body: e.text,
    url: page && page.content_urls && page.content_urls.desktop ? page.content_urls.desktop.page : null,
    source: "Wikipedia · CC BY-SA",
  };
}

async function refillWikiBuffer() {
  if (wikiFetching || !dynamicActive() || wikiBuffer.length >= 4) return;
  wikiFetching = true;
  try {
    // Mezcla: 3 artículos al azar + 1 efeméride por tanda
    const fetchers = [fetchRandomWikiCard(), fetchRandomWikiCard(), fetchRandomWikiCard(), fetchOnThisDayCard()];
    const results = await Promise.allSettled(fetchers);
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value && !wikiBuffer.some((c) => c.id === r.value.id)) {
        wikiBuffer.push(r.value);
      }
    });
  } catch { /* sin red: el feed sigue con el catálogo local */ }
  wikiFetching = false;
}

function renderCatalogInfo() {
  const el = $("#catalog-info");
  if (!el) return;
  const extra = IDEAS.length - BUILTIN_COUNT;
  const statusText = {
    online: `sincronizado con la fuente externa (+${extra} ideas)`,
    cache: `sin conexión — usando la última copia descargada (+${extra} ideas)`,
    error: "no se pudo cargar la fuente externa — usando ideas locales",
    local: "usando ideas locales",
  }[catalogStatus];
  el.textContent = `${IDEAS.length} ideas en el catálogo · ${statusText}`;
}

// ---------- persistencia ----------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---------- fechas y racha ----------
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

// Al abrir la app: si cambió el día, resetea el contador diario
// y rompe la racha si se saltó más de un día.
function syncDay() {
  const today = todayKey();
  if (state.lastActiveDay === today) return;
  state.todayCount = 0;
  state.goalCelebrated = false;
  if (state.lastActiveDay && daysBetween(state.lastActiveDay, today) > 1) {
    state.streak = 0;
  }
  saveState();
}

// Registra una idea leída y actualiza racha/meta.
function registerRead(idea) {
  const today = todayKey();
  if (!state.readIds.includes(idea.id)) state.readIds.push(idea.id);

  if (state.lastActiveDay !== today) {
    const consecutive = state.lastActiveDay && daysBetween(state.lastActiveDay, today) === 1;
    state.streak = consecutive ? state.streak + 1 : 1;
    state.lastActiveDay = today;
  }
  state.bestStreak = Math.max(state.bestStreak, state.streak);
  state.todayCount++;

  if (state.todayCount === state.dailyGoal && !state.goalCelebrated) {
    state.goalCelebrated = true;
    showGoalToast();
  }
  saveState();
  renderProgress();
}

// ---------- utilidades ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function topicById(id) {
  return TOPICS.find((t) => t.id === id);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---------- onboarding ----------
const onboardingSelected = new Set();

function renderOnboardingInterests() {
  $("#interest-grid").innerHTML = TOPICS.map(
    (t) =>
      `<button class="interest-chip ${onboardingSelected.has(t.id) ? "selected" : ""}" data-topic="${t.id}"><span>${t.emoji}</span>${t.name}</button>`
  ).join("");
}

function initOnboarding() {
  renderOnboardingInterests();

  $("#interest-grid").addEventListener("click", (e) => {
    const chip = e.target.closest(".interest-chip");
    if (!chip) return;
    const id = chip.dataset.topic;
    if (onboardingSelected.has(id)) { onboardingSelected.delete(id); chip.classList.remove("selected"); }
    else { onboardingSelected.add(id); chip.classList.add("selected"); }
    $("#btn-interests").disabled = onboardingSelected.size < 3;
  });

  $("#btn-start").addEventListener("click", () => showStep(2));
  $("#btn-interests").addEventListener("click", () => {
    state.interests = [...onboardingSelected];
    showStep(3);
  });

  $("#goal-options").addEventListener("click", (e) => {
    const opt = e.target.closest(".goal-option");
    if (!opt) return;
    $$("#goal-options .goal-option").forEach((o) => o.classList.remove("selected"));
    opt.classList.add("selected");
  });

  $("#btn-goal").addEventListener("click", () => {
    const sel = $("#goal-options .goal-option.selected");
    state.dailyGoal = parseInt(sel.dataset.goal, 10);
    state.onboarded = true;
    saveState();
    startApp();
  });
}

function showStep(n) {
  $$(".onboarding-step").forEach((s) => s.classList.toggle("hidden", s.dataset.step !== String(n)));
}

// ---------- feed (Hoy) ----------
function buildQueue() {
  const pool = IDEAS.filter((i) => state.interests.includes(i.topic));
  const unread = pool.filter((i) => !state.readIds.includes(i.id));
  // Primero las no leídas; si se acaban, recicla todas barajadas.
  queue = unread.length > 0 ? shuffle(unread) : shuffle(pool);
}

function nextCard() {
  if (queue.length === 0) buildQueue();
  // Intercala una tarjeta dinámica de Wikipedia cada 3 lecturas
  if (dynamicActive() && wikiBuffer.length > 0 && readsSinceDynamic >= 2) {
    currentIdea = wikiBuffer.shift();
    readsSinceDynamic = 0;
  } else {
    currentIdea = queue.shift() || wikiBuffer.shift() || null;
    readsSinceDynamic++;
  }
  refillWikiBuffer();
  renderCard(currentIdea);
}

function renderCard(idea) {
  const stage = $("#card-stage");
  if (!idea) {
    stage.innerHTML = `<div class="empty-state"><span class="big">🌵</span><p>No hay ideas para tus intereses.<br>Añade más temas en tu perfil.</p></div>`;
    return;
  }
  const topic = topicById(idea.topic);
  const isSaved = state.savedIds.includes(idea.id);
  const sourceLink = idea.url
    ? `<a class="idea-source" href="${escapeHtml(idea.url)}" target="_blank" rel="noopener">${escapeHtml(idea.source || "Fuente")} ↗</a>`
    : "";
  stage.innerHTML = `
    <article class="idea-card" data-id="${idea.id}">
      <span class="idea-topic" style="color:${topic.color}">${topic.emoji} ${topic.name}</span>
      <h3 class="idea-title">${escapeHtml(idea.title)}</h3>
      <p class="idea-body">${escapeHtml(idea.body)}</p>
      ${sourceLink}
      ${isSaved ? '<span class="idea-saved-badge">✓ Guardada</span>' : ""}
    </article>`;
  const saveBtn = $("#btn-save");
  saveBtn.classList.toggle("saved", isSaved);
}

function skipCard() {
  if (!currentIdea) return;
  registerRead(currentIdea);
  const card = $("#card-stage .idea-card");
  if (card) {
    card.classList.add("swipe-out");
    setTimeout(nextCard, 200);
  } else {
    nextCard();
  }
}

function findIdeaById(id) {
  return (
    IDEAS.find((i) => i.id === id) ||
    state.savedDynamic.find((i) => i.id === id) ||
    (currentIdea && currentIdea.id === id ? currentIdea : null)
  );
}

function toggleSave(id) {
  const idx = state.savedIds.indexOf(id);
  if (idx >= 0) {
    state.savedIds.splice(idx, 1);
    state.savedDynamic = state.savedDynamic.filter((i) => i.id !== id);
  } else {
    state.savedIds.push(id);
    // Las tarjetas dinámicas no existen en el catálogo local:
    // se guarda el objeto completo para que persista entre sesiones.
    if (!IDEAS.some((i) => i.id === id)) {
      const card = findIdeaById(id);
      if (card) state.savedDynamic.push(card);
    }
  }
  saveState();
}

// ---------- progreso diario ----------
function renderProgress() {
  const pct = Math.min(100, (state.todayCount / state.dailyGoal) * 100);
  const fill = $("#progress-fill");
  fill.style.width = `${pct}%`;
  fill.classList.toggle("done", pct >= 100);
  $("#progress-detail").textContent = `${state.todayCount} / ${state.dailyGoal} ideas`;
  $("#progress-label").textContent = pct >= 100 ? "¡Meta cumplida! 🎉" : "Meta de hoy";
  $("#streak-count").textContent = state.streak;
}

function showGoalToast() {
  const toast = $("#goal-toast");
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

// ---------- explorar ----------
let exploreTopic = null;

function renderTopicPills() {
  // Solo temas con ideas en el catálogo; los dinámicos («Descubre»)
  // viven en el feed, no en el buscador.
  const withIdeas = TOPICS.filter((t) => IDEAS.some((i) => i.topic === t.id));
  $("#topic-list").innerHTML =
    `<button class="topic-pill ${!exploreTopic ? "selected" : ""}" data-topic="">✨ Todos</button>` +
    withIdeas.map(
      (t) => `<button class="topic-pill ${exploreTopic === t.id ? "selected" : ""}" data-topic="${t.id}">${t.emoji} ${t.name}</button>`
    ).join("");
}

function initExplore() {
  renderTopicPills();

  $("#topic-list").addEventListener("click", (e) => {
    const pill = e.target.closest(".topic-pill");
    if (!pill) return;
    $$("#topic-list .topic-pill").forEach((p) => p.classList.remove("selected"));
    pill.classList.add("selected");
    exploreTopic = pill.dataset.topic || null;
    renderExplore();
  });

  $("#search-input").addEventListener("input", renderExplore);
}

function renderExplore() {
  const q = $("#search-input").value.trim().toLowerCase();
  let results = IDEAS;
  if (exploreTopic) results = results.filter((i) => i.topic === exploreTopic);
  if (q) results = results.filter((i) => (i.title + " " + i.body).toLowerCase().includes(q));
  $("#explore-results").innerHTML = results.length
    ? results.map(ideaRowHtml).join("")
    : `<div class="empty-state"><span class="big">🔍</span><p>Sin resultados para tu búsqueda.</p></div>`;
}

// ---------- guardadas ----------
function renderSaved() {
  const saved = state.savedIds.map(findIdeaById).filter(Boolean);
  $("#saved-count-label").textContent = saved.length
    ? `${saved.length} idea${saved.length !== 1 ? "s" : ""} en tu biblioteca`
    : "";
  $("#saved-list").innerHTML = saved.length
    ? saved.map(ideaRowHtml).join("")
    : `<div class="empty-state"><span class="big">🔖</span><p>Aún no has guardado ideas.<br>Toca «Guardar» en las tarjetas que te inspiren.</p></div>`;
}

function ideaRowHtml(idea) {
  const topic = topicById(idea.topic);
  const isSaved = state.savedIds.includes(idea.id);
  return `
    <div class="idea-row" data-id="${idea.id}">
      <div class="idea-row-top">
        <span class="idea-topic" style="color:${topic.color}">${topic.emoji} ${topic.name}</span>
        <button class="row-save ${isSaved ? "saved" : ""}" data-save="${idea.id}" title="Guardar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="${isSaved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
      <h4>${escapeHtml(idea.title)}</h4>
      <p>${escapeHtml(idea.body)}</p>
      ${idea.url ? `<a class="idea-source" href="${escapeHtml(idea.url)}" target="_blank" rel="noopener">${escapeHtml(idea.source || "Fuente")} ↗</a>` : ""}
    </div>`;
}

// Delegación: guardar/quitar desde cualquier lista
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-save]");
  if (!btn) return;
  toggleSave(btn.dataset.save);
  renderSaved();
  renderExplore();
  if (currentIdea) renderCard(currentIdea);
  renderStats();
});

// ---------- perfil ----------
function renderStats() {
  $("#stat-streak").textContent = state.streak;
  $("#stat-read").textContent = state.readIds.length;
  $("#stat-saved").textContent = state.savedIds.length;
  $("#stat-best").textContent = state.bestStreak;
}

function initProfile() {
  // meta diaria
  const opts = $("#profile-goal-options");
  opts.addEventListener("click", (e) => {
    const opt = e.target.closest(".goal-option");
    if (!opt) return;
    state.dailyGoal = parseInt(opt.dataset.goal, 10);
    saveState();
    renderProfile();
    renderProgress();
  });

  // intereses editables
  const grid = $("#profile-interests");
  grid.addEventListener("click", (e) => {
    const chip = e.target.closest(".interest-chip");
    if (!chip) return;
    const id = chip.dataset.topic;
    const idx = state.interests.indexOf(id);
    if (idx >= 0) {
      if (state.interests.length <= 1) return; // mínimo un interés
      state.interests.splice(idx, 1);
    } else {
      state.interests.push(id);
    }
    saveState();
    buildQueue();
    renderProfile();
  });

  $("#btn-reset").addEventListener("click", () => {
    if (!confirm("¿Seguro? Se borrará todo tu progreso y tus ideas guardadas.")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

function renderProfile() {
  renderStats();
  renderCatalogInfo();
  $$("#profile-goal-options .goal-option").forEach((o) =>
    o.classList.toggle("selected", parseInt(o.dataset.goal, 10) === state.dailyGoal)
  );
  $("#profile-interests").innerHTML = TOPICS.map(
    (t) =>
      `<button class="interest-chip ${state.interests.includes(t.id) ? "selected" : ""}" data-topic="${t.id}"><span>${t.emoji}</span>${t.name}</button>`
  ).join("");
}

// ---------- navegación ----------
function initNav() {
  $$(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.dataset.view;
      $$(".view").forEach((v) => v.classList.add("hidden"));
      $(`#view-${view}`).classList.remove("hidden");
      if (view === "saved") renderSaved();
      if (view === "explore") renderExplore();
      if (view === "profile") renderProfile();
      window.scrollTo(0, 0);
    });
  });
}

// ---------- arranque ----------
function startApp() {
  $("#onboarding").classList.add("hidden");
  $("#app").classList.remove("hidden");
  syncDay();
  buildQueue();
  nextCard();
  renderProgress();
}

function init() {
  loadCachedCatalog(); // aplica la última copia descargada antes de pintar nada

  // Migración: activar «Descubre» una vez a quien ya usaba la app
  if (state.onboarded && !state.dynamicMigrated) {
    if (!state.interests.includes("descubre")) state.interests.push("descubre");
    state.dynamicMigrated = true;
    saveState();
  }
  if (!state.onboarded) { state.dynamicMigrated = true; saveState(); }

  initOnboarding();
  initExplore();
  initProfile();
  initNav();
  fetchCatalog();      // sincroniza en segundo plano con la fuente externa
  refillWikiBuffer();  // precarga tarjetas dinámicas de Wikipedia

  $("#btn-skip").addEventListener("click", skipCard);
  $("#btn-save").addEventListener("click", () => {
    if (!currentIdea) return;
    toggleSave(currentIdea.id);
    renderCard(currentIdea);
  });

  // Teclado: → siguiente, S guardar
  document.addEventListener("keydown", (e) => {
    if ($("#app").classList.contains("hidden")) return;
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") skipCard();
    if (e.key.toLowerCase() === "s") $("#btn-save").click();
  });

  if (state.onboarded) startApp();
  else $("#onboarding").classList.remove("hidden");
}

init();
