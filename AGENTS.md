# Guía para Agentes de IA — Sanitarios La Pampa

## Objetivo del Proyecto

Sitio web estático para **Sanitarios La Pampa** (servicios sanitarios, tanques sépticos y destape de cañerías, atención 24/7), desplegado con:

- **GitHub** — repositorio fuente con los archivos
- **Cloudflare Workers** — hosting y publicación automática
- **wrangler.jsonc** — configuración de despliegue

URL esperada: `https://sanitarios-la-pampa.josuecavargas.workers.dev`

## Arquitectura

```
TÚ (editas archivos en public/)
 │
 ▼
GitHub (repositorio) ── cada push a main
 │
 ▼
Cloudflare Workers (npx wrangler deploy)
 │
 ▼
Visitantes ven tu página
```

## Estructura del Repositorio

```
sanitarios-la-pampa/
├── AGENTS.md              ← esta guía
├── wrangler.jsonc         ← config de Cloudflare Workers
├── CONVENCION_COMMITS.md  ← convención de commits del proyecto
├── guias-internas/        ← historial local privado y visor de guías (no se publica)
└── public/                ← archivos del sitio web
    ├── index.html         ← página principal (todas las secciones)
    ├── css/styles.css     ← estilos
    ├── js/main.js         ← scripts
    ├── img/               ← logo y fotos de la galería
```

## Configuración Clave

### wrangler.jsonc

```json
{
  "name": "sanitarios-la-pampa",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./public"
  }
}
```

- `"name"`: nombre del Worker en Cloudflare (también forma parte de la URL)
- `"directory": "./public"`: le dice a Cloudflare que los archivos estáticos están en `public/`

### Cloudflare Dashboard

- Project name: `sanitarios-la-pampa` (debe coincidir con el `name` de `wrangler.jsonc`)
- Build command: vacío (HTML puro, no necesita compilación)
- Deploy command: `npx wrangler deploy`
- Root directory path: `/`

## Secciones del Sitio (`public/index.html`)

1. **Header** — Logo, navegación por anclas (Inicio, Servicios, Galería, Nosotros, Contacto) e iconos SVG de redes sociales (WhatsApp, Facebook, Instagram, Linktree).
2. **Hero** — Logo centrado sobre fondo blanco + tres tarjetas equidistanciadas (Destaqueo, Tanques sépticos, 24/7) + botones de llamada.
3. **Galería** — Slider con fotos de trabajos (`img/_MG_*.jpg`).
4. **Opiniones** — Carrusel compacto con seis capturas en `img/comentarios/`, reproducción automática cada 2 segundos, flechas e indicadores; al pulsar una captura se abre en tamaño original.
5. **Servicios** — Tarjetas: limpieza de tanques sépticos, destapeo de tuberías con sonda eléctrica y aire, servicio 24/7 en Guanacaste.
6. **Nosotros** — Más de 15 años de experiencia, estadísticas (años, 24/7, líneas de contacto).
7. **Contacto** — Tres líneas telefónicas y formulario (`#contactForm`).

## Workflow de Deploy

1. Editas archivos en `public/` (o `wrangler.jsonc` en la raíz)
2. Verificás el cambio en local antes de subirlo (ver "Vista previa local" más abajo)
3. `git add .`
4. `git commit` — mensaje en **lenguaje natural** en español, explicando qué se cambió
5. **NO hacer push sin que el usuario lo pida explícitamente.** El commit se queda en local hasta que él lo autorice.
6. `git push origin main` — solo cuando el usuario lo ordene
7. Cloudflare detecta el push y redeploya en 1-2 minutos

## Vista previa local

Antes de pedir el push, se puede levantar un servidor local desde la carpeta `public/`:

```
python -m http.server 8000 --directory public
```

Usar siempre el puerto `8000` para este proyecto. Abrir `http://localhost:8000` en el navegador. Ejecuta el comando desde la raíz del repositorio; Ctrl+C detiene el servidor.

## Notas Importantes

- **Nunca hacer push sin orden explícita del usuario**: aunque ya se haya autorizado un push anterior, cada push nuevo requiere una instrucción nueva suya. El push dispara el deploy en Cloudflare y él quiere revisar los cambios en local primero.

- **No usar Cloudflare Pages**: este proyecto usa **Cloudflare Workers** con `wrangler.jsonc`. Los archivos del sitio van en `public/` y el `wrangler.jsonc` en la raíz.
- **La carpeta `public/` es invisible en la URL**: en GitHub el repo tiene `public/` como subcarpeta, pero Cloudflare Workers sirve su contenido como raíz.
- **Rutas relativas**: `index.html` referencia `css/styles.css`, `js/main.js` e `img/...` con rutas relativas, por lo que no hay que tocarlas al mover archivos dentro de `public/`.
- **No hacer push sin permiso**: después de cada commit, **preguntar al usuario antes de ejecutar `git push`**. El push activa un deploy automático en Cloudflare.
- **Commit después de cada cambio**: registrar cada cambio antes de push.
- **Mensaje de commit en lenguaje natural**: frases descriptivas en español (ej. "Agregué las instrucciones de deploy al documento de guía") en lugar de formatos técnicos.
- **El push debe ser a `main`**: es la rama conectada a Cloudflare.
- **El formulario de contacto no envía nada todavía**: `js/main.js:34` solo valida y muestra un mensaje de éxito en pantalla (no hay backend). Si se quiere recibir mensajes reales, hay que conectarlo a un servicio (Google Apps Script como en Salmo 27, Formspree, o un Worker).

## Migración desde Netlify (2026-09-30)

El proyecto vivía en `C:\Users\josue\Desktop\netlify\sanitarios-la-pampa` como sitio estático de Netlify. Para migrarlo a Workers:

1. Se creó la carpeta `public/` y se movieron dentro `index.html`, `css/`, `js/`, `img/` y `guia/` (con `git mv` para conservar el historial).
2. Se creó `wrangler.jsonc` en la raíz apuntando a `./public`.
3. `CONVENCION_COMMITS.md` quedó en la raíz (no se publica).
4. Se creó este `AGENTS.md`.

## Datos de Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp principal** | +506 8344-4802 (`https://wa.me/50683444802`) |
| **Teléfono 2** | +506 8891-2551 |
| **Teléfono 3** | +506 8629-0567 |
| **Horario** | 24/7 |
| **Facebook** | https://www.facebook.com/sanitarioslapampa |
| **Instagram** | https://www.instagram.com/sanitarios.la.pampa |
| **Linktree** | https://linktr.ee/sanitarioslapampa |