# Roadmap

## Decisiones pendientes

1. **Resuelta (8 Oct 2026): workflow nocturno.**
   El usuario acepta las condiciones de uso de MTGGoldfish para la lectura automática de los listados públicos. El workflow ya estaba activo (4 ejecuciones programadas en verde, 7 y 8 Oct), pero ninguna actualizó nada: GitHub las arrancó entre las 03:25 y las 04:38 de Madrid, y `update_meta.py` solo actualizaba de 00:00 a 02:59. Se quitó esa franja: ahora refresca en la primera ejecución de cada día de Madrid. El arreglo funciona cuando se suba (ver la tarea A).

2. **Resuelta (8 Oct 2026): nombre de la sección "Prepare".**
   Ahora se llama "Metagame" (menú lateral y barra de capítulos del móvil). Cubre Sideboard, Matchups e Interaction Windows y no repite el nombre de ninguna sección. El `id` interno sigue siendo `prepare`, así que los enlaces no cambian.

3. **Resuelta (8 Oct 2026): nuevos modos del Goldfish Lab.**
   Entran los dos. (a) "Setup turn · T3 kill": la ruta 2 del Speaker Loop paso a paso; en el turno 2 el disparo de Speaker descarta una carta y busca a Wirewood Symbiote (elección del usuario). (b) "Speaker loop · ready board" sustituye a "Visionary loop (older lists)": parte del tablero final de "Turn-2 Sabertooth" en el play. Ver la tarea E.

4. **Resuelta (8 Oct 2026): recuadro de probabilidades de mulligan.**
   Entra en Mulligans, tras "Once Upon a Time and accepted risk", como contexto y no como regla (rótulo "not a keep rule"). Cifras recalculadas con la lista del 5 Oct, cartas vistas antes del turno 1 (7 en el play, 8 en el draw), sin mulligans ni interacción:
   - Fuente verde para el turno 1 (13 tierras): 83,7 % en el play y 87,7 % en el draw (exacto).
   - Fuente verde + acelerador (6 dorks o 4 GSZ para Arbor): 60,5 % y 68,2 % (exacto).
   - Contando Once Upon a Time (la primera copia, gratis, coge la pieza que falta del top 5): 68,3 % y 75,5 % (exacto; coincide con una simulación de un millón de manos).
   - Ampliación (8 Oct 2026): las cifras ya no están fijas. `js/12.js` las calcula al cargar a partir de la lista de Current 75 (`#deck .deckrow`, solo main), así que siguen a la lista publicada sin tocar el código. Controles "Try other counts" (cartas, fuentes, dorks, GSZ, OUAT) para probar cambios en directo, sin guardar nada, con botón para volver a la lista.

5. **Resuelta (8 Oct 2026): carpeta `.claude/`.** Añadida a `.gitignore`; no se sube ni la sirve Vercel.

6. **Resuelta (8 Oct 2026): push de dbc7cc9 y 1b23972.** Publicado en https://speaker-elves.vercel.app/ (Vercel: Production, success). En vivo: HTML idéntico al local (123 773 bytes), "Route 2 · Setup turn", filas e iconos del Goldfish, 0 errores de consola a 1440 px y a 390 px, y `.claude/` da 404.

7. **Resuelta (8 Oct 2026): archivos internos públicos.**
   Vercel servía `ROADMAP.md`, `CLAUDE.md`, `scripts/` y `.github/` (200; `README.md` ya daba 404). Se añadió `.vercelignore` con esos archivos y `.claude/` (commit 9d52a02). Verificado en vivo: todos dan 404, incluido el propio `.vercelignore`; `/`, `js/`, `css/` y `js/meta-live.js` siguen en 200, y la consola no muestra errores. El "homepage" del repo en GitHub ya apunta a https://speaker-elves.vercel.app/ (confirmado con la API de GitHub).

## No verificado

- **Créditos de Speaker Elves (taka87 y ryo_sll).** La página dice que estos jugadores japoneses redescubrieron el arquetipo en 2026, según runkor. **No verificado:** sus publicaciones en X no se pueden leer sin cuenta y no aparecen en artículos ni resultados publicados. Hace falta una lista o publicación con fecha.

## Plan de chats

