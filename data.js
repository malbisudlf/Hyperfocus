// ============================================================
// Hyperfocus — biblioteca de ideas (contenido original)
// Cada idea: id, topic, title, body — ideas destiladas y accionables.
// El tema «Descubre» se alimenta en vivo de Wikipedia (ver app.js).
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
  {
    id: "enf-7", topic: "enfoque",
    title: "Monotarea: hacer una cosa es la ventaja injusta",
    body: "La multitarea es hacer varias cosas mal a la vez y sentirse ocupado como premio de consolación. En un mundo que interrumpe constantemente, la capacidad de hacer una sola cosa hasta terminarla se ha vuelto una superpotencia rara y valiosa."
  },
  {
    id: "enf-8", topic: "enfoque",
    title: "El trabajo profundo es tu ventaja económica",
    body: "Cualquiera puede responder correos; muy pocos pueden concentrarse dos horas seguidas en algo difícil. Justo por eso lo segundo se paga caro y lo primero no. Protege cada día un bloque de trabajo profundo como si fuera tu activo más valioso: lo es."
  },
  {
    id: "enf-9", topic: "enfoque",
    title: "Crea un ritual de arranque",
    body: "Mismo café, misma mesa, mismos auriculares, misma hora. El cerebro adora las señales: si siempre empiezas igual, entrar en concentración deja de ser una batalla de voluntad y se convierte en un reflejo condicionado. Diseña tu ritual y repítelo hasta que arranque solo."
  },
  {
    id: "enf-10", topic: "enfoque",
    title: "La atención residual te sigue a todas partes",
    body: "Cuando saltas de una tarea a otra, parte de tu mente se queda pegada a la anterior. Ese residuo hace que rindas peor en la nueva sin darte cuenta. Antes de cambiar, cierra: apunta dónde lo dejas y qué toca después. Un cierre limpio libera la mente entera."
  },
  {
    id: "enf-11", topic: "enfoque",
    title: "Registra tus distracciones una semana",
    body: "Cada vez que te pilles distraído, apunta qué lo disparó: aburrimiento, un mensaje, hambre, una tarea difícil. En una semana tendrás el mapa exacto de tus fugas de atención. No puedes arreglar lo que no ves, y casi nadie mira."
  },
  {
    id: "enf-12", topic: "enfoque",
    title: "Apaga las notificaciones por defecto",
    body: "La pregunta correcta no es «¿qué notificaciones silencio?» sino «¿cuáles merecen sonar?». Silencia todo y rescata solo las 2 o 3 imprescindibles. Cada aviso es alguien comprando tu atención sin pagarte nada a cambio."
  },
  {
    id: "enf-13", topic: "enfoque",
    title: "Encuentra tus horas doradas",
    body: "No todas tus horas valen igual: hay 2 o 3 al día en las que tu mente rinde el doble. Para la mayoría es por la mañana; para otros, de noche. Descubre las tuyas y defiéndelas con uñas y dientes: reuniones y correos a las horas de plomo, lo importante a las de oro."
  },
  {
    id: "enf-14", topic: "enfoque",
    title: "Diez minutos de meditación son pesas para la atención",
    body: "Meditar no es poner la mente en blanco: es notar que te has distraído y volver, una y otra vez. Cada retorno es una repetición del músculo que luego usas para concentrarte. Diez minutos al día entrenan la habilidad más rentable que existe: darte cuenta."
  },
  {
    id: "enf-15", topic: "enfoque",
    title: "Separa lo profundo de lo superficial",
    body: "Escribe tu lista de tareas y marca cada una: ¿exige concentración real o la puede hacer un cerebro cansado? Agrupa lo superficial (correos, gestiones, llamadas) en una franja y no dejes que contamine las horas buenas. Mezclarlas es desperdiciar tu mejor gasolina en trayectos cortos."
  },
  {
    id: "enf-16", topic: "enfoque",
    title: "El correo en dos tandas",
    body: "Revisar el correo cada diez minutos convierte tu día en una sala de espera. Elige dos momentos fijos (por ejemplo, 12:00 y 17:00), procesa todo de golpe y cierra la pestaña. Casi nada es tan urgente como parece, y lo verdaderamente urgente no llega por correo."
  },
  {
    id: "enf-17", topic: "enfoque",
    title: "Modo monje por horas, no de por vida",
    body: "No necesitas mudarte a una cabaña: necesitas 90 minutos inalcanzables. Avisa, ponte inaccesible, y desaparece del mundo un rato cada día. La concentración extrema en dosis pequeñas gana a la disponibilidad mediocre permanente."
  },
  {
    id: "enf-18", topic: "enfoque",
    title: "Una sola pestaña",
    body: "Cada pestaña abierta es una promesa a medias que te grita desde el borde de la pantalla. Prueba a trabajar con una sola: lo que necesites después, apúntalo. El navegador ordenado es la versión digital de la mesa despejada."
  },
  {
    id: "enf-19", topic: "enfoque",
    title: "Descansa de verdad entre bloques",
    body: "Pasar del documento a Instagram no es descansar: es cambiar de estímulo. El cerebro se recupera con pausas de baja estimulación: mirar por la ventana, estirarte, servirte agua, caminar. Cinco minutos aburridos recargan más que quince de scroll."
  },
  {
    id: "enf-20", topic: "enfoque",
    title: "Vuelve sin castigarte",
    body: "Te vas a distraer: eso no es fallar, es ser humano. Lo que marca la diferencia es el retorno: los que se fustigan («otra vez, soy un desastre») tardan más en volver que los que simplemente regresan a la tarea. Distraerse es inevitable; quedarse en la distracción es opcional."
  },
  {
    id: "enf-21", topic: "enfoque",
    title: "El móvil fuera del alcance del brazo",
    body: "No basta con silenciarlo: su sola presencia visible consume atención, porque una parte de tu mente vigila si se enciende. Los estudios lo llaman «fuga cognitiva». Métele distancia física: otra habitación, un cajón, la mochila. Ojos que no ven, atención que rinde."
  },
  {
    id: "enf-22", topic: "enfoque",
    title: "Di en voz alta a qué vuelves",
    body: "Cuando una interrupción sea inevitable (una llamada, alguien en la puerta), di antes de atenderla: «estoy en el párrafo tres, sigo con el argumento del coste». Ese ancla verbal reduce a la mitad el tiempo de reenganche cuando vuelves."
  },
  {
    id: "enf-23", topic: "enfoque",
    title: "La música adecuada es la que desaparece",
    body: "Si la música te hace cantar, te está costando concentración. Para trabajo profundo funciona mejor lo que no exige nada: instrumental, ruido ambiental, o silencio. Reserva tus canciones favoritas para las tareas mecánicas, donde el ánimo importa más que el pensamiento."
  },
  {
    id: "enf-24", topic: "enfoque",
    title: "Cansancio de decidir: menos opciones, más foco",
    body: "Cada pequeña decisión (qué ropa, qué desayuno, por dónde empiezo) gasta la misma batería mental que usas para concentrarte. Decide lo trivial la noche anterior o conviértelo en rutina fija. Guarda las decisiones para donde de verdad importan."
  },
  {
    id: "enf-25", topic: "enfoque",
    title: "Aparta la olla del fuego: deja de remover",
    body: "Revisar el progreso cada cinco minutos (visitas, respuestas, resultados) es remover una olla que necesita hervir sola. Define cuándo mirarás los resultados (una vez al día, una vez a la semana) y entre medias dedícate a cocinar, no a levantar la tapa."
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
  {
    id: "pro-7", topic: "productividad",
    title: "La ley de Parkinson juega en tu contra",
    body: "El trabajo se estira hasta llenar el tiempo disponible: si te das una semana para algo de dos horas, tardarás una semana. Dale la vuelta: asigna plazos incómodamente cortos y deja que la presión haga de editora. Lo que de verdad importa cabe en menos tiempo del que crees."
  },
  {
    id: "pro-8", topic: "productividad",
    title: "Urgente no es lo mismo que importante",
    body: "Lo urgente grita (mensajes, avisos, fuegos) y lo importante susurra (salud, aprender, ese proyecto). Si no lo decides tú, lo urgente se comerá siempre a lo importante. Pregúntate cada mañana: ¿qué cosa importante y no urgente va a tener hoy un hueco garantizado?"
  },
  {
    id: "pro-9", topic: "productividad",
    title: "Pon las tareas en el calendario, no en la lista",
    body: "Una lista dice qué; un calendario dice cuándo y cuánto. Al reservar un bloque de 9:00 a 10:30 para el informe, conviertes una intención vaga en una cita contigo. Las listas acumulan culpa; los calendarios reparten trabajo."
  },
  {
    id: "pro-10", topic: "productividad",
    title: "Gestiona energía, no solo tiempo",
    body: "Dos horas cansado producen menos que cuarenta minutos fresco. En vez de exprimir más horas, pregunta: ¿qué me da energía y qué me la roba? Dormir, moverte, comer decente y descansar a tiempo no compiten con tu productividad: son su materia prima."
  },
  {
    id: "pro-11", topic: "productividad",
    title: "El 20% que produce el 80%",
    body: "En casi cualquier lista de tareas, unas pocas generan la mayor parte del resultado. Encuéntralas preguntando: si solo pudiera hacer una cosa hoy, ¿cuál movería más la aguja? Trabajar mucho en lo que importa poco es la forma más elegante de perder el tiempo."
  },
  {
    id: "pro-12", topic: "productividad",
    title: "Define «hecho» antes de empezar",
    body: "Media procrastinación nace de tareas difusas: «avanzar el proyecto» no se puede terminar, así que nunca apetece empezar. Reescribe cada tarea con un final verificable: «enviar el borrador a Marta». Si sabes exactamente cuándo habrás acabado, empezar cuesta la mitad."
  },
  {
    id: "pro-13", topic: "productividad",
    title: "Cada reunión tiene un precio",
    body: "Una reunión de una hora con cinco personas cuesta cinco horas de trabajo colectivo. Antes de aceptar (o convocar), pregunta: ¿esto necesita reunión, o bastaría un mensaje? Y si la hay: orden del día, hora de fin, y solo los imprescindibles."
  },
  {
    id: "pro-14", topic: "productividad",
    title: "Procrastinar es un problema de emociones, no de pereza",
    body: "No pospones la tarea: pospones la incomodidad que te produce (aburrimiento, miedo a hacerlo mal, no saber por dónde empezar). El truco no es más disciplina sino bajar la incomodidad: trocea la tarea, aclárala, o simplemente nómbrala: «esto me agobia». Lo que se nombra, encoge."
  },
  {
    id: "pro-15", topic: "productividad",
    title: "Empieza mal a propósito",
    body: "Dite: «voy a escribir el peor primer párrafo posible» o «voy a hacer solo cinco minutos». El listón bajo desactiva la resistencia, y una vez en marcha, seguir es casi automático. Empezar es un interruptor, no una rampa: no necesitas impulso, necesitas contacto."
  },
  {
    id: "pro-16", topic: "productividad",
    title: "Sistemas por encima de metas",
    body: "La meta es aprobar; el sistema es estudiar 45 minutos cada mañana. La meta te dice dónde quieres llegar, pero solo el sistema te lleva. Los que llegan y los que no suelen tener las mismas metas: lo que los separa es el sistema. Diseña el tuyo y olvídate un poco del marcador."
  },
  {
    id: "pro-17", topic: "productividad",
    title: "La revisión semanal: 30 minutos que ordenan todo",
    body: "Una vez por semana, siéntate con tu lista y tu calendario: ¿qué quedó a medias? ¿qué ya no importa? ¿qué viene ahora? Esa media hora evita que la semana te pase por encima y convierte el caos acumulado en un plan. Es mantenimiento, como afilar el hacha."
  },
  {
    id: "pro-18", topic: "productividad",
    title: "Elimina, automatiza y solo después optimiza",
    body: "No aceleres lo que no deberías hacer. Orden correcto: primero pregunta si la tarea puede desaparecer; luego, si puede hacerse sola (plantillas, domiciliaciones, recordatorios); y solo al final, cómo hacerla más rápido. Optimizar lo innecesario es la trampa favorita de la gente ocupada."
  },
  {
    id: "pro-19", topic: "productividad",
    title: "Estar ocupado no es rendir",
    body: "Responder mensajes todo el día se siente productivo porque hay movimiento constante. Pero al final, la pregunta es otra: ¿qué existe hoy que ayer no existía? La actividad es ruido; el avance es obra. Mide tus días por lo creado, no por lo agitado."
  },
  {
    id: "pro-20", topic: "productividad",
    title: "Las dos listas: lo que harás y lo que evitarás",
    body: "Escribe tus 25 objetivos y rodea los 5 más importantes. Los otros 20 no son tu segunda prioridad: son tu lista de «evitar a toda costa», porque son lo bastante atractivos para robarte tiempo de los 5 primeros. Lo mediocre-tentador es más peligroso que lo inútil."
  },
  {
    id: "pro-21", topic: "productividad",
    title: "Tócalo una sola vez",
    body: "Abrir un correo, leerlo y dejarlo «para luego» significa procesarlo dos veces (o cinco). Cuando toques algo, decide en el momento: respóndelo, agéndalo, delégalo o bórralo. Cada cosa manoseada y pospuesta paga un impuesto de atención en cada pasada."
  },
  {
    id: "pro-22", topic: "productividad",
    title: "Deja la tarea a medio terminar",
    body: "Suena contraintuitivo, pero terminar el día a mitad de un párrafo o con el siguiente paso clarísimo hace que retomar mañana sea inmediato: la mente ya sabe por dónde seguir. Lo difícil no es trabajar: es arrancar. Déjate siempre la rampa puesta."
  },
  {
    id: "pro-23", topic: "productividad",
    title: "Di que sí más despacio",
    body: "Casi todos los compromisos que te ahogan hoy los aceptaste con entusiasmo hace semanas. Regla simple: nunca aceptes nada importante en el momento. «Déjame mirarlo y te digo mañana» te da el tiempo que tu yo entusiasta necesita para consultar con tu yo realista."
  },
  {
    id: "pro-24", topic: "productividad",
    title: "El descanso también se planifica",
    body: "Si solo descansas cuando ya no puedes más, descansas tarde y mal. Programa el ocio con la misma seriedad que el trabajo: una tarde libre de verdad, sin culpa y sin móvil de trabajo, rinde intereses toda la semana. Trabajar sin parar no es compromiso: es mala planificación."
  },

  // ---------- HABITOS ----------
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
  {
    id: "hab-7", topic: "habitos",
    title: "Prepara la noche anterior",
    body: "La versión de ti de la mañana tiene poca voluntad y muchas excusas. Déjaselo todo hecho: la ropa de deporte a la vista, el desayuno decidido, la primera tarea del día escrita. Un hábito empieza a las 7:00 se gana a las 23:00 del día anterior."
  },
  {
    id: "hab-8", topic: "habitos",
    title: "Junta lo que debes con lo que te gusta",
    body: "Solo tu pódcast favorito mientras planchas; solo esa serie mientras haces bici estática. Al emparejar la tentación con la obligación, el hábito difícil hereda el atractivo del placer. No luches contra tus ganas: úsalas de remolque."
  },
  {
    id: "hab-9", topic: "habitos",
    title: "La regla de los 20 segundos",
    body: "Basta con que un hábito cueste 20 segundos más para que lo hagas mucho menos, y 20 menos para que lo hagas más. Deja la guitarra fuera de la funda y el mando de la tele dentro de un cajón. La fricción diminuta decide más que la motivación enorme."
  },
  {
    id: "hab-10", topic: "habitos",
    title: "Nunca cero",
    body: "Los días malos existen; la cuestión es qué haces con ellos. La regla «nunca cero» dice: aunque sea una flexión, una frase, un minuto. No es por el resultado de ese día, sino por no romper tu identidad de persona que cumple. El uno es infinitamente mayor que el cero."
  },
  {
    id: "hab-11", topic: "habitos",
    title: "Marca la X en el calendario",
    body: "Cuelga un calendario y tacha cada día que cumplas el hábito. La cadena de X se convierte en algo que no quieres romper, y ver el progreso acumulado alimenta las ganas de seguir. Lo que se mide y se ve, se repite. Es marketing, y funciona contigo mismo."
  },
  {
    id: "hab-12", topic: "habitos",
    title: "Una recaída no es una recaída hasta que la conviertes en una",
    body: "Saltarte el gimnasio una semana por gripe no borra seis meses de entrenamiento: el progreso real vive en tu cuerpo y en tu identidad, no en la racha. El peligro no es parar, es la historia que te cuentas al parar («ya lo estropeé todo»). Retoma sin drama: el hábito sigue ahí."
  },
  {
    id: "hab-13", topic: "habitos",
    title: "Haz que la opción buena sea la opción por defecto",
    body: "Somos vagos con elegancia: tomamos lo que esté puesto por defecto. Aprovéchalo: agua fría en la nevera y refrescos fuera de casa, la fruta lavada y a la vista, el gimnasio de camino al trabajo. No elijas bien cada día: monta el escenario para no tener que elegir."
  },
  {
    id: "hab-14", topic: "habitos",
    title: "Planes «si pasa X, haré Y»",
    body: "Los hábitos mueren en los imprevistos: llueve, hay cena, llegas tarde. Prepara respuestas de antemano: «si llueve, entreno en casa 15 minutos»; «si hay cena, pido primero y no pico pan». Decidir en frío lo que harás en caliente multiplica varias veces la tasa de cumplimiento."
  },
  {
    id: "hab-15", topic: "habitos",
    title: "Ponle nombre al rol, no a la tarea",
    body: "«Tengo que salir a correr» pesa; «soy corredor» empuja. Cuando el hábito se vuelve parte de quién eres, cumplirlo deja de ser un esfuerzo y se convierte en coherencia. Empieza a hablarte con el rol: escritor, deportista, ahorrador. Las acciones siguen a la identidad."
  },
  {
    id: "hab-16", topic: "habitos",
    title: "Los hábitos ancla arrastran a los demás",
    body: "Hay hábitos que, al instalarse, reordenan todo lo demás: hacer ejercicio suele mejorar la comida y el sueño sin proponérselo; madrugar reorganiza la noche. Si no sabes por dónde empezar, elige uno de estos hábitos ancla y deja que haga efecto dominó."
  },
  {
    id: "hab-17", topic: "habitos",
    title: "Sustituye, no elimines",
    body: "Los malos hábitos cubren una necesidad real: el cigarro da pausa, el scroll da escape, el picoteo da consuelo. Si solo quitas el hábito, la necesidad queda huérfana y vuelve con hambre. Encuentra qué te da, y dale eso mismo por otra vía: pausa con té, escape con paseo."
  },
  {
    id: "hab-18", topic: "habitos",
    title: "Te acabas pareciendo a tu círculo",
    body: "Es mucho más fácil comer bien entre gente que come bien, y casi imposible dejar de fumar en una cuadrilla de fumadores. La fuerza de voluntad individual pierde contra la cultura del grupo. Elige entornos donde tu hábito deseado sea lo normal, y lo normal hará el resto."
  },
  {
    id: "hab-19", topic: "habitos",
    title: "Los 21 días son un mito",
    body: "Instalar un hábito real tarda de media unos dos meses, y a veces bastantes más. Saberlo te protege: cuando en la semana cuatro siga costando, no es que lo estés haciendo mal — es que así funciona. Cuenta con la travesía larga y no te bajes del barco a mitad."
  },
  {
    id: "hab-20", topic: "habitos",
    title: "Sube la dosis un 1%, no un 100%",
    body: "El error clásico: pasar de nada a una hora diaria, aguantar dos semanas y abandonar. El cuerpo y la agenda aceptan mejor las subidas invisibles: un minuto más, una página más, medio kilo más. La progresión aburrida es la única que llega lejos."
  },
  {
    id: "hab-21", topic: "habitos",
    title: "Diseña también el hábito de apagar",
    body: "Igual que la mañana tiene rutina, el final del día la necesita: una hora fija para cerrar el portátil, luces más bajas, el móvil a cargar fuera del cuarto. Los buenos días no terminan por casualidad: se cierran. Y cómo cierras hoy decide cómo arrancas mañana."
  },
  {
    id: "hab-22", topic: "habitos",
    title: "Ponle testigos a tu hábito",
    body: "Dile a alguien concreto qué vas a hacer y cuándo, o mejor: queda con esa persona para hacerlo juntos. Fallarte a ti se perdona fácil; fallar a quien te espera en el portal a las 7, no. La presión social bien usada no es una carga: es un andamio."
  },
  {
    id: "hab-23", topic: "habitos",
    title: "Un lugar, un uso",
    body: "Si trabajas en la cama, la cama deja de ser señal de dormir; si comes en el sofá viendo series, el sofá pide comida. El cerebro asocia espacios con conductas. Dale a cada actividad su territorio (aunque sea una silla concreta) y el lugar disparará el hábito por ti."
  },
  {
    id: "hab-24", topic: "habitos",
    title: "Celebra en el segundo uno",
    body: "El cerebro repite lo que le sienta bien inmediatamente, no lo que será bueno en diez años. Tras cumplir el hábito, date el micro-premio al instante: un «bien hecho» con ganas, tachar la casilla, el café tranquilo. Suena tonto y es neurología básica: sin recompensa cercana, no hay repetición."
  },
  {
    id: "hab-25", topic: "habitos",
    title: "Haz auditoría de tus hábitos invisibles",
    body: "Ya tienes decenas de hábitos: mirar el móvil al despertar, picar al llegar a casa, la serie hasta tarde. No los elegiste: se instalaron solos. Dedica un día a anotarlos y pregúntale a cada uno: ¿me acerca o me aleja de quien quiero ser? No puedes editar un guion que no has leído."
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
  {
    id: "men-7", topic: "mentalidad",
    title: "La regla del 10/10/10",
    body: "Ante una decisión difícil, pregúntate cómo te sentirás con cada opción dentro de 10 minutos, 10 meses y 10 años. La perspectiva temporal desinfla los miedos del momento y revela qué importa de verdad. Pocas cosas que dan pánico hoy sobreviven al filtro de los 10 años."
  },
  {
    id: "men-8", topic: "mentalidad",
    title: "Tu cerebro tiene dos marchas",
    body: "Una rápida e intuitiva que decide sin esfuerzo, y otra lenta y analítica que razona pero es vaga. La mayoría de tus errores vienen de dejar que la rápida conteste preguntas que eran para la lenta. Ante decisiones importantes, frena a propósito: duerme la decisión, escribe los pros, pide otra opinión."
  },
  {
    id: "men-9", topic: "mentalidad",
    title: "Cuanto menos sabes, más seguro te sientes",
    body: "Al empezar en cualquier campo hay un pico de confianza traicionero: sabes tan poco que ni siquiera ves lo que ignoras. Luego llega el valle de la humildad, y solo con años, la seguridad fundada. Desconfía de tu certeza en terrenos nuevos, y de paso, sé paciente con la de los demás."
  },
  {
    id: "men-10", topic: "mentalidad",
    title: "Lo gastado ya no cuenta",
    body: "Seguir en el cine porque «ya pagué la entrada», o en una carrera porque «llevo tres años», es tirar tiempo bueno detrás del malo. Lo invertido no se recupera decidas lo que decidas. La única pregunta válida es: sabiendo lo que sé hoy, ¿volvería a elegir esto? Si no, sal."
  },
  {
    id: "men-11", topic: "mentalidad",
    title: "Divide el mundo en dos: lo que depende de ti y lo que no",
    body: "El tráfico, la opinión ajena y la lluvia no son asunto tuyo; tu esfuerzo, tus respuestas y tu actitud, sí. Cada minuto de rabia contra lo incontrolable es energía robada a lo controlable. Esta sola distinción, practicada a diario, elimina la mitad del sufrimiento inútil."
  },
  {
    id: "men-12", topic: "mentalidad",
    title: "Los hechos no cambian; el marco sí",
    body: "«Me han rechazado» puede ser una humillación o un dato para mejorar la propuesta. El suceso es idéntico; la historia que montas alrededor decide cómo te afecta. Reencuadrar no es autoengaño: es elegir, entre las lecturas verdaderas posibles, la que te deja actuar."
  },
  {
    id: "men-13", topic: "mentalidad",
    title: "Tu cerebro es velcro para lo malo y teflón para lo bueno",
    body: "Sobrevivimos siendo paranoicos: una amenaza recordada valía más que diez alegrías. Por eso una crítica pesa más que cien elogios. Compénsalo a mano: apunta cada noche tres cosas que salieron bien. No es cursilería: es corregir un sesgo de fábrica."
  },
  {
    id: "men-14", topic: "mentalidad",
    title: "¿Y esto qué me toca hacer a mí?",
    body: "Ante cualquier problema, hay dos preguntas: «¿de quién es la culpa?» y «¿qué puedo hacer yo ahora?». La primera es un debate sin premio; la segunda te devuelve el volante. Responsabilidad no significa que todo sea culpa tuya: significa que la respuesta siempre es tuya."
  },
  {
    id: "men-15", topic: "mentalidad",
    title: "Buscas pruebas de lo que ya crees",
    body: "Si piensas que tu jefe te tiene manía, encontrarás señales a diario; si crees que le caes bien, también. Filtramos la realidad para confirmar lo que ya pensamos. El antídoto es incómodo y simple: busca activamente el dato que te llevaría la contraria. Si no lo encuentras ni queriendo, quizá tengas razón."
  },
  {
    id: "men-16", topic: "mentalidad",
    title: "Todo tarda el doble de lo que planeas",
    body: "Planificamos imaginando que todo saldrá bien, y algo nunca sale bien. Por eso las obras, los proyectos y las mudanzas se retrasan siempre. Truco: estima, y luego pregúntate cuánto tardó algo parecido la última vez. Los datos del pasado predicen mejor que el optimismo del presente."
  },
  {
    id: "men-17", topic: "mentalidad",
    title: "Vas a morir, y eso es útil",
    body: "No como amenaza, sino como filtro: ante una decisión, imagina que miras tu vida desde el final. ¿Esta discusión importará? ¿Este miedo merecía mandar tanto? La finitud es el mejor editor de prioridades que existe. Lo que no sobrevive a esa mirada, probablemente sobra."
  },
  {
    id: "men-18", topic: "mentalidad",
    title: "Trátate como tratarías a un amigo",
    body: "Si un amigo suspende, no le dices «eres un inútil»: le dices que pasa, que aprenda y que siga. Contigo usas otro idioma, y no funciona: la autocrítica feroz no motiva, paraliza. La autocompasión no es blandura — la gente que se trata bien lo intenta más veces, no menos."
  },
  {
    id: "men-19", topic: "mentalidad",
    title: "«Yo soy así» es una puerta cerrada por dentro",
    body: "Desordenado, impuntual, tímido, de letras… Cada etiqueta que te pones convierte un comportamiento (cambiable) en una esencia (fija). No eres tímido: hasta hoy has practicado poco hablar con desconocidos. La diferencia parece de matiz y es de destino."
  },
  {
    id: "men-20", topic: "mentalidad",
    title: "La acción va primero; las ganas vienen después",
    body: "Esperar la motivación para empezar es poner la carreta delante del caballo: la motivación suele aparecer una vez en marcha, como el apetito al comer. ¿No tienes ganas? Perfecto, no hacen falta. Empieza sin ellas, en pequeño, y deja que te alcancen por el camino."
  },
  {
    id: "men-21", topic: "mentalidad",
    title: "El miedo señala la dirección del crecimiento",
    body: "No el miedo físico, sino el otro: hablar en público, pedir el aumento, publicar tu trabajo, la conversación pendiente. Ese miedo casi siempre custodia algo que quieres. Úsalo de brújula: entre dos opciones, sospecha que la que te asusta un poco es la que te haría crecer."
  },
  {
    id: "men-22", topic: "mentalidad",
    title: "La envidia es un chivato con malos modales",
    body: "Es desagradable, pero trae información precisa: no envidias cualquier cosa, envidias lo que desearías para ti. ¿A quién envidias y por qué exactamente? Ahí suele estar enterrado un deseo que no te has atrevido a tomarte en serio. Escucha el mensaje y despide al mensajero."
  },
  {
    id: "men-23", topic: "mentalidad",
    title: "Tu yo futuro es un desconocido que te cae mal",
    body: "Al cerebro, tu yo de dentro de diez años le parece literalmente otra persona — por eso le endosas las deudas, la dieta y los trámites. El truco es acercarlo: imagina con detalle tu día a los 70, ponle cara, escríbele una carta. Cuanto más real se vuelve, mejor lo tratas hoy."
  },
  {
    id: "men-24", topic: "mentalidad",
    title: "La cinta de correr de la felicidad",
    body: "El coche nuevo emociona tres semanas; el ascenso, dos meses. Después, vuelves a tu nivel de siempre y necesitas la siguiente dosis. Esta adaptación es inevitable con las cosas, pero mucho menor con experiencias, vínculos y progreso personal. Invierte donde la cinta no corre tan rápido."
  },
  {
    id: "men-25", topic: "mentalidad",
    title: "Piensa en apuestas, no en certezas",
    body: "«¿Estoy seguro?» es mala pregunta; «¿qué probabilidad le doy?» es mejor. Decir «70% de que funcione» te obliga a considerar el 30% restante y a preparar el plan B. Los buenos resultados con malas decisiones existen, y viceversa: juzga tu proceso, no solo el marcador."
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
  {
    id: "sal-7", topic: "salud",
    title: "Movimiento en dosis pequeñas",
    body: "No necesitas una hora de gimnasio para que el cuerpo note la diferencia: subir escaleras, caminar en las llamadas, estirarte cada hora. El peor plan de ejercicio es el que exige condiciones perfectas; el mejor es el que cabe en el día que ya tienes."
  },
  {
    id: "sal-8", topic: "salud",
    title: "El ejercicio que no parece ejercicio",
    body: "Subir escaleras, cargar bolsas, limpiar a fondo, caminar mientras hablas por teléfono: ese movimiento «invisible» puede quemar más a lo largo del día que una sesión de gimnasio. No subestimes la vida activa por no llevar ropa deportiva. Muévete mucho; entrena además, no en vez de."
  },
  {
    id: "sal-9", topic: "salud",
    title: "El café tiene su ventana",
    body: "La cafeína bloquea la señal de sueño, no la elimina: sigue acumulándose y te la cobra después. Dos reglas prácticas: retrasa el primer café un rato tras despertar (deja que el cuerpo arranque solo) y corta a primera hora de la tarde — la cafeína de las 16:00 sigue en sangre a medianoche."
  },
  {
    id: "sal-10", topic: "salud",
    title: "El alcohol te duerme y te roba el sueño",
    body: "La copa nocturna da somnolencia, sí, pero fragmenta la segunda mitad de la noche y recorta justo las fases que reparan cuerpo y memoria. Duermes horas, descansas menos. Si bebes, mejor temprano y poco; el «para dormir mejor» es la excusa peor documentada que existe."
  },
  {
    id: "sal-11", topic: "salud",
    title: "La proteína es la saciedad barata",
    body: "De los tres macronutrientes, la proteína es la que más llena por caloría y la que más protege el músculo. Si pasas hambre a media mañana, revisa el desayuno: la bollería pide más bollería; los huevos, el yogur o las legumbres aguantan horas. Come proteína primero y el resto se ordena."
  },
  {
    id: "sal-12", topic: "salud",
    title: "La última hora sin pantalla brillante",
    body: "No es solo la luz: es que el contenido está diseñado para activarte justo cuando toca lo contrario. La última hora antes de dormir marca la calidad de toda la noche. Baja luces, baja estímulos, y deja el móvil cargando fuera del dormitorio: el despertador de toda la vida cuesta diez euros."
  },
  {
    id: "sal-13", topic: "salud",
    title: "La siesta perfecta dura 20 minutos",
    body: "Corta, recarga sin resaca; larga, te despierta dentro de un ciclo profundo y sales peor de lo que entraste. Ponte alarma a los 20-25 minutos y hazla temprano (antes de las 16:00) para no robarle sueño a la noche. Media taza de energía, cero efectos secundarios."
  },
  {
    id: "sal-14", topic: "salud",
    title: "Dos inhalaciones y un suspiro largo",
    body: "Cuando necesites calmarte ya: inhala por la nariz, añade una segunda inhalación corta encima, y suelta todo el aire por la boca, muy despacio. Dos o tres repeticiones bajan la activación en menos de un minuto. Es el freno de emergencia fisiológico, y siempre lo llevas puesto."
  },
  {
    id: "sal-15", topic: "salud",
    title: "Camina diez minutos después de comer",
    body: "El paseo suave tras la comida ayuda a los músculos a absorber la glucosa, suaviza el pico de azúcar y evita la modorra de las 15:00. Es probablemente el hábito de salud con mejor relación esfuerzo-beneficio que existe: diez minutos, cero equipamiento, efecto inmediato."
  },
  {
    id: "sal-16", topic: "salud",
    title: "La mitad del plato, vegetales",
    body: "Olvida contar calorías si te agota: usa geometría. Mitad del plato verduras u hortalizas, un cuarto proteína, un cuarto guarnición. Sin pesar, sin apps, sin culpa. La regla es tan simple que sobrevive a cenas fuera, táperes y días malos — y por eso funciona."
  },
  {
    id: "sal-17", topic: "salud",
    title: "A veces el cansancio es sed",
    body: "La deshidratación leve — tan leve que no da sed clara — ya baja la concentración, el ánimo y la energía. Antes de culpar al día o al café que falta, bebe un vaso de agua y espera diez minutos. Es el diagnóstico más barato de la medicina."
  },
  {
    id: "sal-18", topic: "salud",
    title: "No es el estrés: es la falta de recuperación",
    body: "El músculo crece descansando tras el esfuerzo, y el resto del cuerpo funciona igual. El estrés puntual con buena recuperación te hace más fuerte; el estrés moderado sin pausas te desgasta sin ruido. No preguntes solo «¿cuánto aguanto?», pregunta «¿cuándo recupero?»."
  },
  {
    id: "sal-19", topic: "salud",
    title: "El jetlag de los fines de semana",
    body: "Acostarte y levantarte tres horas más tarde el sábado equivale a volar a otro huso horario cada semana: el lunes tu reloj interno está en otro continente. Intenta que el desfase no pase de una hora. El fin de semana se disfruta igual por la mañana que de madrugada."
  },
  {
    id: "sal-20", topic: "salud",
    title: "Levántate cada 45 minutos",
    body: "Estar sentado muchas horas seguidas pasa factura incluso si entrenas a diario: el cuerpo necesita interrupciones, no solo sesiones. Pon una alarma o usa cada llamada como excusa para ponerte de pie, estirar y dar veinte pasos. Sentarse no es el problema; no levantarse, sí."
  },
  {
    id: "sal-21", topic: "salud",
    title: "El ejercicio es un antidepresivo de amplio espectro",
    body: "Pocas intervenciones mejoran a la vez el ánimo, la ansiedad, el sueño y la memoria. El ejercicio lo hace, con efectos comparables a tratamientos de primera línea en casos leves y moderados. No hace falta maratón: caminar rápido media hora ya mueve la aguja. Es medicina que además es gratis."
  },
  {
    id: "sal-22", topic: "salud",
    title: "Los ultraprocesados vienen con truco",
    body: "No fallas tú: ese producto está diseñado por equipos enteros para que no puedas parar — la proporción exacta de grasa, azúcar, sal y crujido. Contra ingeniería de precisión, la voluntad pierde. La defensa no es resistir con el paquete abierto: es que no entre en casa."
  },
  {
    id: "sal-23", topic: "salud",
    title: "Cardio suave: poder hablar mientras te mueves",
    body: "Hay una intensidad mágica: la que te deja mantener una conversación con esfuerzo. Ese ritmo — trotar suave, bici tranquila, caminar rápido — construye la base aeróbica que sostiene tu energía diaria y tu salud cardiovascular. No todo entrenamiento tiene que doler para contar."
  },
  {
    id: "sal-24", topic: "salud",
    title: "Veinte minutos de verde bajan el volumen",
    body: "Un rato en un parque, un paseo entre árboles, incluso mirar vegetación por la ventana: el contacto con la naturaleza reduce la hormona del estrés de forma medible. No es esoterismo, es biología de una especie que pasó casi toda su historia al aire libre. Recétatelo como lo que es."
  },
  {
    id: "sal-25", topic: "salud",
    title: "Vacía la cabeza antes de apagarla",
    body: "Si al tumbarte llegan las listas, las preocupaciones y los «no olvides», no tienes insomnio: tienes tareas sin recoger. Diez minutos antes de acostarte, escríbelo todo: lo pendiente, lo que te ronda, el plan de mañana. La mente suelta lo que sabe que está apuntado."
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
  {
    id: "cre-7", topic: "creatividad",
    title: "El modo difuso trabaja cuando tú no",
    body: "El cerebro tiene dos marchas creativas: la concentrada, para atacar el problema, y la difusa, que conecta ideas sueltas cuando paseas, friegas o te duchas. Las mejores soluciones nacen alternando: aprieta una hora, suéltalo del todo, y deja que el segundo turno remate la faena."
  },
  {
    id: "cre-8", topic: "creatividad",
    title: "Diez ideas cada mañana",
    body: "Escribe diez ideas al día sobre cualquier cosa: títulos, negocios, regalos, mejoras de tu casa. Serán casi todas malas — no importa. No entrenas la calidad, entrenas la fluidez: que tu cerebro aprenda que cuando pides ideas, llegan. La creatividad es un músculo con memoria."
  },
  {
    id: "cre-9", topic: "creatividad",
    title: "La originalidad vive en las intersecciones",
    body: "Las ideas más frescas rara vez salen de profundizar más en tu campo: salen de cruzarlo con otro. Psicología + finanzas, biología + arquitectura, cocina + química. Aprende algo de un terreno lejano al tuyo y pregúntate: ¿qué pasaría si aplicara esto aquí? Ahí no hay competencia."
  },
  {
    id: "cre-10", topic: "creatividad",
    title: "Copiar a mano enseña lo que mirar no",
    body: "Reproduce nota a nota, trazo a trazo o frase a frase una obra que admires (para aprender, no para firmar). Al copiarla sientes sus decisiones desde dentro: por qué ese orden, ese ritmo, ese silencio. Todos los maestros empezaron imitando; la voz propia se construye sobre manos entrenadas."
  },
  {
    id: "cre-11", topic: "creatividad",
    title: "El bloqueo suele ser hambre de material",
    body: "Cuando no sale nada, no siempre falta talento: a menudo falta gasolina. No puedes remezclar lo que no has metido. Lee raro, visita sitios nuevos, habla con gente distinta, consume fuera de tu género. Llenar el pozo también es trabajar, aunque no lo parezca."
  },
  {
    id: "cre-12", topic: "creatividad",
    title: "Sé creador por la mañana y editor por la tarde",
    body: "Crear y corregir usan mentalidades opuestas: una necesita permiso, la otra criterio. Si editas mientras escribes, el crítico interno estrangula al creador antes de que arranque. Sepáralos en el tiempo: primero produce sin mirar atrás; horas (o días) después, corrige sin piedad."
  },
  {
    id: "cre-13", topic: "creatividad",
    title: "Las malas ideas son el peaje de las buenas",
    body: "En una tormenta de ideas, la propuesta absurda vale oro: relaja el listón, abre direcciones y a menudo contiene la semilla de la solución. Prohibido juzgar mientras se genera. Primero cantidad sin vergüenza; el filtro llega después, y con otra cara."
  },
  {
    id: "cre-14", topic: "creatividad",
    title: "Consúltalo con la almohada, literalmente",
    body: "Durante el sueño, el cerebro reorganiza lo aprendido y ensaya combinaciones que despierto no se te ocurren. Truco práctico: repasa el problema justo antes de dormir, sin forzarlo, y tenlo a mano al despertar. Amanecer con la respuesta no es magia: es dejar trabajar al turno de noche."
  },
  {
    id: "cre-15", topic: "creatividad",
    title: "Atascado: cambia de herramienta",
    body: "Si no sale escribiendo, dibújalo; si no sale en pantalla, imprímelo; si no sale sentado, cuéntaselo a alguien en voz alta mientras camináis. Cada medio obliga al cerebro a reformular el problema, y en la reformulación suele esconderse la salida."
  },
  {
    id: "cre-16", topic: "creatividad",
    title: "Mejora la pregunta antes que la respuesta",
    body: "«¿Cómo hago más publicidad?» produce ideas de publicidad. «¿Por qué repetiría alguien?» produce otro negocio. Las respuestas heredan el tamaño de su pregunta. Cuando el problema se resista, no busques respuestas más ingeniosas: reformúlalo cinco veces y elige la versión más fértil."
  },
  {
    id: "cre-17", topic: "creatividad",
    title: "Ten un proyecto paralelo pequeño",
    body: "Un huerto, un blog, una maqueta, un curso de cerámica. El proyecto lateral sin presión hace tres cosas: descansa tu mente del principal, te mantiene creando cuando el trabajo aprieta, y contrabandea ideas de un mundo a otro. Muchas obras grandes nacieron de un hobby que se desmadró."
  },
  {
    id: "cre-18", topic: "creatividad",
    title: "La rutina es el andamio de la inspiración",
    body: "Los creadores prolíficos no esperan a la musa: la citan a horario fijo. Mismo sitio, misma hora, llueva la inspiración o no. La rutina parece enemiga del arte y es su guardaespaldas: elimina la decisión de «¿hoy creo o no?» y deja solo la de «¿qué creo hoy?»."
  },
  {
    id: "cre-19", topic: "creatividad",
    title: "La primera idea casi nunca es la buena",
    body: "Lo primero que se te ocurre también se le ocurrió a todos: es la respuesta de catálogo. Regla del tres: cuando tengas una idea que te guste, oblígate a generar dos alternativas más antes de decidir. Las opciones dos y tres nacen ya compitiendo, y eso las hace mejores."
  },
  {
    id: "cre-20", topic: "creatividad",
    title: "Roba fuera de tu gremio",
    body: "Si haces marketing y solo miras marketing, harás el marketing de todos. Los restaurantes pueden aprender del teatro; los profesores, de los videojuegos; los médicos, de la aviación. Tu sector ya se copió a sí mismo entero: la ventaja está en importar."
  },
  {
    id: "cre-21", topic: "creatividad",
    title: "Camina sin auriculares de vez en cuando",
    body: "El paseo con pódcast es aprendizaje; el paseo en silencio es digestión. Sin input, la mente divaga, y divagar es el estado donde se conectan cabos sueltos. Si todas tus caminatas van con banda sonora, le has quitado a tu cerebro su sala de máquinas."
  },
  {
    id: "cre-22", topic: "creatividad",
    title: "Guarda los recortes: tu museo personal",
    body: "Frases que te paran, fotos que te intrigan, ideas a medias, errores curiosos. Guárdalo todo en un mismo sitio y visítalo cuando estés seco. La creatividad rara vez inventa de cero: recombina. Un archivo personal rico es la diferencia entre empezar de la nada y empezar con ventaja."
  },
  {
    id: "cre-23", topic: "creatividad",
    title: "Enséñalo a medio hacer",
    body: "Mostrar solo lo terminado te condena a descubrir tarde que ibas mal. Enseña el boceto, el borrador, la demo con cables a la vista, y di exactamente qué feedback necesitas. Da más pudor y ahorra más meses que cualquier otra costumbre creativa."
  },
  {
    id: "cre-24", topic: "creatividad",
    title: "Termina cosas: es una habilidad aparte",
    body: "Empezar es emocionante; el 80% es llevadero; el último 20% es un desierto donde mueren casi todos los proyectos. Terminar — decidir que ya, pulir lo justo, soltar — se entrena como cualquier músculo. Y cambia tu identidad: no es lo mismo tener diez inicios que tres obras."
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
  {
    id: "din-7", topic: "dinero",
    title: "Presupuesto inverso: cuenta lo que queda",
    body: "Registrar cada gasto agota y se abandona. Alternativa simple: automatiza el ahorro y las facturas a principio de mes, y gasta lo que quede sin culpa ni hoja de cálculo. Si lo importante ya está cubierto, no necesitas vigilar cada café."
  },
  {
    id: "din-8", topic: "dinero",
    title: "Tu cerebro prefiere 10 hoy que 100 mañana",
    body: "Estamos cableados para el presente: la recompensa inmediata brilla y la futura se ve borrosa. Por eso ahorrar cuesta y gastar no. No luches contra el cableado: puentea la decisión. Que el ahorro salga solo el día de la nómina, antes de que tu yo impaciente se entere de que existía."
  },
  {
    id: "din-9", topic: "dinero",
    title: "Divide el precio entre los usos",
    body: "Un abrigo de 200€ que usas 200 días sale a 1€ el día; unos zapatos de 40€ que te pones dos veces salen a 20€. El precio de la etiqueta engaña; el coste por uso revela. Compra caro lo que usas a diario y barato (o nada) lo que usarás una vez."
  },
  {
    id: "din-10", topic: "dinero",
    title: "Convierte los precios en horas de tu vida",
    body: "Si ganas 10€ la hora netos, ese capricho de 150€ cuesta dos días enteros de tu trabajo. Hacer la conversión antes de comprar cambia la pregunta de «¿puedo pagarlo?» a «¿vale eso de mi vida?». Muchas compras no sobreviven al cambio de divisa."
  },
  {
    id: "din-11", topic: "dinero",
    title: "Audita tus suscripciones dos veces al año",
    body: "Las suscripciones son el gasto perfecto: pequeñas, invisibles y automáticas. Tres apps, dos plataformas y un gimnasio fantasma pueden sumar más de mil euros al año. Cada seis meses, revisa la lista completa con una regla: si dudas, cancela. Volver a suscribirse tarda un minuto."
  },
  {
    id: "din-12", topic: "dinero",
    title: "El fondo indexado: aburrido a propósito",
    body: "En vez de apostar por una empresa, compras un trocito de cientos a la vez, con comisiones mínimas, y dejas pasar los años. Sin gestor estrella ni corazonadas. La mayoría de los profesionales no consigue batir a este método aburrido de forma consistente. En inversión, el aburrimiento es una virtud carísima."
  },
  {
    id: "din-13", topic: "dinero",
    title: "No pongas todos los huevos en la misma cesta",
    body: "Da igual lo prometedor que parezca: cualquier empresa, sector o país puede tener una década horrible. Diversificar — repartir entre muchos activos distintos — es admitir con humildad que no sabes el futuro. Renuncias al pelotazo a cambio de algo mejor: que ningún golpe te saque de la partida."
  },
  {
    id: "din-14", topic: "dinero",
    title: "El tiempo en el mercado gana a adivinar el momento",
    body: "Esperar «a que baje» para invertir suena prudente y suele salir caro: nadie acierta las caídas de forma consistente, y los mejores días llegan sin avisar, a menudo pegados a los peores. Aportar una cantidad fija todos los meses, pase lo que pase, gana a casi todos los adivinos."
  },
  {
    id: "din-15", topic: "dinero",
    title: "El dinero no sabe de dónde viene",
    body: "Tratamos el bonus como «dinero para caprichos» y la nómina como «dinero serio», pero todos los euros son idénticos. Esa contabilidad mental hace que despilfarres devoluciones de Hacienda que ahorrarías si vinieran en la nómina. Truco: todo ingreso extra pasa primero por la misma regla que tu sueldo."
  },
  {
    id: "din-16", topic: "dinero",
    title: "El precio tachado es un ancla",
    body: "«Antes 100€, ahora 60€» te hace sentir que ganas 40, aunque el producto nunca valiera 100. El primer número que ves ancla tu percepción, y las tiendas lo saben. Defensa: ignora el tachado y pregunta solo «¿pagaría 60€ por esto si no hubiera visto otro precio?»."
  },
  {
    id: "din-17", topic: "dinero",
    title: "Los cafés no te arruinan; las cuotas sí",
    body: "Recortar caprichos de 2€ da sensación de control, pero la partida se juega en los gastos grandes: vivienda, coche, deudas. Bajar un 10% el alquiler o evitar un coche financiado ahorra más que mil cafés. Vigila lo grande primero; lo pequeño, solo si te sobra energía."
  },
  {
    id: "din-18", topic: "dinero",
    title: "Ingresos altos no es riqueza",
    body: "Riqueza es lo que queda, no lo que entra: hay sueldos enormes viviendo al día y sueldos modestos con patrimonio. La medida útil es otra: ¿cuántos meses vivirías si dejaras de ingresar mañana? Esa cifra — tu autonomía — es la que compra tranquilidad y libertad de elección."
  },
  {
    id: "din-19", topic: "dinero",
    title: "Deudas: bola de nieve o avalancha",
    body: "Dos métodos para salir: avalancha (pagar primero la deuda con mayor interés: matemáticamente óptimo) o bola de nieve (pagar primero la más pequeña: victoria rápida que motiva). El mejor método no es el óptimo sobre el papel, sino el que tú vas a mantener. Elige y no pares."
  },
  {
    id: "din-20", topic: "dinero",
    title: "Negociar tu sueldo: la hora mejor pagada de tu vida",
    body: "Mil euros más al año, acumulados y revalorizados durante una carrera, son decenas de miles. Y sin embargo casi nadie negocia. Prepara datos (mercado, tus resultados), pide con calma y aguanta el silencio. El «no» te deja donde estabas; el «sí» te acompaña décadas."
  },
  {
    id: "din-21", topic: "dinero",
    title: "Ponle piloto automático a tus finanzas",
    body: "Transferencia al ahorro el día 1, recibos domiciliados, inversión mensual programada. Cada decisión financiera que automatizas es una tentación que desaparece y un olvido que ya no cuesta dinero. Tu plan financiero no debería depender de tu estado de ánimo del día 28."
  },
  {
    id: "din-22", topic: "dinero",
    title: "Estás comparando tu economía con una ficción",
    body: "Ves los viajes y estrenos de los demás, pero no sus deudas ni su ansiedad de fin de mes. Comparas tu película completa con el tráiler de otros, y el tráiler siempre gana. Gasta según tu plan, no según tu feed: la mitad de ese lujo ajeno está financiado a 24 cuotas."
  },
  {
    id: "din-23", topic: "dinero",
    title: "Nunca arriesgues lo que no puedes perder",
    body: "Una apuesta puede tener buena pinta y aun así estar prohibida: si salir mal te deja fuera del juego (sin vivienda, sin colchón, sin sueño), no importa la probabilidad. Primero blinda lo esencial; especula solo con lo que, perdido del todo, te dolería sin hundirte."
  },
  {
    id: "din-24", topic: "dinero",
    title: "Tu mejor activo eres tú",
    body: "Un curso que sube tu sueldo un 5% rinde más que casi cualquier producto financiero, y nadie puede quitártelo. Antes de optimizar la rentabilidad de tus ahorros, pregúntate si esos mismos euros invertidos en habilidades, salud o contactos pagarían más. A menudo, la respuesta es sí."
  },
  {
    id: "din-25", topic: "dinero",
    title: "Las 72 horas de enfriamiento",
    body: "Compra no planificada de más de cierto importe: a la lista de espera 72 horas. Si a los tres días la sigues queriendo con la misma fuerza, cómprala en paz. La mayoría de las veces el deseo se ha ido — porque no era deseo del objeto, era el chispazo del momento."
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
  {
    id: "apr-7", topic: "aprendizaje",
    title: "Toma notas con tus palabras",
    body: "Copiar frases literales es transcribir, no aprender. Cierra la fuente y escribe la idea como se la contarías a un amigo: ese pequeño esfuerzo de traducción es donde tu cerebro procesa de verdad. Una nota reformulada vale por diez subrayados."
  },
  {
    id: "apr-8", topic: "aprendizaje",
    title: "Tarjetas de memoria: pregunta por delante, respuesta por detrás",
    body: "El sistema más probado para retener: tarjetas que te obligan a recordar (no a releer) y que se repasan justo antes de que las olvides, espaciando cada vez más. Con una app o en papel, diez minutos diarios sostienen un idioma, unas oposiciones o una carrera. Pocas herramientas rinden tanto."
  },
  {
    id: "apr-9", topic: "aprendizaje",
    title: "Mezcla los temas al estudiar",
    body: "Estudiar AAAA-BBBB se siente ordenado; estudiar ABAB-BABA se siente caótico y funciona mejor. Al alternar temas o tipos de problema, obligas al cerebro a preguntarse «¿qué toca aquí?» — que es exactamente la pregunta del examen y de la vida real. La confusión durante el estudio es inversión."
  },
  {
    id: "apr-10", topic: "aprendizaje",
    title: "Intenta resolverlo antes de mirar la solución",
    body: "Pelearte con el problema cinco minutos — aunque falles — prepara el terreno: cuando por fin ves la solución, encaja en los huecos que tu intento abrió, y se queda. Mirar la respuesta directamente es como ver el gimnasio por la ventana: cómodo e inútil."
  },
  {
    id: "apr-11", topic: "aprendizaje",
    title: "Lee con preguntas en la mano",
    body: "Antes de leer un capítulo, hojéalo y escribe dos o tres preguntas que esperas que responda. Leer para responder algo convierte el paseo pasivo en una búsqueda: la atención se afila y el recuerdo se multiplica. El texto es el mismo; el lector, no."
  },
  {
    id: "apr-12", topic: "aprendizaje",
    title: "Ver vídeos no es aprender",
    body: "Los vídeos y las clases producen una sensación deliciosa de entender — que se evapora al intentar hacerlo solo. Entender al ver es reconocimiento; saber es producción. Regla: por cada hora de consumo, al menos media de práctica: resolver, escribir, construir, explicar. Sin producción no hay aprendizaje, hay entretenimiento culto."
  },
  {
    id: "apr-13", topic: "aprendizaje",
    title: "El olvido tiene calendario: úsalo",
    body: "Olvidamos casi todo en los primeros días, y lo que sobrevive decae despacio. Por eso el repaso rinde más programado: hoy, en dos días, en una semana, en un mes. Cuatro repasos cortos bien puestos retienen más que diez horas seguidas la víspera. No estudies más: estudia en las fechas correctas."
  },
  {
    id: "apr-14", topic: "aprendizaje",
    title: "Engancha lo nuevo a lo que ya sabes",
    body: "La memoria no guarda datos sueltos: guarda conexiones. Cada vez que aprendas algo, pregúntate: ¿a qué se parece? ¿con qué choca? ¿dónde lo he visto antes? Un dato aislado es un globo que se escapa; atado a tu red de conocimiento, se queda para siempre."
  },
  {
    id: "apr-15", topic: "aprendizaje",
    title: "Escribir es pensar en cámara lenta",
    body: "Crees que entiendes un tema hasta que intentas escribir una página sobre él: ahí aparecen los agujeros, las contradicciones y las frases que no sabes terminar. Escribir no es transcribir el pensamiento — es fabricarlo. Si algo importa de verdad, escríbelo aunque nadie vaya a leerlo."
  },
  {
    id: "apr-16", topic: "aprendizaje",
    title: "Domina los fundamentos hasta el aburrimiento",
    body: "Lo avanzado es casi siempre lo básico bien combinado. Los mejores en cualquier campo no saben mil trucos: ejecutan los fundamentos con una solidez que parece magia. Cuando te atasques en lo complejo, sospecha de tus cimientos: suele haber una base floja cobrando peaje."
  },
  {
    id: "apr-17", topic: "aprendizaje",
    title: "Aprende en público",
    body: "Comparte tus notas, publica tu resumen, cuenta lo que estás aprendiendo. Efectos: te obliga a ordenar las ideas (enseñar es aprender dos veces), atrae correcciones gratis de gente que sabe más, y deja rastro de tu progreso. El pudor cuesta más caro que el error público."
  },
  {
    id: "apr-18", topic: "aprendizaje",
    title: "Estudia antes de dormir, repasa al despertar",
    body: "El sueño no es una pausa del aprendizaje: es su segunda mitad. Durante la noche, el cerebro reproduce y consolida lo del día — con prioridad para lo último y lo importante. Coloca lo difícil en la última hora despierto y dale un repaso de cinco minutos al levantarte: el sándwich perfecto."
  },
  {
    id: "apr-19", topic: "aprendizaje",
    title: "Haz autopsia de tus errores",
    body: "Un examen suspendido o un proyecto fallido contiene un mapa exacto de tus lagunas — y casi todo el mundo lo tira sin abrirlo. Dedica media hora: ¿qué fallé? ¿por qué exactamente? ¿qué confundí con qué? Duele más que pasar página y enseña más que tres temas nuevos."
  },
  {
    id: "apr-20", topic: "aprendizaje",
    title: "Busca correcciones rápidas, no solo contenido",
    body: "Puedes ver cien tutoriales de tenis sin mejorar el saque: falta alguien que te diga «la muñeca, así no». El feedback inmediato y específico es el ingrediente que separa practicar de repetir errores. Un profesor, un compañero que sepa más o incluso grabarte en vídeo: consíguelo como sea."
  },
  {
    id: "apr-21", topic: "aprendizaje",
    title: "Úsalo en 24 horas o piérdelo",
    body: "Lo aprendido tiene fecha de caducidad exprés si no se toca: aplica la técnica hoy, escribe el resumen esta noche, cuéntaselo a alguien mañana. El primer uso convierte la información en experiencia, y la experiencia es el único formato que la memoria respeta de verdad."
  },
  {
    id: "apr-22", topic: "aprendizaje",
    title: "Notas atómicas: una idea, una nota",
    body: "Los apuntes-sábana se escriben y no se vuelven a mirar. Prueba lo contrario: notas diminutas, cada una con UNA idea escrita con tus palabras, enlazada a las notas relacionadas. Con el tiempo se forma una red que piensa contigo: te sugiere conexiones que ninguna de las notas contenía por separado."
  },
  {
    id: "apr-23", topic: "aprendizaje",
    title: "Abandona libros sin culpa",
    body: "Terminar un libro malo por orgullo cuesta lo más caro que tienes: las horas que le robas a uno bueno. Regla práctica: dale 50 páginas; si no aporta, fuera — sin ceremonia. Abandonar rápido no es falta de disciplina lectora: es tener criterio y una lista de espera mejor."
  },
  {
    id: "apr-24", topic: "aprendizaje",
    title: "Metas de proceso, no de resultado",
    body: "«Aprobar el examen» no se puede hacer un martes; «estudiar 45 minutos» sí. Las metas de resultado dependen de factores que no controlas y te tienen en vilo; las de proceso son cien por cien tuyas y se cumplen hoy. Cuida el proceso a diario y el resultado se vuelve estadística."
  },
  {
    id: "apr-25", topic: "aprendizaje",
    title: "La meseta es parte del camino",
    body: "El progreso no es una línea recta: es escalera con descansillos largos. Semanas sintiendo que no avanzas mientras, por debajo, se consolida el siguiente salto. Casi todo el mundo abandona en la meseta creyendo que ya tocó techo. Los que llegan lejos no son más rápidos: son los que no se bajaron ahí."
  },

  // ---------- RELACIONES ----------
  {
    id: "rel-1", topic: "relaciones",
    title: "Escucha para entender, no para responder",
    body: "En la mayoría de conversaciones no escuchamos: esperamos nuestro turno mientras preparamos la réplica. Prueba a resumir lo que la otra persona dijo antes de dar tu opinión. Sentirse entendido abre más puertas que tener razón."
  },
  {
    id: "rel-2", topic: "relaciones",
    title: "Las relaciones se riegan en los momentos pequeños",
    body: "La confianza no se construye en las grandes ocasiones, sino en los detalles repetidos: responder al mensaje, recordar el examen de su hijo, preguntar cómo salió aquello. Los gestos pequeños y frecuentes pesan más que los grandes y esporádicos."
  },
  {
    id: "rel-3", topic: "relaciones",
    title: "Pide ayuda: es un atajo, no una debilidad",
    body: "A la gente le gusta ayudar más de lo que crees, y pedir ayuda bien planteada genera cercanía en lugar de rechazo. Sé concreto: no digas «¿me echas una mano?», di «¿puedes revisar este párrafo y decirme si se entiende?»."
  },
  {
    id: "rel-4", topic: "relaciones",
    title: "Critica la conducta, no a la persona",
    body: "Decir «eres un desastre» ataca la identidad y provoca defensa; decir «este informe llegó dos días tarde y eso nos bloqueó» describe un hecho y abre una solución. Los conflictos se resuelven hablando de comportamientos concretos, no de etiquetas."
  },
  {
    id: "rel-5", topic: "relaciones",
    title: "El elogio concreto vale el doble",
    body: "Un «buen trabajo» genérico se olvida en un minuto. Un «la forma en que resumiste el problema al inicio hizo que todos entendieran la reunión» se recuerda semanas. Cuando algo te guste de alguien, dilo con detalle: es gratis y transforma relaciones."
  },
  {
    id: "rel-6", topic: "relaciones",
    title: "Repara rápido, no perfectamente",
    body: "Tras una discusión, el tiempo no cura: enquista. Una reparación torpe pero temprana («me pasé, lo siento, ¿lo hablamos?») vale más que la disculpa perfecta que nunca llega. En las relaciones que duran no hay menos conflictos: hay más reparaciones."
  },
  {
    id: "rel-7", topic: "relaciones",
    title: "No atribuyas a la mala fe lo que explica un mal día",
    body: "El mensaje seco de tu amiga probablemente no es un ataque: es prisa, estrés o un hijo enfermo. Ante una ofensa aparente, considera primero las explicaciones inocentes — casi siempre son las verdaderas. Te ahorras conflictos fantasma y, de paso, te conviertes en alguien fácil de querer."
  },
  {
    id: "rel-8", topic: "relaciones",
    title: "Cinco positivas por cada negativa",
    body: "En las relaciones que duran, los buenos gestos superan con mucho a los roces — la proporción observada ronda el cinco a uno. No se trata de no discutir jamás, sino de que la cuenta corriente emocional tenga saldo: deposita a diario (interés, gracias, humor, tacto) y las retiradas ocasionales no quebrarán el banco."
  },
  {
    id: "rel-9", topic: "relaciones",
    title: "Sé interesado, no interesante",
    body: "El impulso en una conversación es lucirse: tu anécdota, tu opinión, tu logro. Funciona mejor lo contrario: preguntas abiertas y curiosidad real («¿y cómo fue eso?», «¿qué es lo que más te gustó?»). La gente recuerda poco lo que dijiste y mucho cómo la hiciste sentir — y sentirse escuchado es adictivo."
  },
  {
    id: "rel-10", topic: "relaciones",
    title: "Recordar detalles es un superpoder social",
    body: "El nombre de su perro, el examen de su hija, aquel viaje que le hacía ilusión. Preguntar después por esos detalles dice «te escuché y me importas» con más fuerza que cualquier declaración. Si tu memoria flojea, apúntalo tras la conversación: no es trampa, es interés bien gestionado."
  },
  {
    id: "rel-11", topic: "relaciones",
    title: "Pedir un favor pequeño acerca más que hacerlo",
    body: "Parece al revés, pero funciona: cuando alguien te ayuda, su cerebro concluye «le habré ayudado porque me cae bien». Pedir consejo, una opinión o un favor pequeño no molesta: incluye. La gente no se encariña de quien nunca necesita nada."
  },
  {
    id: "rel-12", topic: "relaciones",
    title: "La vulnerabilidad va primero",
    body: "Todas las conversaciones profundas empezaron porque alguien se arriesgó a decir algo personal sin garantías. Si esperas a que el otro abra la puerta, podéis pasaros años en el vestíbulo del «todo bien, ¿y tú?». Comparte tú primero algo real, proporcionado al momento — la reciprocidad hace el resto."
  },
  {
    id: "rel-13", topic: "relaciones",
    title: "Un no claro es más amable que un sí falso",
    body: "Aceptar por compromiso y llegar quemado, tarde o cancelando a última hora daña más la relación que un «no puedo, gracias por contar conmigo» a tiempo. No necesitas excusas elaboradas: la gente respeta los límites claros mucho más de lo que tememos. Quien se ofende por un no honesto estaba comprando tu sí, no tu compañía."
  },
  {
    id: "rel-14", topic: "relaciones",
    title: "Los límites no son muros: son manuales de uso",
    body: "Decir «no me hables así», «no llego a las cenas de después de las diez» o «los domingos no trabajo» no aleja a la gente que importa: le enseña cómo cuidarte. Las relaciones sin límites no son más íntimas — son más confusas, y el rencor acumulado pasa factura con intereses."
  },
  {
    id: "rel-15", topic: "relaciones",
    title: "La amistad se mantiene con toques, no con maratones",
    body: "No hace falta la gran cena mensual que nunca cuadra: un mensaje al ver algo que le recordó, un audio de dos minutos, una foto de aquella vez. Los vínculos sobreviven por frecuencia, no por intensidad. Diez toques pequeños al año sostienen más que un abrazo enorme cada tres."
  },
  {
    id: "rel-16", topic: "relaciones",
    title: "Valida la emoción antes de arreglar el problema",
    body: "Cuando alguien te cuenta algo doloroso, el instinto es dar soluciones — y suele caer mal, porque antes de consejo la gente necesita compañía: «qué rabia, es normal que estés así». Valida primero, pregunta después («¿quieres ideas o solo desahogarte?»), y solo entonces, si te lo piden, arregla."
  },
  {
    id: "rel-17", topic: "relaciones",
    title: "Convierte el reproche en petición",
    body: "«Nunca me ayudas» produce defensa; «¿puedes encargarte tú de las cenas los martes?» produce cenas los martes. Debajo de casi todo reproche vive una petición que no se atrevió a salir. Hazle el favor de traducirla: pides más y reprochas menos, y de repente la otra persona puede dártelo."
  },
  {
    id: "rel-18", topic: "relaciones",
    title: "Aguanta el silencio",
    body: "Tres segundos de pausa en una conversación nos parecen un abismo y son un regalo: dan espacio a que el otro llegue a lo que de verdad quería decir. Los que llenan cada hueco con ruido nunca escuchan la segunda respuesta — la buena, la que necesitaba un momento para atreverse."
  },
  {
    id: "rel-19", topic: "relaciones",
    title: "Tiempo muerto cuando la discusión hierve",
    body: "Pasado cierto punto de activación — corazón acelerado, voz alta, frases para herir — el cerebro ya no discute: se defiende. Seguir es empeorar. Tened pactada la señal: «necesito veinte minutos, luego seguimos». Retirarse a tiempo no es huir del conflicto: es proteger a la relación de vuestras peores versiones."
  },
  {
    id: "rel-20", topic: "relaciones",
    title: "El aprecio no expresado no existe",
    body: "Piensas que tu pareja ya sabe que la valoras, que tu compañero ya sabe que su trabajo te salvó — pero por dentro no se oye nada. El agradecimiento solo cuenta cuando sale: dicho, escrito, concreto. Regla simple: cada vez que pienses algo bueno de alguien, díselo antes de que se enfríe."
  },
  {
    id: "rel-21", topic: "relaciones",
    title: "Las expectativas no comunicadas son decepciones programadas",
    body: "Esperabas que se acordara, que se ofreciera, que lo notara — y no dijiste nada. Luego, el enfado. Nadie puede cumplir un contrato que no ha visto. Di lo que necesitas antes de necesitarlo con urgencia: pedir no le quita valor al gesto; le da la oportunidad de existir."
  },
  {
    id: "rel-22", topic: "relaciones",
    title: "Nadie puede leerte la mente (y menos quien te quiere)",
    body: "Curiosamente, esperamos más telepatía de quien más nos quiere: «debería saberlo». Pero el amor no da acceso a tu cabeza. Los «deberías saber cómo me siento» son exámenes sorpresa injustos. Dilo fácil: «necesito hablar», «hoy quiero mimos», «esto me dolió». Claridad no es frialdad: es cariño eficiente."
  },
  {
    id: "rel-23", topic: "relaciones",
    title: "Eres la media de tus cinco personas",
    body: "Ambición, hábitos, humor, forma de discutir: todo se contagia por proximidad. Con quién pasas las horas moldea quién eres más que casi cualquier decisión puntual. Haz el inventario honesto: ¿mis cinco personas más frecuentes me acercan a quien quiero ser? Ajustar tu círculo es ajustar tu futuro."
  },
  {
    id: "rel-24", topic: "relaciones",
    title: "El humor repara lo que el orgullo rompe",
    body: "En mitad de la tensión, una broma cómplice, una mueca, la frase interna de la pareja: eso desarma más que diez argumentos. No para esquivar el tema — para recordaros que sois equipo mientras lo resolvéis. Reírse juntos en el conflicto es de las señales más fiables de que la relación va a durar."
  },
];
