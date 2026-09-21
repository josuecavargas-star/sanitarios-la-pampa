# Convención de Commits

Todos los commits deben seguir el formato **Convencional Commits** en español:

```
<tipo>(<ámbito>): <descripción>

<Cuerpo opcional con más contexto>

<Pie optional con referencias>
```

## Tipos permitidos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad o característica |
| `fix` | Corrección de un bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de formato, espaciado, puntuación (no afecta lógica) |
| `refactor` | Reestructuración de código sin cambiar comportamiento |
| `perf` | Mejora de rendimiento |
| `test` | Agregar o corregir pruebas |
| `chore` | Tareas auxiliares (actualizar dependencias, configs, etc.) |
| `ci` | Cambios en integración continua |
| `build` | Cambios en el sistema de build o dependencias externas |
| `revert` | Revertir un commit previo |

## Ámbitos sugeridos

- `index` – Página principal y secciones
- `css` – Estilos y diseño
- `js` – JavaScript y comportamiento
- `img` – Imágenes y assets
- `docs` – Documentación y guías
- `config` – Configuración del proyecto

## Ejemplos

```
feat(galería): agrega swipe táctil al slider
fix(nav): corrige cierre del menú móvil al hacer click
docs: actualiza guía de avance con estado actual
style(css): normaliza espaciado en tarjetas
refactor(js): extrae lógica del formulario a función separada
perf(img): reduce tamaño de imágenes de la galería
test: agrega validación de campos del formulario
chore: actualiza Convención de Commits
```

## Reglas

- El asunto debe ser **imperativo** y **conciso** (máx. 72 caracteres).
- El cuerpo explica el **qué** y el **porqué** (no el cómo).
- No uses el imperativo en el cuerpo (usa indicativo).
- Las referencias (pie) se escriben como `#123` o `Ver #456`.
- Nunca hagas `push --force` sin autorización.