Cada tarea cabe en un chat. Para empezar uno: `/rename <nombre>` y "Lee CLAUDE.md y ROADMAP.md; haz la tarea <nombre>". Al terminar, el chat actualiza esta sección (marca la tarea como hecha) y CLAUDE.md si cambia el estado.

**Nota sobre el peso:** `index.html` pesa ~124 KB, no 7,8 MB. El sitio completo pesa ~7,5 MB y casi todo es `assets/` (~6,8 MB): un PNG de 1,1 MB, otro de 330 KB y decenas de JPG de cartas de 130–170 KB, sin `loading="lazy"` ni tamaños ajustados. Por eso el rendimiento se centra en las imágenes.

**Archivos compartidos:** casi todo el contenido vive en `index.html` (cada sección es un `<section class="pane" id="…">`) y el registro de secciones en `GUIDE_GROUPS` (`js/01.js`). Dos tareas que editan secciones distintas de `index.html` no chocan en el contenido, pero no conviene tenerlas abiertas a la vez sobre el mismo árbol de trabajo: termina una antes de empezar la siguiente.

### Tareas

**A. `push-y-workflow`** — HECHA y publicada (8 Oct 2026, commits dbc7cc9 y 1b23972).
- Resultado: decisiones 1 y 5 resueltas. El workflow ya estaba activo, pero sus ejecuciones salían en verde sin actualizar nada por la franja 00:00–02:59. Se quitó la franja; probado en local: la lectura con `--force` da 201 filas y 20 sideboards, y una segunda ejecución el mismo día se salta. Sitio verificado sin errores de consola a 1440 px y a 390 px (iframe de 390 px; sin scroll horizontal).
- Archivos tocados: `scripts/update_meta.py` (sin franja horaria; comentarios), `.github/workflows/meta.yml` (solo el comentario del cron), `.gitignore` (`.claude/`), ROADMAP.md, CLAUDE.md.
- Pendiente: (1) hecho: commit 1b23972 y push, verificados en vivo; (2) el 9 Oct 2026, comprobar que hay un commit "Nightly metagame refresh" del bot en `main` y hacer `git pull` antes de seguir trabajando, porque el bot hace push a `main`; (3) README.md aún dice "00:00 Europe/Madrid" (tarea O).
- Objetivo: subir dbc7cc9 (decisión 6), activar el workflow nocturno (decisión 1), comprobar la primera ejecución y decidir qué se hace con `.claude/` (decisión 5).
- Archivos: `.github/workflows/meta.yml` (solo si falla), `.gitignore`; el workflow genera `js/meta-live.js` y `js/results-archive.js`.
- Dependencias: ninguna. Va primero, porque las demás tareas parten de `main` subido.
- Tamaño: pequeña.
- Decisión previa: aceptar las condiciones de uso de MTGGoldfish para la lectura automática y decidir sobre `.claude/`. El push y la activación en GitHub los haces tú.

**B. `nombre-prepare`** — hecha (8 Oct 2026): "Prepare" pasa a "Metagame".
- Objetivo: decidir el nombre de la parte "Prepare" (decisión 2) y aplicarlo en el menú y la barra de capítulos del móvil.
- Archivos: `js/01.js` (solo la etiqueta en `GUIDE_GROUPS`) y cualquier mención en `index.html`.
- Dependencias: ninguna. Cualquier orden.
- Tamaño: pequeña.
- Decisión previa: el nombre nuevo.

**C. `revision-sideboard`**
- Objetivo: revisar contigo los planes de sideboard convertidos a la lista del 5 Oct (capa de conversión "5 Oct 2026 list") y corregir lo que digas.
- Archivos: `js/01.js` (capa de conversión, DETAILS, SB_COSTS), `js/09.js`, y la tabla de `#map` / `#heur` en `index.html`.
- Dependencias: A recomendable. Va antes de D.
- Tamaño: media.
- Decisión previa: tu revisión carta a carta. Toca datos de cartas, así que cada cambio se te consulta antes.

**D. `matchups-sin-plan`**
- Objetivo: escribir los planes de Boros Energy, Azorius Tempo y Rakdos Reanimator, que ahora muestran "No plan yet".
- Archivos: `js/09.js`, `js/01.js` (DETAILS), y quizá arte nuevo en `assets/matchups/`.
- Dependencias: C, para que los tres planes sigan el mismo criterio.
- Tamaño: media.
- Decisión previa: aprobar los IN / OUT propuestos para cada uno.

