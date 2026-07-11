# ⚡ Hyperfocus

Una app de **microlearning gratuita y de código abierto**: sustituye el scroll infinito por ideas breves que te hacen crecer. Inspirada en el concepto de apps como Deepstash, pero 100% gratis, sin anuncios, sin cuentas y sin servidor.

## ✨ Funcionalidades

- **Feed de ideas** — tarjetas breves (~1 min de lectura) sobre los temas que elijas.
- **8 temas** — Enfoque, Productividad, Hábitos, Mentalidad, Salud, Creatividad, Dinero y Aprendizaje, con 48 ideas originales en español.
- **Guardadas** — guarda las ideas que te inspiren en tu biblioteca personal.
- **Meta diaria y racha 🔥** — elige cuántas ideas leer al día (3 / 5 / 10) y mantén tu racha.
- **Explorar** — busca ideas por texto o navega por tema.
- **Perfil** — estadísticas de progreso, edición de intereses y meta diaria.
- **Sin backend** — todo tu progreso se guarda en `localStorage` de tu navegador. Privacidad total.
- **Fuente externa de ideas** — al arrancar, la app sincroniza con `ideas.json`: puedes ampliar el catálogo editando ese archivo, sin tocar código. Funciona offline gracias a una caché local.

## 🚀 Cómo usarla

### Opción 1: abrir directamente
Descarga el repo y abre `index.html` en tu navegador. Ya está.

### Opción 2: servidor local
```bash
python3 -m http.server 8080
# o
npx serve .
```
Y visita `http://localhost:8080`.

### Opción 3: publicarla gratis en GitHub Pages
1. Ve a **Settings → Pages** en este repositorio.
2. En *Source*, elige la rama principal y la carpeta `/ (root)`.
3. Guarda: en un minuto tendrás la app en `https://<tu-usuario>.github.io/Hyperfocus/`.

## 🧱 Tecnología

HTML + CSS + JavaScript puro. Cero dependencias, cero build, cero coste.

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de las pantallas (onboarding, feed, explorar, guardadas, perfil) |
| `styles.css` | Estilos (tema oscuro, mobile-first) |
| `data.js` | Los temas y las tarjetas de ideas |
| `app.js` | Lógica: feed, rachas, metas, guardado, navegación |

## ➕ Añadir tus propias ideas (sin tocar código)

La app se sincroniza al arrancar con una **fuente externa**: el archivo [`ideas.json`](ideas.json). Para ampliar el catálogo, edita ese archivo directamente en GitHub (vale desde el móvil) y añade objetos al array `ideas`:

```json
{
  "id": "mi-idea-1",
  "topic": "enfoque",
  "title": "Título corto y potente",
  "body": "El cuerpo de la idea, en unas 3-4 frases."
}
```

También puedes crear temas nuevos en el array `topics`:

```json
{ "id": "cocina", "name": "Cocina", "emoji": "🍳", "color": "#ffb142" }
```

Al guardar el archivo, la app publicada en GitHub Pages mostrará las ideas nuevas en la siguiente visita. Reglas:

- El `id` de cada idea debe ser único (si repites uno existente, la nueva versión **reemplaza** a la antigua — útil para corregir erratas).
- El `topic` debe existir en `TOPICS` (de `data.js`) o en el array `topics` del propio JSON.
- Las ideas con formato inválido se ignoran sin romper la app.

### Cómo funciona la sincronización

1. La app arranca al instante con las 48 ideas incluidas en `data.js`.
2. En segundo plano descarga `ideas.json` y fusiona su contenido.
3. La descarga se guarda en caché (`localStorage`), así el catálogo completo sigue disponible sin conexión.
4. En **Perfil** puedes ver el tamaño del catálogo y el estado de la sincronización.

### Usar otra fuente

Cambia la constante `IDEAS_SOURCE_URL` al principio de `data.js` por cualquier URL que devuelva JSON con el formato `{ "topics": [...], "ideas": [...] }` — por ejemplo un Gist de GitHub:

```js
const IDEAS_SOURCE_URL = "https://gist.githubusercontent.com/<usuario>/<id>/raw/ideas.json";
```

> Nota: la sincronización necesita que la app se sirva por HTTP (GitHub Pages, `python3 -m http.server`…). Si abres `index.html` directamente como archivo, la app funciona igualmente con las ideas incluidas.

## ⌨️ Atajos de teclado

- `→` — siguiente idea
- `S` — guardar / quitar de guardadas
