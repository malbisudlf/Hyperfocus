// ============================================================
// Hyperfocus — configuración de temas
// Todo el contenido llega en vivo desde la API de Wikipedia
// (ver TOPIC_QUERIES en app.js). No hay tarjetas locales.
// ============================================================

const TOPICS = [
  { id: "enfoque",       name: "Enfoque",       emoji: "🎯", color: "#7c5cff" },
  { id: "productividad", name: "Productividad", emoji: "⚡", color: "#ff9f43" },
  { id: "habitos",       name: "Hábitos",       emoji: "🌱", color: "#2ecc71" },
  { id: "mentalidad",    name: "Mentalidad",    emoji: "🧠", color: "#54a0ff" },
  { id: "salud",         name: "Salud",         emoji: "💪", color: "#ff6b81" },
  { id: "creatividad",   name: "Creatividad",   emoji: "🎨", color: "#feca57" },
  { id: "dinero",        name: "Dinero",        emoji: "💰", color: "#1dd1a1" },
  { id: "aprendizaje",   name: "Aprendizaje",   emoji: "📚", color: "#e056fd" },
  { id: "relaciones",    name: "Relaciones",    emoji: "🤝", color: "#ff9ff3" },
  { id: "descubre",      name: "Descubre",      emoji: "🌍", color: "#48dbfb" },
];

// Si algún día quieres añadir tarjetas propias fijas, ponlas aquí
// con el formato { id, topic, title, body } y aparecerán en el feed
// mezcladas con el contenido dinámico.
const IDEAS = [];