**E. `goldfish-modos`** — hecha y cerrada (8 Oct 2026), sin subir: entran los dos modos (decisión 3). El push lo hace el usuario desde el chat principal, junto con el resto.
- Resultado: botones nuevos "Setup turn · T3 kill" (`data-mode="setup"`) y "Speaker loop · ready board" (mantiene `data-mode="loop"`, así que el enlace `#combo-loop` de `js/02.js` sigue funcionando). Setup turn sigue la tabla de `#loop` (6 → 5 → 11 → 16 → 13 → 5 de maná; Craterhoof ve seis criaturas, 33 de daño con arrolladora). Hace falta un segundo Forest en la mano inicial (id `land2`) para la tierra del turno 3. El loop y el remate de Craterhoof son ahora una sola función, `loopAndFinish()`, que comparten "Turn-2 Sabertooth" y el loop desde tablero montado. Comprobado con Node: "Turn-2 Natural Order" y "Turn-2 Sabertooth" dan exactamente los mismos pasos que antes (solo cambia el texto de Cradle: "Speaker in hand is not counted" sale solo cuando Speaker está en la mano). Navegador: 0 errores de consola; a 1440 px y a 390 px, sin scroll horizontal.
- Añadido a petición del usuario: en `#loop`, después de "Which route?", va el bloque "When the last piece is missing". Si falta la última pieza (p. ej. Sabertooth), el turno pasa a ser de setup y la mana y los disparos de Speaker que sobran se usan para una de dos cosas: (a) buscar Collector Ouphe, Marwyn, Allosaurus Shepherd o Vibrance (que busca Boseiju) y canalizar Boseiju, p. ej. sobre una tierra de Tron o Planar Nexus en el turno 2; (b) hacer el máximo daño posible, por ejemplo con el {4}{G}{G} de Shepherd. La elección depende de la mana máxima y del rival. Revisado por el usuario. Vibrance comprobado en Scryfall: si se gasta {G}{G} (también pagando el evoke {R/G}{R/G} con {G}{G}), busca una tierra y la pone en la mano, así que Boseiju queda listo para canalizar. El Goldfish no tiene un modo para esto.
- Decidido: el recuadro "Visionary variant · draw through the deck" de `#combo-loop` y Elvish Visionary en la galería de `js/02.js` se quedan. Visionary es una pieza flex (por ahora casi core; se prueban versiones sin ella) y ya no hace falta para la combo de turno 2.
- Objetivo: decidir y, si procede, implementar los modos nuevos del Goldfish Lab: "Setup turn" y el loop desde un tablero montado, que sustituiría a "Visionary loop" (decisión 3).
- Archivos: `js/04.js`, `css/12.css`, el pane `#goldfish` en `index.html`.
- Dependencias: ninguna. Cualquier orden. Las líneas ya están escritas en `#loop`.
- Tamaño: media. Si entran los dos modos, grande: divídela en `goldfish-setup-turn` y `goldfish-loop-montado`.
- Decisión previa: qué modos entran. Las líneas de combo son lógica de lista, así que se confirman contigo.

**F. `mulligan-probabilidades`** — HECHA (8 Oct 2026, sin subir): el recuadro entra (decisión 4), con cálculo en directo desde Current 75.
- Resultado: `<aside class="odds">` en `#mulligans` sustituye el párrafo "being calculated"; tabla play/draw de tres filas, aviso de que no es regla y desplegable "How these are calculated" con el método y el enlace a Deck Construction. Estilo `.odds` en `css/11.css`. Verificado en local: 0 errores de consola, sin scroll horizontal a 390 px.
- Ampliación: cálculo en directo en `js/12.js` (carga tras `js/11.js`). La base sale de Current 75; los nombres de carta se clasifican con tres listas al principio del archivo (tierras verdes de turno 1, dorks, y GSZ solo si hay Dryad Arbor). Mantenimiento: si una lista nueva trae una carta que no está en esas listas, hay que añadirla allí; si no, no cuenta.
- Objetivo: decidir si el recuadro de probabilidades entra en Mulligans (decisión 4) y, si entra, maquetarlo como contexto y no como regla.
- Archivos: el pane `#mulligans` en `index.html`, `css/11.css`, `js/12.js` (nuevo) y su `<script>` en `index.html`.
- Dependencias: ninguna. Va antes de G, porque las dos tocan Mulligans.
- Tamaño: pequeña.
- Decisión previa: sí o no.

