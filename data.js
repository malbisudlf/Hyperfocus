// ============================================================
// Hyperfocus — Base de datos de ideas (contenido original)
// Cada idea: id, topic, title, body
// ============================================================

// Fuente externa de ideas. Por defecto apunta al ideas.json del
// propio repo (funciona en GitHub Pages y en servidor local), pero
// puedes cambiarla por cualquier URL que devuelva JSON con el
// formato { topics: [...], ideas: [...] }, p. ej. un Gist:
//   "https://gist.githubusercontent.com/usuario/id/raw/ideas.json"
const IDEAS_SOURCE_URL = "ideas.json";

const TOPICS = [
  { id: "enfoque",       name: "Enfoque",       emoji: "🎯", color: "#7c5cff" },
  { id: "productividad", name: "Productividad", emoji: "⚡", color: "#ff9f43" },
  { id: "habitos",       name: "Hábitos",       emoji: "🌱", color: "#2ecc71" },
  { id: "mentalidad",    name: "Mentalidad",    emoji: "🧠", color: "#54a0ff" },
  { id: "salud",         name: "Salud",         emoji: "💪", color: "#ff6b81" },
  { id: "creatividad",   name: "Creatividad",   emoji: "🎨", color: "#feca57" },
  { id: "dinero",        name: "Dinero",        emoji: "💰", color: "#1dd1a1" },
  { id: "aprendizaje",   name: "Aprendizaje",   emoji: "📚", color: "#e056fd" },
  // Tema dinámico: se alimenta en vivo desde la API de Wikipedia (ver app.js)
  { id: "descubre",      name: "Descubre",      emoji: "🌍", color: "#48dbfb" },
];

