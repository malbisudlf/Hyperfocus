// ============================================================
// Hyperfocus — lógica de la app
// Todo el estado vive en localStorage: sin servidor, sin cuentas.
// ============================================================

const STORAGE_KEY = "hyperfocus-state-v1";
const APP_VERSION = 6; // súbelo junto con los ?v= de index.html

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

// ---------- fuente dinámica: Wikipedia en español ----------
// TODOS los temas se alimentan en vivo de la API pública de Wikimedia
// (gratuita, sin claves, con CORS abierto). Cada tema busca artículos
// relacionados con sus términos semilla, con desplazamiento aleatorio
// para variar los resultados: contenido casi ilimitado sin mantener nada.
// «Descubre» usa además artículos al azar y efemérides del día.
const WIKI_RANDOM_URL = "https://es.wikipedia.org/api/rest_v1/page/random/summary";
const WIKI_ONTHISDAY_URL = () => {
  const d = new Date();
  return `https://es.wikipedia.org/api/rest_v1/feed/onthisday/events/${d.getMonth() + 1}/${d.getDate()}`;
};
const WIKI_SEARCH_URL = (query, offset) =>
  "https://es.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*" +
  `&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&gsroffset=${offset}` +
  "&prop=extracts%7Cinfo%7Cdescription&exintro=1&explaintext=1&exlimit=max&inprop=url";

// Categorías de Wikipedia por tema: agrupan artículos de CONCEPTOS
// (técnicas, efectos, fenómenos), que es lo que queremos en el feed.
// Si una categoría no existe o viene vacía, se usa la búsqueda de
// respaldo (TOPIC_QUERIES) con los mismos filtros de calidad.
const TOPIC_CATEGORIES = {
  enfoque:       ["Atención", "Atención plena", "Meditación"],
  productividad: ["Gestión del tiempo", "Productividad", "Toma de decisiones"],
  habitos:       ["Hábitos", "Motivación", "Comportamiento humano"],
  mentalidad:    ["Sesgos cognitivos", "Psicología positiva", "Estoicismo", "Emociones"],
  salud:         ["Sueño", "Ejercicio físico", "Nutrición aplicada", "Salud mental"],
  creatividad:   ["Creatividad", "Innovación", "Resolución de problemas"],
  dinero:        ["Finanzas personales", "Economía conductual", "Ahorro"],
  aprendizaje:   ["Aprendizaje", "Memoria", "Mnemotecnia"],
  relaciones:    ["Psicología social", "Comunicación no verbal", "Amistad"],
};

// Búsqueda de respaldo por tema (cuando la categoría no da resultados).
const TOPIC_QUERIES = {
  enfoque:       ["atención psicología", "concentración mental", "atención plena meditación"],
  productividad: ["productividad método", "gestión del tiempo", "procrastinación"],
  habitos:       ["hábito psicología", "motivación conducta", "autocontrol psicología"],
  mentalidad:    ["sesgo cognitivo", "resiliencia psicología", "inteligencia emocional"],
  salud:         ["higiene del sueño", "efecto ejercicio físico", "bienestar psicológico"],
  creatividad:   ["pensamiento creativo", "pensamiento lateral", "proceso creativo"],
  dinero:        ["finanzas personales concepto", "interés compuesto", "economía conductual"],
  aprendizaje:   ["técnica de estudio", "efecto memoria psicología", "curva del olvido"],
  relaciones:    ["comunicación interpersonal", "empatía psicología", "asertividad"],
};

// ---------- filtros de calidad ----------
// Wikipedia mezcla conceptos con organismos, biografías, lugares, obras…
// Estos filtros descartan lo que no aporta a una app de crecimiento.
const JUNK_TITLE =
  /^(Anexo:|Categoría:|Portal:|Wikiproyecto:)|\b(Instituto|Universidad|Asociación|Organización|Federación|Confederación|Fundación|Ministerio|Secretaría|Facultad|Colegio|Hospital|Museo|Revista|Editorial|Premio|Congreso|Consejo|Agencia|Comité|Observatorio|Día Internacional|Día Mundial)\b/i;

