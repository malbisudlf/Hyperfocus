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
  todayCount: 0,          // ideas leídas hoy
  lastActiveDay: null,    // "YYYY-MM-DD" del último día con lectura
  streak: 0,
  bestStreak: 0,
  goalCelebrated: false,  // ya se mostró el toast hoy
};

let state = loadState();
let queue = [];           // cola de ideas del feed
let currentIdea = null;

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
function initOnboarding() {
  const grid = $("#interest-grid");
  grid.innerHTML = TOPICS.map(
    (t) => `<button class="interest-chip" data-topic="${t.id}"><span>${t.emoji}</span>${t.name}</button>`
  ).join("");

  const selected = new Set();
  grid.addEventListener("click", (e) => {
    const chip = e.target.closest(".interest-chip");
    if (!chip) return;
    const id = chip.dataset.topic;
    if (selected.has(id)) { selected.delete(id); chip.classList.remove("selected"); }
    else { selected.add(id); chip.classList.add("selected"); }
    $("#btn-interests").disabled = selected.size < 3;
  });

  $("#btn-start").addEventListener("click", () => showStep(2));
  $("#btn-interests").addEventListener("click", () => {
    state.interests = [...selected];
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
  currentIdea = queue.shift();
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
  stage.innerHTML = `
    <article class="idea-card" data-id="${idea.id}">
      <span class="idea-topic" style="color:${topic.color}">${topic.emoji} ${topic.name}</span>
      <h3 class="idea-title">${escapeHtml(idea.title)}</h3>
      <p class="idea-body">${escapeHtml(idea.body)}</p>
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

function toggleSave(id) {
  const idx = state.savedIds.indexOf(id);
  if (idx >= 0) state.savedIds.splice(idx, 1);
  else state.savedIds.push(id);
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

function initExplore() {
  const list = $("#topic-list");
  list.innerHTML =
    `<button class="topic-pill selected" data-topic="">✨ Todos</button>` +
    TOPICS.map((t) => `<button class="topic-pill" data-topic="${t.id}">${t.emoji} ${t.name}</button>`).join("");

  list.addEventListener("click", (e) => {
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
  const saved = IDEAS.filter((i) => state.savedIds.includes(i.id));
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
  initOnboarding();
  initExplore();
  initProfile();
  initNav();

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
