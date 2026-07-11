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

## ➕ Añadir tus propias ideas

Edita `data.js` y añade objetos al array `IDEAS`:

```js
{
  id: "mi-idea-1",
  topic: "enfoque", // id de un tema existente
  title: "Título corto y potente",
  body: "El cuerpo de la idea, en unas 3-4 frases."
}
```

También puedes crear temas nuevos añadiéndolos al array `TOPICS`.

## ⌨️ Atajos de teclado

- `→` — siguiente idea
- `S` — guardar / quitar de guardadas