**G. `estudios-mulligan`**
- Objetivo: el punto abierto de las notas, estudios de keep-or-mull con manos de ejemplo y su razonamiento.
- Archivos: el pane `#mulligans` en `index.html`, y quizá `css/11.css`.
- Dependencias: F.
- Tamaño: media.
- Decisión previa: qué manos estudiar (tus ejemplos o los que yo proponga para que los revises).

**H. `windows-propias`** — hecha (8 Oct 2026), sin subir.
- Resultado: `#windows` pasa de cartel a artículo (parte 1 de 2): resumen de ventanas (T1, T2 Cradle y Cub, T2 Natural Order, ruta 1 loop, ruta 2 setup turn), reglas comunes y una tabla por ventana (respuesta del rival · qué consigue · qué puede hacer el piloto) con etiquetas de gravedad `.sev` (Stops the line / Slows it / Small cost). Estilo `.sev` y `.win-table` en `css/11.css`; en móvil las filas se apilan. La marca `wip` del menú se queda (la quita I). Texto de cartas comprobado con la API de Scryfall. Verificado en local: 0 errores de consola, sin scroll horizontal a 390 px.
- Marcado: las valoraciones de gravedad van como "Under test"; la frase sobre las reglas de atajos de torneo (el rival puede nombrar dónde corta el loop) va como "Unverified".
- Reglas que la página afirma por el texto Oracle: si el Cradle con earthbend muere o se exilia (Wasteland incluido) vuelve girado como tierra normal; entonces solo Speaker puede enderezarlo (Symbiote y Quirion apuntan a criaturas) y Cub no añade {G} al girarlo; Marwyn da hexproof también al Cradle animado; sacrificar Shepherd a Natural Order deja el hechizo contrarrestable; Chalice en 1 no para a Shepherd.
- Pregunta abierta para el usuario (lógica de combo, no se ha tocado): Quirion Ranger es Elfo, así que Symbiote podría devolver a Quirion (recast {G}) en vez de Speaker ({2}{G}) en el loop. ¿Por qué la ruta 1 usa Speaker? Hasta aclararlo, la página no dice que perder Speaker corte el maná del loop, solo que corta el final con Craterhoof.
- Objetivo: primera mitad de Interaction Windows: en qué momentos es vulnerable el deck (turnos 1–3, Natural Order, Speaker Loop en sus dos rutas) y qué consigue cada respuesta del rival.
- Archivos: el pane `#windows` en `index.html`, `css/11.css`.
- Dependencias: ninguna estricta. Mejor después de C, para citar el sideboard correcto.
- Tamaño: media.
- Decisión previa: ninguna. Las afirmaciones sin fuente van marcadas "Unverified".

**I. `windows-rival`** — hecha (8 Oct 2026), sin subir.
- Resultado: `#windows` gana la parte 2 ("Part 2 · The opponent’s view", ancla `#windows-opponent`): tabla resumen (interacción · dónde duele más · respaldo del main · ayuda del sideboard), una sección por tipo (counters y Stifle, removal puntual, Wasteland y respuestas a tierras, sweepers, odio a cementerio y a "entrar") con "Where it hurts most" / "The deck’s fallback" / "Mostly wasted", y "The fallback plan" (segunda ruta, Speaker como caja de herramientas, Dinobash, Atraxa, tablero lento). Quitado `wip:true` de windows en `js/01.js`. Estilos `.part-head`, `.win-sum` (en móvil se apila) y listas en `.cards2` en `css/11.css`. Texto Oracle y rulings comprobados con Scryfall. Verificado en local: 0 errores de consola; a 390 px sin scroll horizontal.
- Marcado "Under test": el orden de objetivos y el plan de respaldo. Quién juega cada respuesta sale de los sideboards de MTGGoldfish del 7 Oct 2026 (ventana de 14 días), redondeado ("about half", "most") y fechado en la página.
- Reglas que la página afirma: Cradle animado es criatura legendaria incolora de MV 0 (Karakas puede devolverlo a la mano y entonces no vuelve solo; Fatal Push lo mata); Shepherd no para Mindbreak Trap (exilia, no contrarresta) ni hechizos no verdes; Containment Priest exilia lo que traen Natural Order y GSZ, y Dryad Arbor jugada como tierra; Collector Ouphe no para Grafdigger’s Cage; Surgical tras Wasteland en Cradle quita los demás Cradle; Vibrance evocada con {G}{G} busca una tierra; Marwyn devuelve tierras del cementerio; con Blood Moon, Bayou solo da {R} (Trophy no se puede lanzar) y el channel de Boseiju sí funciona.
- Afecta a C: la tabla dice qué papel cumple cada carta del sideboard, no cuántas entran; si C cambia el sideboard, revisa la columna "Sideboard help" y las líneas "Sideboard:".
- Afecta a J: "The fallback plan" termina con una línea "Worked pivot sequences … are being written for Game Plans"; J la sustituye por el enlace a sus secuencias, y en `#game-plans` puede enlazar a `#windows` en vez de repetir las reglas.
- Nota: H, E, F e I se hicieron en chats paralelos sobre el mismo árbol de trabajo; las ediciones fueron puntuales y se comprobó que ninguna pisó a otra.
- Objetivo: segunda mitad de Interaction Windows: la vista del rival por tipo de interacción (counters, removal, Wasteland, sweepers, graveyard hate) y el plan de respaldo del deck. Al terminar se quita la marca `wip`.
- Archivos: el pane `#windows` en `index.html`, `js/01.js` (quitar `wip:true` de windows).
- Dependencias: H.
- Tamaño: media.
- Decisión previa: ninguna.