const IDEAS = [
  // ---------- ENFOQUE ----------
  {
    id: "enf-1", topic: "enfoque",
    title: "Tu atención es tu recurso más escaso",
    body: "No gestionas el tiempo: gestionas la atención. Puedes tener 8 horas libres y no avanzar nada si tu mente está en veinte sitios a la vez. Antes de organizar tu agenda, pregúntate: ¿a qué le voy a dar mi atención completa hoy?"
  },
  {
    id: "enf-2", topic: "enfoque",
    title: "El coste oculto de cambiar de tarea",
    body: "Cada vez que saltas del trabajo al móvil y de vuelta, tu cerebro tarda varios minutos en recuperar la concentración profunda. Diez interrupciones pequeñas pueden destruir una mañana entera. Agrupa las distracciones: revisa mensajes en bloques, no en goteo."
  },
  {
    id: "enf-3", topic: "enfoque",
    title: "Diseña el entorno, no la fuerza de voluntad",
    body: "Resistir la tentación cansa; eliminarla no. Deja el móvil en otra habitación, cierra las pestañas que no uses y trabaja con una sola cosa sobre la mesa. La persona más concentrada no es la más disciplinada: es la que menos batallas tiene que pelear."
  },
  {
    id: "enf-4", topic: "enfoque",
    title: "Una intención antes de empezar",
    body: "La concentración empieza antes de sentarte. Di en voz alta (o escribe) qué vas a hacer exactamente: «Voy a escribir la introducción del informe durante 40 minutos». Una intención concreta le da a tu mente un objetivo que perseguir en lugar de un vacío que llenar con distracciones."
  },
  {
    id: "enf-5", topic: "enfoque",
    title: "El aburrimiento es una habilidad",
    body: "Si cada micro-espera la llenas con el móvil, entrenas a tu cerebro para exigir estímulo constante. Practica esperar sin pantalla: en la cola, en el ascensor, en el semáforo. Tolerar el aburrimiento es el músculo que sostiene la concentración profunda."
  },
  {
    id: "enf-6", topic: "enfoque",
    title: "Ruido programado: la técnica del estacionamiento",
    body: "Cuando trabajas concentrado y te asalta un pensamiento («tengo que responder a Ana»), no lo atiendas ni lo reprimas: apúntalo en una lista de «luego» y sigue. Tu mente se calma cuando sabe que la idea está a salvo en un papel."
  },

  // ---------- PRODUCTIVIDAD ----------
  {
    id: "pro-1", topic: "productividad",
    title: "Empieza por la rana",
    body: "Haz primero la tarea que más pereza te da. Todo lo demás del día se sentirá cuesta abajo, y evitas ese peso mental de tenerla pendiente durante horas. La procrastinación no se cura con más tiempo, sino con empezar antes."
  },
  {
    id: "pro-2", topic: "productividad",
    title: "La regla de los dos minutos",
    body: "Si algo tarda menos de dos minutos, hazlo ahora: responder ese mensaje, colgar la chaqueta, apuntar el gasto. Guardar microtareas «para luego» crea una montaña mental que pesa más que hacerlas al momento."
  },
  {
    id: "pro-3", topic: "productividad",
    title: "Trabaja en bloques con descanso",
    body: "Alterna periodos cortos de trabajo intenso (25–50 min) con pausas reales de 5–10 min. El descanso no es el premio: es parte del método. Un cerebro que descansa a intervalos rinde más que uno que aguanta hasta fundirse."
  },
  {
    id: "pro-4", topic: "productividad",
    title: "Tres tareas importan, el resto acompaña",
    body: "Cada mañana elige las 3 tareas que, si las terminas, harán que el día valga la pena. Escríbelas antes de abrir el correo. Una lista de 20 cosas no es un plan: es ansiedad con viñetas."
  },
  {
    id: "pro-5", topic: "productividad",
    title: "Hecho es mejor que perfecto",
    body: "El perfeccionismo suele ser procrastinación disfrazada de exigencia. Publica el borrador, envía la propuesta, muestra la versión 1. El feedback del mundo real mejora tu trabajo más rápido que otra semana puliéndolo a solas."
  },
  {
    id: "pro-6", topic: "productividad",
    title: "Di no por defecto",
    body: "Cada «sí» a algo es un «no» invisible a otra cosa. Antes de aceptar un compromiso, pregúntate: si esto fuera mañana por la mañana, ¿me alegraría haberlo aceptado? Si la respuesta no es un sí claro, probablemente es un no."
  },

  // ---------- HÁBITOS ----------
  {
    id: "hab-1", topic: "habitos",
    title: "Hazlo ridículamente pequeño",
    body: "¿Quieres leer más? Empieza con una página. ¿Hacer ejercicio? Dos flexiones. Un hábito diminuto que haces todos los días vale más que un plan ambicioso que abandonas en dos semanas. Primero conviértete en alguien que no falla; luego sube la dosis."
  },
  {
    id: "hab-2", topic: "habitos",
    title: "Ancla el hábito nuevo a uno viejo",
    body: "Los hábitos se pegan mejor cuando tienen un disparador claro: «Después de servirme el café, escribo tres líneas en mi diario». No confíes en acordarte: encadena lo nuevo a algo que ya haces sin pensar."
  },
  {
    id: "hab-3", topic: "habitos",
    title: "No rompas la cadena dos veces",
    body: "Fallar un día es normal; fallar dos seguidos es el principio del abandono. La regla no es ser perfecto, es no dejar que un tropiezo se convierta en identidad. Si ayer no lo hiciste, hoy es el día más importante de tu hábito."
  },
  {
    id: "hab-4", topic: "habitos",
    title: "Eres lo que repites, no lo que decides",
    body: "Una decisión de año nuevo no te cambia; la repetición sí. Cada vez que actúas, votas por el tipo de persona que quieres ser. No busques resultados rápidos: busca acumular votos a tu favor."
  },
  {
    id: "hab-5", topic: "habitos",
    title: "Haz visible lo bueno, invisible lo malo",
    body: "La fruta en el centro de la mesa se come; la que está en el cajón se pudre. Pon el libro sobre la almohada y las zapatillas junto a la puerta. Esconde el mando, borra la app, saca los dulces de casa. Tu entorno decide más que tú."
  },
  {
    id: "hab-6", topic: "habitos",
    title: "El descanso también se entrena",
    body: "Acostarte y levantarte a la misma hora es el hábito madre: mejora tu energía, tu humor y tu autocontrol, que son la materia prima de todos los demás hábitos. Antes de añadir rutinas nuevas, arregla tu sueño."
  },

  // ---------- MENTALIDAD ----------
  {
    id: "men-1", topic: "mentalidad",
    title: "Todavía no ≠ nunca",
    body: "Hay una diferencia enorme entre «no sé hacerlo» y «no sé hacerlo todavía». La primera frase cierra la puerta; la segunda la deja entreabierta. Las habilidades no son un veredicto: son un proceso. Añade «todavía» a tus limitaciones."
  },
  {
    id: "men-2", topic: "mentalidad",
    title: "No eres tus pensamientos",
    body: "Que tu mente diga «vas a fracasar» no lo convierte en verdad: es solo ruido mental, como el tiempo meteorológico. Puedes observar un pensamiento sin obedecerlo. Nota la nube, y deja que pase."
  },
  {
    id: "men-3", topic: "mentalidad",
    title: "Compárate con tu yo de ayer",
    body: "Siempre habrá alguien con más éxito, más dinero o más talento: esa carrera no se puede ganar. La única comparación útil es contigo mismo hace un año, hace un mes, ayer. ¿Estás un 1% más cerca de donde quieres estar? Eso es ganar."
  },
  {
    id: "men-4", topic: "mentalidad",
    title: "La preocupación no es preparación",
    body: "Darle vueltas a un problema se siente productivo, pero rumiar no es planificar. Pregúntate: ¿hay algo que pueda hacer ahora? Si sí, hazlo. Si no, la preocupación es solo sufrir por adelantado, y en cuotas."
  },
  {
    id: "men-5", topic: "mentalidad",
    title: "Pide feedback, no aprobación",
    body: "Cuando muestras tu trabajo buscando que te digan «está genial», no aprendes nada. Pregunta en cambio: «¿qué es lo más flojo de esto?». Duele un segundo y te ahorra meses. La crítica útil es un regalo con mal envoltorio."
  },
  {
    id: "men-6", topic: "mentalidad",
    title: "El fracaso es información",
    body: "Un intento fallido te dice exactamente qué no funciona, algo que ningún libro podía decirte. La gente que más logra no fracasa menos: fracasa más veces, más rápido y con más curiosidad. Cambia «fracasé» por «descarté una opción»."
  },

  // ---------- SALUD ----------
  {
    id: "sal-1", topic: "salud",
    title: "Camina para pensar",
    body: "Caminar no es solo ejercicio: es una herramienta mental. Un paseo de 20 minutos despeja la rumiación, desbloquea ideas y baja el estrés. Cuando estés atascado con un problema, no te sientes más fuerte: sal a caminar."
  },
  {
    id: "sal-2", topic: "salud",
    title: "Duerme como si fuera tu trabajo",
    body: "Dormir poco no te hace productivo, te hace lento con prisa. La falta de sueño reduce memoria, autocontrol y humor. Protege tus horas de sueño con la misma seriedad con la que proteges una reunión importante: son la reunión más importante."
  },
  {
    id: "sal-3", topic: "salud",
    title: "La respiración es tu freno de mano",
    body: "Cuando notes ansiedad, prueba a exhalar más lento de lo que inhalas: inhala en 4 segundos, exhala en 6-8. La exhalación larga activa la respuesta de calma del cuerpo. Es gratis, es invisible y la llevas siempre encima."
  },
  {
    id: "sal-4", topic: "salud",
    title: "Fuerza: la inversión que se paga en décadas",
    body: "El músculo no es estética: es el seguro de vida de tu movilidad futura. Entrenar fuerza dos veces por semana mejora huesos, metabolismo y estado de ánimo. Empezar hoy con poco vale más que empezar «en serio» algún día."
  },
  {
    id: "sal-5", topic: "salud",
    title: "El sol de la mañana ajusta tu reloj",
    body: "Exponerte a luz natural en la primera hora del día sincroniza tu ritmo circadiano: más energía por la mañana, más sueño por la noche. Desayuna junto a la ventana o sal cinco minutos al balcón. Pequeño gesto, gran palanca."
  },
  {
    id: "sal-6", topic: "salud",
    title: "Comer sin pantalla",
    body: "Comer mirando el móvil te desconecta de las señales de saciedad y convierte la comida en combustible ansioso. Una comida al día sin pantallas es una práctica doble: mejor digestión y un rato de entrenamiento de atención."
  },

  // ---------- CREATIVIDAD ----------
  {
    id: "cre-1", topic: "creatividad",
    title: "La cantidad engendra calidad",
    body: "Las mejores ideas no salen de esperar la inspiración, sino de producir mucho. Quien hace cien bocetos tiene más obras maestras que quien pule uno solo durante meses. Baja el listón de cada intento y sube el número de intentos."
  },
  {
    id: "cre-2", topic: "creatividad",
    title: "Roba como un artista honesto",
    body: "Nada nace de la nada: toda creación combina influencias. La diferencia entre copiar y crear está en mezclar. Toma una idea de un campo y aplícala en otro donde nadie la ha visto: ahí vive la originalidad."
  },
  {
    id: "cre-3", topic: "creatividad",
    title: "Las restricciones liberan",
    body: "La página en blanco paraliza porque todo es posible. Ponte límites artificiales: escribe en 100 palabras, diseña con dos colores, resuelve sin presupuesto. Las restricciones convierten un océano de opciones en un camino con dirección."
  },
  {
    id: "cre-4", topic: "creatividad",
    title: "El primer borrador tiene permiso para ser malo",
    body: "No puedes editar una página vacía. La misión del primer borrador no es ser bueno: es existir. Escribe mal a propósito, rápido y sin mirar atrás. La calidad llega en la revisión, no en el nacimiento."
  },
  {
    id: "cre-5", topic: "creatividad",
    title: "Aburre a tu cerebro de vez en cuando",
    body: "Las ideas aparecen en la ducha porque ahí no hay estímulos: la mente vaga y conecta cosas sueltas. Si llenas cada hueco del día con contenido, no dejas espacio para que tus propias ideas hablen. El aburrimiento es la sala de espera de la creatividad."
  },
  {
    id: "cre-6", topic: "creatividad",
    title: "Captura todo: la memoria es mala socia",
    body: "Las ideas llegan sin cita: caminando, cocinando, a punto de dormir. Ten siempre un sitio donde apuntarlas en menos de 10 segundos (una nota en el móvil, una libreta). Una idea sin capturar es una idea regalada al olvido."
  },

  // ---------- DINERO ----------
  {
    id: "din-1", topic: "dinero",
    title: "Págate primero a ti",
    body: "No ahorres lo que sobre a fin de mes (nunca sobra). Aparta un porcentaje automáticamente el día que cobras, aunque sea un 5%, y vive con el resto. El ahorro que funciona no depende de tu disciplina diaria, sino de una decisión que tomas una sola vez."
  },
  {
    id: "din-2", topic: "dinero",
    title: "El estilo de vida que se infla",
    body: "Ganar más no te hace más rico si gastar más viene incluido. Cada subida de ingresos que se traduce en más gasto fijo es una jaula más cara. Cuando ganes más, sube primero tu ahorro y después tu nivel de vida."
  },
  {
    id: "din-3", topic: "dinero",
    title: "El interés compuesto premia al que empieza",
    body: "Invertir poco durante mucho tiempo gana a invertir mucho durante poco. El factor decisivo no es la cantidad inicial: es cuántos años dejas trabajar al dinero. El mejor momento para empezar fue hace años; el segundo mejor es hoy."
  },
  {
    id: "din-4", topic: "dinero",
    title: "Compra tiempo, no cosas",
    body: "Pasado un umbral básico, los objetos dan una alegría corta y las experiencias y el tiempo libre dan una larga. Antes de una compra grande, pregúntate: ¿esto me compra tiempo, salud o tranquilidad? Si solo compra estatus, espera 30 días y decide."
  },
  {
    id: "din-5", topic: "dinero",
    title: "Un fondo de calma",
    body: "Tener 3–6 meses de gastos guardados no es solo previsión financiera: es libertad psicológica. Con un colchón, puedes negociar mejor, decir no a un mal trabajo y dormir cuando algo se rompe. La primera inversión es tu tranquilidad."
  },
  {
    id: "din-6", topic: "dinero",
    title: "Gasta a lo grande en lo que amas",
    body: "La frugalidad inteligente no es recortar todo: es recortar sin piedad lo que te da igual para gastar sin culpa en lo que te llena. Café malo y viajes soñados, o café de especialidad y menos ropa: tú eliges el mapa, pero elige."
  },

  // ---------- APRENDIZAJE ----------
  {
    id: "apr-1", topic: "aprendizaje",
    title: "Recordar es mejor que releer",
    body: "Releer apuntes se siente cómodo y engaña: reconocer no es saber. Cierra el libro e intenta explicar lo que leíste sin mirar. Ese esfuerzo de recuperar la información es exactamente lo que la fija en tu memoria."
  },
  {
    id: "apr-2", topic: "aprendizaje",
    title: "Explícaselo a un niño",
    body: "Si no puedes explicar algo con palabras simples, todavía no lo entiendes. Intenta explicar el tema como si tu oyente tuviera 10 años: cada tropiezo revela un hueco en tu comprensión. Enseñar es la forma más rápida de aprender."
  },
  {
    id: "apr-3", topic: "aprendizaje",
    title: "Espaciar gana a maratonear",
    body: "Diez minutos al día durante un mes vencen a cinco horas de un domingo. La memoria se consolida con repeticiones separadas en el tiempo, justo cuando estás a punto de olvidar. Estudiar en atracón aprueba exámenes; espaciar construye conocimiento."
  },
  {
    id: "apr-4", topic: "aprendizaje",
    title: "La dificultad deseable",
    body: "Si aprender se siente fácil y fluido, sospecha: probablemente no está entrando nada. El aprendizaje real pica un poco, como el ejercicio. Busca problemas ligeramente por encima de tu nivel: ni tan fáciles que aburran, ni tan difíciles que bloqueen."
  },
  {
    id: "apr-5", topic: "aprendizaje",
    title: "Aprende haciendo el proyecto primero",
    body: "En lugar de estudiar «por si acaso» durante meses, empieza un proyecto real y aprende lo que te falte «justo a tiempo». La necesidad concreta convierte la teoría abstracta en herramientas con propósito, y la motivación se mantiene sola."
  },
  {
    id: "apr-6", topic: "aprendizaje",
    title: "Lee menos fuentes, más veces",
    body: "Acumular artículos guardados y cursos sin terminar es coleccionar, no aprender. Un gran libro releído y aplicado vale más que veinte hojeados. Cuando algo te enseñe de verdad, vuelve a él: la segunda lectura es donde vive la profundidad."
  },
];
