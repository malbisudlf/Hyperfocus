# ⚡ Hyperfocus

Una app de **microlearning gratuita y de código abierto**: sustituye el scroll infinito por ideas breves que te hacen crecer. Inspirada en el concepto de apps como Deepstash, pero 100% gratis, sin anuncios, sin cuentas y sin servidor propio.

## ✨ Funcionalidades

- **Biblioteca curada de 222 ideas originales** — conceptos de productividad, hábitos, psicología y finanzas destilados en tarjetas breves y accionables (~1 min de lectura), escritas en español.
- **9 temas** — Enfoque, Productividad, Hábitos, Mentalidad, Salud, Creatividad, Dinero, Aprendizaje y Relaciones.
- **Descubre 🌍** — tema opcional con contenido en vivo desde la API pública de Wikipedia: artículos al azar y efemérides del día, con filtros de calidad y enlace a la fuente.
- **Explorar** — búsqueda instantánea en la biblioteca; la pestaña Descubre busca en vivo en Wikipedia.
- **Guardadas** — tu biblioteca personal; las tarjetas dinámicas guardadas se conservan completas.
- **Meta diaria y racha 🔥** — elige cuántas ideas leer al día (3 / 5 / 10) y mantén tu racha.
- **Sin repetidos** — las ideas leídas no vuelven a aparecer hasta agotar la biblioteca.
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

La biblioteca funciona sin conexión una vez cargada la app; solo el tema «Descubre» necesita red.

## 🧱 Tecnología

HTML + CSS + JavaScript puro. Cero dependencias, cero build, cero coste.

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de las pantallas (onboarding, feed, explorar, guardadas, perfil) |
| `styles.css` | Estilos (tema oscuro, mobile-first) |
| `data.js` | Los temas y la biblioteca de 222 ideas |
| `app.js` | Lógica: feed, rachas, metas, guardado, navegación y el tema Descubre |

## ➕ Ampliar la biblioteca

Añade objetos al array `IDEAS` de `data.js`:

```js
{
  id: "mi-idea-1",
  topic: "enfoque", // id de un tema existente
  title: "Título corto y potente",
  body: "El cuerpo de la idea, en unas 3-4 frases accionables."
}
```

También puedes crear temas nuevos añadiéndolos al array `TOPICS`.

## 🌍 El tema «Descubre»

Si lo activas en tus intereses, el feed intercala tarjetas en vivo desde la API REST de Wikimedia (gratuita, sin claves): artículos al azar y efemérides del día. Un filtro de calidad descarta biografías, organismos, lugares y obras para quedarse con conceptos. El texto de Wikipedia es CC BY-SA y cada tarjeta enlaza a su artículo original.

## ⌨️ Atajos de teclado

- `→` — siguiente idea
- `S` — guardar / quitar de guardadas