**J. `pivotes-interaccion`**
- Objetivo: el punto abierto de las notas, secuencias de pivote cuando el rival interactúa (por ejemplo, tras perder Cradle o un dork).
- Archivos: los panes `#game-plans` y `#first-turns` en `index.html`.
- Dependencias: I (hecha), para enlazar a las ventanas en vez de repetirlas. Ya se puede empezar.
- Tamaño: media.
- Decisión previa: ninguna.

**K. `creditos`**
- Objetivo: escribir Credits y quitar la marca `wip`; intentar verificar a taka87 y ryo_sll (sección "No verificado").
- Archivos: el pane `#credits` en `index.html`, `js/01.js` (quitar `wip:true`), y `#origins` si cambia la verificación.
- Dependencias: ninguna. Cualquier orden.
- Tamaño: pequeña.
- Decisión previa: a quién se agradece y con qué enlaces.

**L. `fuente-testacular`**
- Objetivo: buscar si existe la guía de Elves de Testacular y, si existe, añadirla a Sources y usarla para contrastar Deck Origins.
- Archivos: el pane `#sources` en `index.html`, y quizá `#origins`.
- Dependencias: ninguna. Cualquier orden.
- Tamaño: pequeña.
- Decisión previa: ninguna.

**M. `revision-learn`**
- Objetivo: pasar de primer borrador a texto final Start Here, Deck Origins y Deck Construction: revisar las etiquetas de evidencia, cerrar huecos y unificar el tono.
- Archivos: los panes `#start`, `#origins`, `#construction` (y `#deck`, `#mana` si hace falta) en `index.html`.
- Dependencias: C (Construction cita la lista), K y L (Origins).
- Tamaño: media.
- Decisión previa: ninguna, salvo cambios de lista.

**N. `revision-gameplay`**
- Objetivo: lo mismo para First Turns, Game Plans, Natural Order y Speaker Loop.
- Archivos: los panes `#first-turns`, `#game-plans`, `#natural-order`, `#loop` en `index.html`.
- Dependencias: E (si cambian los modos que enlazan con Loop) y J.
- Tamaño: media. Si hay muchos cambios, sepárala en `revision-gameplay-1` (First Turns y Game Plans) y `revision-gameplay-2` (Natural Order y Speaker Loop).
- Decisión previa: ninguna, salvo líneas de combo.

**O. `readme-docs`**
- Objetivo: actualizar README.md, que aún habla de la "RC51 test list" y de las capas css 02–08, para que coincida con la estructura actual.
- Archivos: `README.md`.
- Dependencias: ninguna. Cualquier orden. Si se hace al final, recoge también los cambios de P y Q.
- Tamaño: pequeña.
- Decisión previa: ninguna.