const JUNK_EXTRACT =
  /(es|fue|era) (un|una|el|la) (organismo|organización|institución|instituto|entidad|agencia|empresa|compañía|asociación|federación|fundación|universidad|facultad|colegio|hospital|museo|revista|editorial|premio|certamen|película|serie|novela|álbum|canción|banda|grupo musical|club|equipo|selección|torneo|municipio|localidad|comuna|ciudad|pueblo|barrio|distrito|provincia|región|país|estado|político|política|escritor|escritora|actor|actriz|cantante|futbolista|baloncestista|tenista|deportista|entrenador|entrenadora|ejecutivo|ejecutiva|dirigente|directivo|directiva|empresario|empresaria|economista|psicólogo|psicóloga|psiquiatra|filósofo|filósofa|sociólogo|socióloga|historiador|historiadora|periodista|abogado|abogada|médico|médica|científico|científica|físico|física teórica|químico|matemático|matemática|ingeniero|ingeniera|arquitecto|arquitecta|pintor|pintora|escultor|poeta|novelista|compositor|compositora|músico|música de|director|directora|productor|productora|modelo|presentador|presentadora|militar|sacerdote|obispo|papa|monje|rey|reina|emperador|emperatriz|príncipe|princesa)/i;

// Biografías: suelen abrir con «Nombre (Lugar, 1953 - …)»
const PERSON_INTRO = /^[^.]{0,90}\(.{0,60}\d{3,4}/;

// Biografías sin fecha: «es un/una … español/estadounidense/…»
const BIO_NATIONALITY =
  /(es|fue|era) (un|una) [^.]{0,60}\b(español|española|estadounidense|mexican|argentin|británic|francés|francesa|alemán|alemana|italian|colombian|chilen|peruan|canadiense|japonés|japonesa|chin[oa]|rus[oa]|suec[oa]|neerlandés|austriac|suiz[oa]|belga|portugués|portuguesa|brasileñ|australian|indi[oa]|israelí|polac[oa]|danés|noruega?|finlandés|irlandés|escocés|galés|grieg[oa]|turc[oa]|corean|cuban|venezolan|uruguay|ecuatorian|bolivian|paraguay|dominican|puertorriqueñ|hondureñ|guatemaltec|nicaragüense|costarricense|panameñ|salvadoreñ)/i;

// La descripción corta de Wikipedia delata personas, obras y lugares
// con mucha más fiabilidad que el texto («ejecutivo de baloncesto
// estadounidense», «futbolista español», «película de 1994»…).
// (con raíces sin terminación para cubrir masculino y femenino)
const JUNK_DESCRIPTION =
  /(futbolista|baloncestista|jugador|tenista|ciclista|piloto|deportista|atleta|entrenador|ejecutiv|dirigente|directiv|actor|actriz|cantante|músic|compositor|escritor|poeta|novelista|polític|empresari|economista|psicólog|psiquiatra|filósof|sociólog|historiador|periodista|abogad|médic|cirujan|científic|físic|químic|matemátic|ingenier|arquitect|pintor|escultor|fotógraf|director|productor|modelo|presentador|youtuber|militar|sacerdote|obispo|papa|monja|monje|rey de|reina de|emperador|emperatriz|persona|biografía|nacid|fallecid|organización|organismo|institución|instituto|empresa|compañía|asociación|fundación|universidad|club|equipo|selección|banda|grupo musical|revista|editorial|película|serie de|álbum|canción|sencillo|videojuego|municipio|ciudad|capital|localidad|comuna|provincia|región|país|río|montaña|lago|isla|edificio|estadio|aeropuerto|batalla|guerra)/i;

function isQualityCard(title, extract, description) {
  if (!title || !extract || extract.length < 140) return false;
  if (description && JUNK_DESCRIPTION.test(description)) return false;
  if (JUNK_TITLE.test(title)) return false;
  const intro = extract.slice(0, 260);
  if (JUNK_EXTRACT.test(intro)) return false;
  if (PERSON_INTRO.test(extract)) return false;
  if (BIO_NATIONALITY.test(intro)) return false;
  return true;
}

// Un buffer POR TEMA + rotación al servir: así el feed alterna temas
// tarjeta a tarjeta en lugar de mostrar rachas de un solo tema.
let wikiBuffers = {};            // tema -> tarjetas dinámicas listas
const wikiFetchingTopics = new Set(); // temas con petición en vuelo
let wikiFailed = false;          // última recarga falló (¿sin conexión?)
let onThisDayPool = null;        // efemérides de hoy (una petición por sesión)
let readsSinceDynamic = 0;       // para espaciar las tarjetas dinámicas
let allStaticRead = false;       // tarjetas locales agotadas → feed todo dinámico
let topicPointer = 0;            // puntero de rotación entre temas

function bufferTotal() {
  return Object.values(wikiBuffers).reduce((n, a) => n + a.length, 0);
}

// Sirve la siguiente tarjeta dinámica rotando entre los intereses
function takeDynamicCard() {
  const withCards = state.interests.filter((t) => (wikiBuffers[t] || []).length > 0);
  if (!withCards.length) return null;
  const topic = withCards[topicPointer % withCards.length];
  topicPointer++;
  return wikiBuffers[topic].shift();
}

function dynamicActive() {
  return state.interests.length > 0;
}

function trimBody(text) {
  return text.length > 420 ? text.slice(0, 400).trimEnd() + "…" : text;
}

const WIKI_CATEGORY_URL = (cat) =>
  "https://es.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*" +
  `&list=categorymembers&cmtitle=${encodeURIComponent("Categoría:" + cat)}&cmlimit=100&cmtype=page`;

const WIKI_EXTRACTS_URL = (titles) =>
  "https://es.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*" +
  `&titles=${encodeURIComponent(titles.join("|"))}` +
  "&prop=extracts%7Cinfo%7Cdescription&exintro=1&explaintext=1&exlimit=max&inprop=url";

const categoryCache = {}; // categoría -> títulos de artículos (por sesión)

async function getCategoryMembers(cat) {
  if (categoryCache[cat]) return categoryCache[cat];
  const res = await fetch(WIKI_CATEGORY_URL(cat));
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  const titles = ((data.query && data.query.categorymembers) || [])
    .map((m) => m.title)
    .filter((t) => !JUNK_TITLE.test(t));
  categoryCache[cat] = titles;
  return titles;
}

function pagesToCards(pages, topicId) {
  return pages
    .filter((p) => isQualityCard(p.title, p.extract, p.description))
    .map((p) => ({
      id: "wiki-" + p.pageid,
      topic: topicId,
      title: p.title,
      body: trimBody(p.extract),
      url: p.fullurl || null,
      source: "Wikipedia · CC BY-SA",
    }));
}

async function fetchExtractsFor(titles, topicId) {
  const res = await fetch(WIKI_EXTRACTS_URL(titles));
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return pagesToCards((data.query && data.query.pages) || [], topicId);
}

// Respaldo: búsqueda libre (con los mismos filtros de calidad)
async function fetchSearchBatch(topicId) {
  const queries = TOPIC_QUERIES[topicId];
  if (!queries) return [];
  const query = queries[Math.floor(Math.random() * queries.length)];
  const offset = Math.floor(Math.random() * 20);
  const res = await fetch(WIKI_SEARCH_URL(query, offset));
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return pagesToCards((data.query && data.query.pages) || [], topicId);
}

// Tanda de tarjetas de un tema: primero su categoría de Wikipedia
// (artículos de conceptos), y si no da fruto, la búsqueda de respaldo.
async function fetchTopicBatch(topicId) {
  // Prueba hasta dos categorías distintas antes de caer al respaldo
  const cats = shuffle(TOPIC_CATEGORIES[topicId] || []).slice(0, 2);
  for (const cat of cats) {
    try {
      const titles = await getCategoryMembers(cat);
      if (titles.length >= 4) {
        const cards = await fetchExtractsFor(shuffle(titles).slice(0, 10), topicId);
        if (cards.length >= 3) return cards;
      }
    } catch { /* categoría inexistente o sin red: prueba la siguiente */ }
  }
  return fetchSearchBatch(topicId);
}

async function fetchRandomWikiCard() {
  const res = await fetch(WIKI_RANDOM_URL);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const p = await res.json();
  // Solo artículos normales que pasen el filtro de calidad
  if (p.type !== "standard" || !isQualityCard(p.title, p.extract, p.description)) return null;
  return {
    id: "wiki-" + p.pageid,
    topic: "descubre",
    title: p.title,
    body: trimBody(p.extract),
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

// Rellena el buffer de UN tema concreto
async function refillTopic(topicId) {
  wikiFetchingTopics.add(topicId);
  try {
    let cards;
    if (topicId === "descubre") {
      const results = await Promise.allSettled([fetchRandomWikiCard(), fetchRandomWikiCard(), fetchOnThisDayCard()]);
      cards = results.filter((r) => r.status === "fulfilled" && r.value).map((r) => r.value);
    } else {
      cards = await fetchTopicBatch(topicId);
    }
    // Sin repetidos: ni ya leídas (histórico) ni ya en ningún buffer
    const buf = wikiBuffers[topicId] || (wikiBuffers[topicId] = []);
    const seen = new Set(state.readIds);
    Object.values(wikiBuffers).forEach((a) => a.forEach((c) => seen.add(c.id)));
    let added = 0;
    shuffle(cards).forEach((c) => {
      if (!seen.has(c.id) && buf.length < 8) {
        buf.push(c);
        seen.add(c.id);
        added++;
      }
    });
    return added;
  } finally {
    wikiFetchingTopics.delete(topicId);
  }
}

// Rellena en paralelo TODOS los intereses que anden bajos de tarjetas
async function refillWikiBuffer() {
  if (!dynamicActive()) return;
  const targets = state.interests.filter(
    (t) => (wikiBuffers[t] || []).length < 3 && !wikiFetchingTopics.has(t)
  );
  if (!targets.length) return;
  const results = await Promise.allSettled(targets.map((t) => refillTopic(t)));
  // Éxito = llegaron tarjetas de verdad: «Descubre» traga sus errores de
  // red y puede resolver con 0 tarjetas aunque no haya conexión.
  if (results.some((r) => r.status === "fulfilled" && r.value > 0)) wikiFailed = false;
  else if (bufferTotal() === 0) wikiFailed = true;
  // Si el usuario estaba esperando (feed vacío), avanza en cuanto haya
  // tarjetas; si la carga falló, muestra el estado de reintento.
  if (state.onboarded && !currentIdea) {
    if (bufferTotal()) nextCard();
    else renderCard(null);
  }
}

function renderCatalogInfo() {
  const el = $("#catalog-info");
  if (!el) return;
  el.textContent = `Contenido en vivo desde Wikipedia en español · sin límites · v${APP_VERSION}`;
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
  allStaticRead = unread.length === 0 && pool.length > 0;
  // Primero las no leídas; si se acaban, recicla todas barajadas.
  queue = unread.length > 0 ? shuffle(unread) : shuffle(pool);
}

function nextCard() {
  if (queue.length === 0) buildQueue();
  // Intercala tarjetas dinámicas de Wikipedia: 1 de cada 3 mientras
  // queden ideas locales sin leer; casi todas cuando ya leíste todo.
  const interval = allStaticRead ? 1 : 2;
  if (dynamicActive() && bufferTotal() > 0 && readsSinceDynamic >= interval) {
    currentIdea = takeDynamicCard();
    readsSinceDynamic = 0;
  } else {
    currentIdea = queue.shift() || takeDynamicCard() || null;
    readsSinceDynamic++;
  }
  refillWikiBuffer();
  renderCard(currentIdea);
}

function renderCard(idea) {
  const stage = $("#card-stage");
  if (!idea) {
    // El contenido llega de la red: distingue «cargando» de «sin conexión»
    stage.innerHTML = wikiFailed
      ? `<div class="empty-state"><span class="big">📡</span><p>No se pudieron cargar ideas.<br>Revisa tu conexión.</p><button class="btn btn-primary" id="btn-retry">Reintentar</button></div>`
      : `<div class="empty-state"><span class="big">⏳</span><p>Cargando ideas nuevas…</p></div>`;
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
    exploreResults.find((i) => i.id === id) ||
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
  $("#topic-list").innerHTML =
    `<button class="topic-pill ${!exploreTopic ? "selected" : ""}" data-topic="">✨ Todos</button>` +
    TOPICS.map(
      (t) => `<button class="topic-pill ${exploreTopic === t.id ? "selected" : ""}" data-topic="${t.id}">${t.emoji} ${t.name}</button>`
    ).join("");
}

let exploreResults = [];   // últimos resultados (para poder guardarlos)
let exploreSeq = 0;        // descarta respuestas obsoletas
let exploreDebounce = null;

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

  $("#search-input").addEventListener("input", () => {
    clearTimeout(exploreDebounce);
    exploreDebounce = setTimeout(renderExplore, 400);
  });
}

// Trae los resultados de Explorar según búsqueda y tema seleccionados
async function fetchExploreCards(query, topicId) {
  if (query) {
    // Búsqueda libre en Wikipedia (acotada al tema si hay uno elegido)
    const q = topicId && TOPIC_QUERIES[topicId] ? `${query} ${TOPIC_QUERIES[topicId][0]}` : query;
    const res = await fetch(WIKI_SEARCH_URL(q, 0));
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    // En búsqueda libre no se aplica el filtro anti-organismos: si el
    // usuario busca «INCAP» quiere ese resultado. Solo pide sustancia.
    return ((data.query && data.query.pages) || [])
      .filter((p) => p.extract && p.extract.length >= 120)
      .map((p) => ({
        id: "wiki-" + p.pageid,
        topic: topicId || "descubre",
        title: p.title,
        body: trimBody(p.extract),
        url: p.fullurl || null,
        source: "Wikipedia · CC BY-SA",
      }));
  }
  if (topicId === "descubre") {
    const results = await Promise.allSettled(
      Array.from({ length: 6 }, () => fetchRandomWikiCard())
    );
    return results.filter((r) => r.status === "fulfilled" && r.value).map((r) => r.value);
  }
  if (topicId) return fetchTopicBatch(topicId);
  // «Todos» sin búsqueda: una tanda de un interés del usuario al azar
  const pool = state.interests.length ? state.interests : TOPICS.map((t) => t.id);
  const randomTopic = pool[Math.floor(Math.random() * pool.length)];
  return fetchExploreCards("", randomTopic);
}

// Repinta los resultados ya cargados (p. ej. tras guardar) sin refetch
function renderExploreRows() {
  $("#explore-results").innerHTML = exploreResults.length
    ? exploreResults.map(ideaRowHtml).join("")
    : `<div class="empty-state"><span class="big">🔍</span><p>Sin resultados para tu búsqueda.</p></div>`;
}

async function renderExplore() {
  const q = $("#search-input").value.trim();
  const seq = ++exploreSeq;
  const box = $("#explore-results");
  box.innerHTML = `<div class="empty-state"><span class="big">⏳</span><p>Buscando en Wikipedia…</p></div>`;
  try {
    const cards = await fetchExploreCards(q, exploreTopic);
    if (seq !== exploreSeq) return; // ya hay una búsqueda más reciente
    exploreResults = cards;
    renderExploreRows();
  } catch {
    if (seq !== exploreSeq) return;
    box.innerHTML = `<div class="empty-state"><span class="big">📡</span><p>No se pudo buscar.<br>Revisa tu conexión.</p></div>`;
  }
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

// Delegación: reintentar carga del feed
document.addEventListener("click", (e) => {
  if (e.target.closest("#btn-retry")) {
    wikiFailed = false;
    renderCard(null);
    refillWikiBuffer();
  }
});

// Delegación: guardar/quitar desde cualquier lista
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-save]");
  if (!btn) return;
  toggleSave(btn.dataset.save);
  renderSaved();
  renderExploreRows();
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
