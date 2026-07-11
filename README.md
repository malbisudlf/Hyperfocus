# ⚡ Hyperfocus

Una app de **microlearning gratuita y de código abierto**: sustituye el scroll infinito por ideas breves que te hacen crecer. Inspirada en el concepto de apps como Deepstash, pero 100% gratis, sin anuncios, sin cuentas y sin servidor propio.

## ✨ Funcionalidades

- **Contenido casi ilimitado, sin mantener nada** — todas las tarjetas llegan en vivo desde la API pública de Wikipedia en español (gratuita, sin claves): cada tema busca artículos relacionados y el feed nunca se acaba.
- **10 temas** — Enfoque, Productividad, Hábitos, Mentalidad, Salud, Creatividad, Dinero, Aprendizaje, Relaciones y Descubre 🌍 (artículos al azar + efemérides del día).
- **Explorar en vivo** — el buscador consulta Wikipedia directamente: escribe cualquier cosa o filtra por tema.
- **Guardadas** — las tarjetas que guardes se almacenan completas en tu navegador y no se pierden.
- **Meta diaria y racha 🔥** — elige cuántas ideas leer al día (3 / 5 / 10) y mantén tu racha.
- **Sin repetidos** — las tarjetas ya leídas no vuelven a aparecer.
- **Sin backend propio** — tu progreso vive en `localStorage`. Privacidad total.

## 🚀 Cómo usarla

### Publicarla gratis en GitHub Pages (recomendado)
1. Ve a **Settings → Pages** en este repositorio.
2. En *Source*, elige la rama `main` y la carpeta `/ (root)`.
3. En un minuto tendrás la app en `https://<tu-usuario>.github.io/Hyperfocus/`.

### Servidor local
```bash
python3 -m http.server 8080
# o
npx serve .
```
Y visita `http://localhost:8080`.

> El contenido llega de la API de Wikipedia, así que la app necesita conexión. Sin red, muestra un estado de reintento y tus guardadas siguen disponibles.

## 🧱 Tecnología

HTML + CSS + JavaScript puro. Cero dependencias, cero build, cero coste.

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de las pantallas (onboarding, feed, explorar, guardadas, perfil) |
| `styles.css` | Estilos (tema oscuro, mobile-first) |
| `data.js` | La lista de temas (colores, emojis) |
| `app.js` | Lógica: fuente dinámica de Wikipedia, feed, rachas, metas, guardado, navegación |

## 🌐 Cómo funciona la fuente externa

Todo el contenido se obtiene en el momento desde la API REST y la API de acción de Wikimedia:

- **Artículos por tema** — cada sección busca artículos con sus términos semilla (`TOPIC_QUERIES` en `app.js`), eligiendo término y desplazamiento al azar en cada tanda para que apenas se repita nada.
- **Artículos al azar** — `es.wikipedia.org/api/rest_v1/page/random/summary` (tema Descubre).
- **Efemérides de hoy** — `es.wikipedia.org/api/rest_v1/feed/onthisday/events/{mes}/{día}` (tema Descubre).
- **Buscador de Explorar** — búsqueda libre con `generator=search`, acotada al tema seleccionado si hay uno.

No requiere clave ni registro. El texto de Wikipedia es CC BY-SA y cada tarjeta enlaza a su artículo original.

### Personalizar

- **Afinar qué artículos salen por tema**: edita los términos de búsqueda en `TOPIC_QUERIES` (en `app.js`).
- **Añadir temas nuevos**: añade el tema en `TOPICS` (`data.js`) y sus términos en `TOPIC_QUERIES`.
- **Tarjetas fijas propias** (opcional): el array `IDEAS` de `data.js` acepta tarjetas `{ id, topic, title, body }` que se mezclan con el contenido dinámico.

## ⌨️ Atajos de teclado

- `→` — siguiente idea
- `S` — guardar / quitar de guardadas