**P. `rendimiento-imagenes`**
- Objetivo: reducir el peso de `assets/`: redimensionar al tamaño en que se muestran, convertir los JPG/PNG grandes (sobre todo el PNG de 1,1 MB) a WebP o JPG optimizado, y añadir `loading="lazy"`, `width` y `height` a las imágenes que no se ven al cargar.
- Archivos: `assets/` y `assets/matchups/`, las rutas de imagen en `js/01.js`, `js/04.js` y `js/09.js`, y las `<img>` de `index.html`.
- Dependencias: D y E, porque añaden o cambian imágenes.
- Tamaño: media. Si hay que tocar muchas rutas, grande: divídela en `imagenes-convertir` (archivos) e `imagenes-lazy` (marcado).
- Decisión previa: la herramienta de conversión. Sin build step, se haría una sola vez a mano con un script de Python (Pillow) que no se sube, o con una herramienta tuya. También, la calidad/tamaño mínimo aceptable para el arte.

**Q. `rendimiento-carga`**
- Objetivo: mejorar la carga sin build step: `preconnect` para Google Fonts, `defer` en los scripts si el orden lo permite, y medir el resultado antes y después.
- Archivos: `index.html` (solo `<head>` y las etiquetas `<script>`), quizá `js/menu.js` si depende de cargar antes del DOM.
- Dependencias: P.
- Tamaño: pequeña.
- Decisión previa: ninguna. Fusionar los CSS o JS queda fuera, porque chocaría con todo lo demás.

**R. `movil-auditoria`**
- Objetivo: recorrer las 14 secciones a 360 y 390 px de ancho (Chrome headless con capturas) y listar los problemas: desbordes horizontales, tablas, tarjetas de matchup, filas del Goldfish, barra de capítulos, tamaños táctiles.
- Archivos: ninguno de código; la lista se escribe en esta sección.
- Dependencias: el contenido debe estar casi terminado (D, E, I, K, M, N).
- Tamaño: pequeña.
- Decisión previa: ninguna.

**S. `movil-arreglos`**
- Objetivo: corregir lo que encuentre R.
- Archivos: `css/menu.css`, `css/01.css`, `css/11.css`, `css/12.css`, quizá `js/menu.js`.
- Dependencias: R.
- Tamaño: media. Si R encuentra muchos problemas, divídela por secciones.
- Decisión previa: ninguna.

**T. `verificacion-final`**
- Objetivo: revisión completa antes de dar la guía por terminada: cero errores de consola, todos los enlaces vivos, las 14 secciones sin `wip`, `prefers-reduced-motion` y el interruptor de animaciones, móvil, etiquetas "Unverified" coherentes con esta página, y CLAUDE.md y README al día.
- Archivos: solo lectura, salvo correcciones pequeñas que aparezcan.
- Dependencias: todas las demás.
- Tamaño: media.
- Decisión previa: el push final lo haces tú.

### En cualquier orden o en secuencia

- **Cualquier orden** (no dependen de nada ni chocan entre sí): E `goldfish-modos` (hecha), F `mulligan-probabilidades` (hecha), K `creditos`, L `fuente-testacular`, O `readme-docs`.
- **En secuencia:**
  - A → todo lo demás (el push primero).
  - C → D → P → Q (sideboard, luego matchups nuevos, luego imágenes y carga).
  - F → G (Mulligans).
  - H → I → J (ventanas de interacción, luego pivotes).
  - K y L → M (Origins).
  - E y J → N (Gameplay).
  - Contenido terminado → R → S (móvil).
  - Todo → T (verificación final).

### Orden recomendado

1. A `push-y-workflow` — hecha y publicada; solo queda comprobar el commit del bot el 9 Oct
2. C `revision-sideboard`
3. D `matchups-sin-plan`
4. B `nombre-prepare` — hecha
5. F `mulligan-probabilidades` — hecha (sin subir)
6. G `estudios-mulligan`
7. E `goldfish-modos` — hecha (sin subir)
8. H `windows-propias` — hecha (sin subir)
9. I `windows-rival` — hecha (sin subir)
10. J `pivotes-interaccion`
11. K `creditos`
12. L `fuente-testacular`
13. M `revision-learn`
14. N `revision-gameplay`
15. P `rendimiento-imagenes`
16. Q `rendimiento-carga`
17. R `movil-auditoria`
18. S `movil-arreglos`
19. O `readme-docs`
20. T `verificacion-final`
