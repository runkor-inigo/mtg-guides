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

8. **Resuelta (8 Oct 2026): lectura de MyMTGO.** El usuario dio el visto bueno al push (commit 83c5f2c) sabiendo que la página `/terms` no se pudo leer de forma automática. El script nocturno lee ahora las páginas públicas de arquetipo de MyMTGO (`/metagame/legacy/<arquetipo>?vs=elves`, unas 17 lecturas con 2 s de pausa). `robots.txt` solo prohíbe `/api/`, `/admin/` y `/daily/next`, y no hay comprobación anti-bots, pero la página `/terms` se carga con JavaScript y no se ha podido leer.

9. **Hecho en parte (8 Oct 2026): nombres de las partes del menú.** Publicados en el commit 83c5f2c: Learn → "Deck Foundations" (icono `cards`), Gameplay → "Game Theory" (`tree`), Metagame → "Gameplay" (`swords`), en `js/01.js` (`GUIDE_GROUPS`) y `js/menu.js` (`ICONS`). Sustituye al nombre "Metagame" del punto 2. **Pendiente, cuando no haya otros chats abiertos** (tocan `js/01.js` e `index.html`, que comparten todos):
   - Sección de inicio: hoy se entra siempre en Sideboard (`active:'sideboard'` en `js/01.js` y `class="pane active"` en `#map` de `index.html`), un resto de cuando la guía era solo de sideboard. Pasarla a Start Here (`'start'`, y la clase `active` a `#start`). Opcional: leer y escribir el `#hash` de la URL para enlazar a una sección y volver a ella al recargar.
   - Ids internos: alinearlos con los nombres nuevos (hoy "Game Theory" es `gameplay` y "Gameplay" es `prepare`). Revisar antes cualquier uso de esos ids en `js/` y `css/`.

## No verificado

- **Créditos de Speaker Elves (taka87 y ryo_sll).** Cuentas de X confirmadas por el usuario (8 Oct 2026): https://x.com/taka87z3 y https://x.com/ryo_sll; la página enlaza a las dos. Coincidencia sin comprobar: el piloto de MTGO Halle87z3 (3.º en la Legacy Challenge 32 del 29 Ago 2026, en el archivo de resultados) comparte el sufijo "87z3". La página dice que estos jugadores japoneses redescubrieron el arquetipo en 2026, según runkor. **No verificado:** sus publicaciones en X no se pueden leer sin cuenta y no aparecen en artículos ni resultados publicados. Hace falta una lista o publicación con fecha.
  - Pista (8 Oct 2026, sin confirmar): según el resumen de un buscador, Shimoizumi Ryoichi jugó Elves con 4 Formidable Speaker en la Hareruya Legacy Cup Deluxe del 5 Abr 2026 (antes del primer 5-0 de MTGO, 30 Jun). Falta: (1) ver la lista en la fuente primaria (Hareruya o mtgdecks; las dos bloquean la lectura automática, así que hay que abrirlas a mano); (2) confirmar la fecha (otros resultados citan 20 Jul y 15 Ago 2026); (3) comprobar que es Speaker Elves (Symbiote, Sabertooth, Cradle) y no otra lista con Speaker; (4) algo que una a ese jugador con ryo_sll. Nada de esto está en la página.

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

**B. `nombre-prepare`** — hecha y publicada (8 Oct 2026, commit 55ac39b): "Prepare" pasa a "Metagame".
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
- Avance (8 Oct 2026, chat de Matchups): Boros Energy hecho. IN 3 Snuff Out y 1 Primaris Eliminator; OUT 3 Allosaurus Shepherd y 1 Collector Ouphe. Atraxa se queda (ventaja de cartas aunque haya Karakas) y Assassin’s Trophy no entra (con Goblin Bombardment en mesa ya suele estar decidido). Si hace falta un hueco más, sale un Formidable Speaker. Matchups muestra ahora el top 10, así que Azorius Tempo y Rakdos Reanimator ya no salen; sus planes quedan como opcionales.
- Objetivo: escribir los planes de Boros Energy, Azorius Tempo y Rakdos Reanimator, que ahora muestran "No plan yet".
- Archivos: `js/09.js`, `js/01.js` (DETAILS), y quizá arte nuevo en `assets/matchups/`.
- Dependencias: C, para que los tres planes sigan el mismo criterio.
- Tamaño: media.
- Decisión previa: aprobar los IN / OUT propuestos para cada uno.

**E. `goldfish-modos`** — hecha y publicada (8 Oct 2026, commit 55ac39b): entran los dos modos (decisión 3).
- Resultado: botones nuevos "Setup turn · T3 kill" (`data-mode="setup"`) y "Speaker loop · ready board" (mantiene `data-mode="loop"`, así que el enlace `#combo-loop` de `js/02.js` sigue funcionando). Setup turn sigue la tabla de `#loop` (6 → 5 → 11 → 16 → 13 → 5 de maná; Craterhoof ve seis criaturas, 33 de daño con arrolladora). Hace falta un segundo Forest en la mano inicial (id `land2`) para la tierra del turno 3. El loop y el remate de Craterhoof son ahora una sola función, `loopAndFinish()`, que comparten "Turn-2 Sabertooth" y el loop desde tablero montado. Comprobado con Node: "Turn-2 Natural Order" y "Turn-2 Sabertooth" dan exactamente los mismos pasos que antes (solo cambia el texto de Cradle: "Speaker in hand is not counted" sale solo cuando Speaker está en la mano). Navegador: 0 errores de consola; a 1440 px y a 390 px, sin scroll horizontal.
- Añadido a petición del usuario: en `#loop`, después de "Which route?", va el bloque "When the last piece is missing". Si falta la última pieza (p. ej. Sabertooth), el turno pasa a ser de setup y la mana y los disparos de Speaker que sobran se usan para una de dos cosas: (a) buscar Collector Ouphe, Marwyn, Allosaurus Shepherd o Vibrance (que busca Boseiju) y canalizar Boseiju, p. ej. sobre una tierra de Tron o Planar Nexus en el turno 2; (b) hacer el máximo daño posible, por ejemplo con el {4}{G}{G} de Shepherd. La elección depende de la mana máxima y del rival. Revisado por el usuario. Vibrance comprobado en Scryfall: si se gasta {G}{G} (también pagando el evoke {R/G}{R/G} con {G}{G}), busca una tierra y la pone en la mano, así que Boseiju queda listo para canalizar. El Goldfish no tiene un modo para esto.
- Decidido: el recuadro "Visionary variant · draw through the deck" de `#combo-loop` y Elvish Visionary en la galería de `js/02.js` se quedan. Visionary es una pieza flex (por ahora casi core; se prueban versiones sin ella) y ya no hace falta para la combo de turno 2.
- Objetivo: decidir y, si procede, implementar los modos nuevos del Goldfish Lab: "Setup turn" y el loop desde un tablero montado, que sustituiría a "Visionary loop" (decisión 3).
- Archivos: `js/04.js`, `css/12.css`, el pane `#goldfish` en `index.html`.
- Dependencias: ninguna. Cualquier orden. Las líneas ya están escritas en `#loop`.
- Tamaño: media. Si entran los dos modos, grande: divídela en `goldfish-setup-turn` y `goldfish-loop-montado`.
- Decisión previa: qué modos entran. Las líneas de combo son lógica de lista, así que se confirman contigo.

**F. `mulligan-probabilidades`** — HECHA y publicada (8 Oct 2026, commit 55ac39b): el recuadro entra (decisión 4), con cálculo en directo desde Current 75.
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

**H. `windows-propias`** — hecha y publicada (8 Oct 2026, commit 55ac39b).
- Resultado: `#windows` pasa de cartel a artículo (parte 1 de 2): resumen de ventanas (T1, T2 Cradle y Cub, T2 Natural Order, ruta 1 loop, ruta 2 setup turn), reglas comunes y una tabla por ventana (respuesta del rival · qué consigue · qué puede hacer el piloto) con etiquetas de gravedad `.sev` (Stops the line / Slows it / Small cost). Estilo `.sev` y `.win-table` en `css/11.css`; en móvil las filas se apilan. La marca `wip` del menú se queda (la quita I). Texto de cartas comprobado con la API de Scryfall. Verificado en local: 0 errores de consola, sin scroll horizontal a 390 px.
- Marcado: las valoraciones de gravedad van como "Under test"; la frase sobre las reglas de atajos de torneo (el rival puede nombrar dónde corta el loop) va como "Unverified".
- Reglas que la página afirma por el texto Oracle: si el Cradle con earthbend muere o se exilia (Wasteland incluido) vuelve girado como tierra normal; entonces solo Speaker puede enderezarlo (Symbiote y Quirion apuntan a criaturas) y Cub no añade {G} al girarlo; Marwyn da hexproof también al Cradle animado; sacrificar Shepherd a Natural Order deja el hechizo contrarrestable; Chalice en 1 no para a Shepherd.
- Pregunta de Quirion: resuelta por el usuario el 8 Oct 2026 (ver la tarea N).
- Objetivo: primera mitad de Interaction Windows: en qué momentos es vulnerable el deck (turnos 1–3, Natural Order, Speaker Loop en sus dos rutas) y qué consigue cada respuesta del rival.
- Archivos: el pane `#windows` en `index.html`, `css/11.css`.
- Dependencias: ninguna estricta. Mejor después de C, para citar el sideboard correcto.
- Tamaño: media.
- Decisión previa: ninguna. Las afirmaciones sin fuente van marcadas "Unverified".

**I. `windows-rival`** — hecha y publicada (8 Oct 2026, commit 55ac39b).
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

**K. `creditos`** — hecha y publicada (8 Oct 2026, commit 83c5f2c).
- Resultado: el pane `#credits` pasa de cartel a artículo: quién encontró el deck (taka87 y ryo_sll con "Unverified"; pilotos de MTGO del archivo de resultados, con fecha 7 Oct 2026 y enlace a Current 75), el linaje de Cradle Control (los pilotos ya citados en Deck Origins), autores y fuentes (mismos enlaces que Origins), datos y herramientas (MTGGoldfish, mtgo.com, Scryfall, GSAP) y el aviso de la Fan Content Policy de Wizards. Quitado `wip:true` de credits en `js/01.js`. Verificación de taka87 y ryo_sll: sin resultado (ver "No verificado"). Comprobado sobre una copia limpia de HEAD con solo este cambio: 0 errores de consola; a 1280 px y a 390 px sin scroll horizontal.
- Testing y debate: se agradece al canal #elves del Discord de runkor (sin enlace: no hay invitación en el proyecto).
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

**N. `revision-gameplay`** — parte 2 (`revision-gameplay-2`: Natural Order y Speaker Loop) HECHA y publicada (8 Oct 2026, commit 83c5f2c). Parte 1 (`revision-gameplay-1`: First Turns y Game Plans) espera a J.
- Resultado: texto Oracle de las 17 cartas clave comprobado con la API de Scryfall. Corregido: (1) Dinobash + Craterhoof funciona en cualquier orden (la base 5/5 se aplica antes del +X/+X), no solo "antes de que resuelva el trigger"; (2) Collector Ouphe añadido a los no-Elfos; (3) GSZ "for zero" pasa a "X = 0 cuesta {G}"; (4) Natural Order: el Goldfish solo muestra la primera de las tres rutas, no las tres; "Hardcast Craterhoof" pasa a "Craterhoof is not always lethal", con el ejemplo del Goldfish (8 de daño); (5) ruta 2: girar el dork para maná lo saca del ataque; (6) Boseiju cuesta solo {G} con Marwyn (legendaria) y el rival puede buscar una tierra básica; (7) quitada la etiqueta "being re-checked" de Speaker Loop. Natural Order y Speaker Loop pasan de "First draft" a "Reviewed". Verificado en local: 0 errores de consola.
- Pendiente (`revision-gameplay-1`, tras J): First Turns y Game Plans siguen como "First draft". Ya corregido en ellas: Dinobash (orden con Craterhoof, Collector Ouphe) y GSZ X = 0. Falta revisar los pivotes que escriba J y quitar el "First draft".
- Pregunta de Quirion, resuelta por el usuario (8 Oct 2026): Symbiote devuelve a Speaker para tener otro disparo (descartar una carta mala y buscar la siguiente pieza, sobre todo Symbiotes), y así cada vuelta hay una criatura más y Cradle da más maná. Un Quirion sin usar se activa siempre sobre Cradle, para girarla con el máximo de criaturas; la Forest o Bayou devuelta (no Boseiju) pasa a ser descarte para Speaker. Devolver un Elfo de un maná (dork o Quirion, recast {G}) en vez de Speaker solo cuando ya se tiene la forma de matar (Craterhoof en mano, o GSZ) y solo falta maná: +4 por ciclo en vez de +2. Si aún faltan piezas, se devuelve Speaker (Speaker, Symbiote, bounce… hasta Sabertooth, loop, kill). Con loops ilimitados el resultado es el mismo, pero con el Elfo barato se llega antes al maná crítico. Añadido en `#loop` ("Why Symbiote returns Speaker", "An unused Quirion Ranger" y "Build the board, or just make mana?"). Sin Cub, Cradle no es criatura y Quirion endereza el dork (nota añadida). El Goldfish no cambia: muestra una línea general por ruta, y una nota en `#loop` dice que un Quirion extra (otro untap y otra carta para descartar) facilita el proceso. Criterio del usuario: el Goldfish y la guía muestran las líneas generales con sus modificadores, no todas las líneas posibles.
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

**P. `rendimiento-imagenes`** — hecha y publicada (8 Oct 2026, commit 83c5f2c); el borrado de archivos queda en U.
- Objetivo: reducir el peso de `assets/`: redimensionar al tamaño en que se muestran, convertir los JPG/PNG grandes (sobre todo el PNG de 1,1 MB) a WebP o JPG optimizado, y añadir `loading="lazy"`, `width` y `height` a las imágenes que no se ven al cargar.
- Archivos: `assets/` y `assets/matchups/`, las rutas de imagen en `js/01.js`, `js/04.js` y `js/09.js`, y las `<img>` de `index.html`.
- Dependencias: D y E, porque añaden o cambian imágenes.
- Tamaño: media. Si hay que tocar muchas rutas, grande: divídela en `imagenes-convertir` (archivos) e `imagenes-lazy` (marcado).
- Decisión previa: la herramienta de conversión. Sin build step, se haría una sola vez a mano con un script de Python (Pillow) que no se sube, o con una herramienta tuya. También, la calidad/tamaño mínimo aceptable para el arte.
- **Hecha (8 Oct 2026, publicada en 83c5f2c).** Pillow 12.2, script de un solo uso fuera del repo. Las 56 imágenes raster pasan a WebP (`method=6`): cartas a 488×680 con calidad 82 (el diálogo de zoom las muestra grandes), arte de matchups a su tamaño con calidad 78, dorso PNG 672×938 → 244×340 (1077 KB → 12 KB, conserva la transparencia) y logo 720×720 → 174×174 (320 KB → 4 KB). Total raster 6,5 MB → 3,8 MB. Rutas cambiadas en `js/02.js`, `js/04.js`, `js/09.js` y el logo de `index.html` (con `width`, `height`, `loading="lazy"`). Las cartas de `combo37` (js/02.js) ganan `width`/`height`/`decoding`; las de `deck-art47` ya reservan hueco con `aspect-ratio` y las de matchups ya eran `lazy`. Diferencia visual nula a ojo.
- **Arte a primera impresión (8 Oct 2026, mismo chat, publicado en 83c5f2c).** Con la regla nueva de arte (CLAUDE.md, "Card art"), se auditaron contra Scryfall las 39 cartas de `COMBO_CARD_ART` (js/02.js) y los 16 artes de matchup (js/09.js). Ninguna era borderless, pero 19 cartas y 8 matchups no salían de la primera impresión. Cambian a: Temur Sabertooth FRF, Craterhoof AVR, Llanowar Elves LEA (su enlace a 7ED ★ estaba roto), Bayou LEA, Forest LEA 294, Misty Rainforest y Verdant Catacombs ZEN, Elvish Mystic M14, Allosaurus Shepherd JMP, Thoughtseize LRW, Green Sun's Zenith MBS, Leyline of the Void GPT, Endurance MH2, Force of Vigor MH1, Grist MH2, Gaddock Teeg LRW y Assassin's Trophy GRN; matchups ub-moon, ub-legends, doomsday, ur-cutter, dnt, blue-tron, lands y jeskai-tempo. Marwyn y Chomping Changeling ya eran primera impresión, pero se enlazaban a la API de Scryfall: ahora están en local. Los archivos nuevos se llaman por la carta (`assets/<carta>.webp`); `src`, `url`, `artist` y `edition` actualizados.
- **Pendiente:** el borrado de archivos sin uso pasa a la tarea U `repo-cleanup`. Con D: si añade arte nuevo, sigue la regla de arte de CLAUDE.md y va en `.webp` (`js/09.js` ya pide `assets/matchups/<clave>.webp`).

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
- **Hecha (8 Oct 2026), adelantada a D, M y N.** Recorrido automático de las 14 secciones a 360 y 390 px (desbordes, botones de menos de 32 px, texto de menos de 11 px) más capturas. Lo que encontró:
  1. Deck Construction: las tablas "Raw opener / IMS comparison" y "T2/T3 engine model" (pane `#mana`) no tenían contenedor con scroll y estiraban toda la página a 468 px.
  2. Deck Construction: la tabla "Packages" queda en cuatro columnas muy estrechas (celdas de 10 líneas).
  3. Goldfish: el aviso "Your battlefield is empty" pisaba la etiqueta "Lands" (también en escritorio).
  4. Matchups a 360 px: las luces se cortaban ("Wastel…", "Counte…", "Sweep…").
  5. Cabecera: el título "Legacy Elves — BG Sideboard Guide" ocupaba dos líneas con la insignia colgando; además no coincidía con la tarjeta "Speaker Elves" de la portada.
  6. Áreas táctiles pequeñas: enlaces `.goto` (25–28 px), desplegables `summary` (14–24 px), sliders de Mulligans (24 px) y botones Previous / Next step / Show all de las referencias del Goldfish (30 px).
  7. Sin problema: barra de capítulos y su menú, Sideboard, Interaction Windows, Speaker Loop, Mulligans, Sources, portada y pie.
  8. Sin tocar (diseño): etiquetas en mayúsculas de 10 px y el "READ-ONLY GUIDES" de 9 px del pie.
- Si D, M o N añaden tablas o tarjetas nuevas, repite el recorrido antes de T.

**S. `movil-arreglos`**
- Objetivo: corregir lo que encuentre R.
- Archivos: `css/menu.css`, `css/01.css`, `css/11.css`, `css/12.css`, quizá `js/menu.js`.
- Dependencias: R.
- Tamaño: media. Si R encuentra muchos problemas, divídela por secciones.
- Decisión previa: ninguna.
- **Hecha (8 Oct 2026).** Todo en un bloque "Phones (tasks R and S)" al final de `css/12.css`, más ediciones puntuales en `index.html`:
  1. Las tres tablas de `#mana` van dentro de `.table-scroll` (scroll propio) y la columna Config no se parte.
  2. "Packages" (`.pkg-table`) se apila en móvil: una tarjeta por paquete con "Range ·" y "5 Oct list ·".
  3. `#gf-empty` se coloca en la fila de criaturas en todos los anchos.
  4. Luces del matchup a ≤400 px: la respuesta va bajo el nombre.
  5. Título (decisión del usuario): h1 "Speaker Elves" con la insignia en la misma línea y encima "Legacy · BG Elves guide". También `<title>` y `og:title` ("Speaker Elves · Legacy BG Elves guide"; antes decían "RC51" y "BGw").
  6. Áreas táctiles más grandes sin mover el diseño (pseudo-elemento en `.goto` y `summary`), sliders a 36 px, botones de referencias a 40 px.
- Verificado en local: 0 errores de consola; ninguna sección desborda a 360 ni a 390 px; escritorio sin cambios salvo el título.

**T. `verificacion-final`**
- Objetivo: revisión completa antes de dar la guía por terminada: cero errores de consola, todos los enlaces vivos, las 14 secciones sin `wip`, `prefers-reduced-motion` y el interruptor de animaciones, móvil, etiquetas "Unverified" coherentes con esta página, y CLAUDE.md y README al día.
- Archivos: solo lectura, salvo correcciones pequeñas que aparezcan.
- Dependencias: todas las demás.
- Tamaño: media.
- Decisión previa: el push final lo haces tú.

**U. `repo-cleanup`**
- Objetivo: borrar lo que ya no usa nada, para que Vercel deje de publicarlo y el repo quede limpio. El borrado lo ejecuta o lo aprueba el usuario (Claude no borra por su cuenta).
- Qué borrar (lista del 8 Oct 2026; vuelve a comprobarla antes, porque otros chats pueden cambiar rutas):
  1. Los 56 originales `.jpg`/`.png` de `assets/` y `assets/matchups/`, sustituidos por `.webp` en la tarea P (~6,5 MB). Con git: `git rm assets/*.jpg assets/*.png assets/matchups/*.jpg`.
  2. 16 `.webp` de cartas sustituidas por la primera impresión (P): `0277e61efd39`, `0564f10b44e8`, `0a3af96e0e96`, `12eb99d7975d`, `142ea736fb2f`, `2cbc225e4a65`, `35324aed5b6c`, `455b595478f4`, `8236cd1731fc`, `8f1bf3fff348`, `92a2c362d3dd`, `c02d208b40d9`, `c1b0dcd4609f`, `c6425e1e7f19`, `dc517e6bff93`, `f71a42d5b74e` (todos `assets/<nombre>.webp`, sin seguimiento en git: basta con borrarlos).
  3. Las páginas temporales de prueba sin seguimiento en la raíz: `_audit.html`, `_probe.html`, `_shot.html`. Ya borradas el 8 Oct 2026 por el chat de R y S; comprueba que no quede ninguna otra `_*.html`.
  4. Cualquier otro archivo de `assets/` que no aparezca en `index.html`, `js/` ni `css/` (las claves de `assets/matchups/` se citan en el `ART` de js/09.js, no por nombre de archivo).
- Comprobación: cada archivo que se borra no aparece en `index.html`, `js/*.js` ni `css/*.css`; después, el sitio en local da 0 errores de consola y ninguna imagen rota (404).
- Archivos: `assets/`, `assets/matchups/`, la raíz del repo.
- Dependencias: P (hecha). Mejor después de D, por si D cambia arte.
- Tamaño: pequeña.
- Decisión previa: ninguna; solo tu visto bueno para borrar.

### Estado (8 Oct 2026, tras el commit 83c5f2c)

- **Hechas y publicadas:** A, B, E, F, H, I (commit 55ac39b); K, N parte 2, P, R y S (commit 83c5f2c); y las decisiones 1–8. A solo espera el commit del bot el 9 Oct.
- **Matchups (chat de Matchups, publicado en 83c5f2c):** top 10 de MTGGoldfish en filas desplegables; tabla "Their sideboard" con MTGGoldfish y MyMTGO; semáforos que leen también la lista de referencia de MyMTGO; plan de Boros Energy (parte de D).
- **Se pueden empezar ya:** C `revision-sideboard` ★, G `estudios-mulligan` ★, J `pivotes-interaccion`, L `fuente-testacular`, O `readme-docs`, Q `rendimiento-carga`, U `repo-cleanup` (cuando decidas borrar). ★ = necesita una decisión del usuario antes de empezar.
- **Bloqueadas:** D (Azorius Tempo y Rakdos Reanimator, opcionales porque ya no están en el top 10; por C), M (por C y L), N parte 1 (`revision-gameplay-1`, por J), T (todas).
- **Decisión 9 (menú):** los nombres nuevos ya están publicados; quedan la sección de inicio y los ids internos.
- **Pregunta de H (Quirion en la ruta 1):** resuelta el 8 Oct 2026; ver la tarea N.

### Deploy del 8 Oct 2026 (commit 83c5f2c)

Publicado: K `creditos`, N parte 2, P `rendimiento-imagenes` (58 `.webp`), R y S (móvil, título "Speaker Elves"), nombres nuevos del menú, Matchups (filas, "Their sideboard" con MyMTGO, plan de Boros Energy), `scripts/update_meta.py` con MyMTGO y `.vercelignore` con `/_*.html`. No se subieron las 16 `.webp` sustituidas (tarea U) ni páginas `_*.html`.

- Comprobado en vivo (https://speaker-elves.vercel.app/): 0 errores de consola en escritorio y a 390 px; título "Speaker Elves"; Matchups con 11 filas, Boros Energy incluido; `assets/matchups/boros-energy.webp` da 200 y `ROADMAP.md` da 404.
- La próxima ejecución del bot ya leerá MyMTGO: el 9 Oct, comprueba que `js/meta-live.js` trae la clave `mymtgo`.
- Sigue pendiente: U `repo-cleanup` (borrar las 72 imágenes sin uso), O `readme-docs`, C, D (opcional), G, J, L, M, N parte 1, Q y T.

**Chats en paralelo:** varias tareas tocan `index.html`. Cada chat edita solo su pane (`<section class="pane" id="…">`), con ediciones puntuales, nunca reescribiendo el archivo entero. Antes de dar la tarea por hecha, comprueba que las secciones de otros chats siguen intactas. Al terminar, cada chat marca su tarea aquí y en "Estado" y no hace push: el push lo pide el usuario desde un solo chat.

### En cualquier orden o en secuencia

- **Cualquier orden** (no dependen de nada ni chocan entre sí): G `estudios-mulligan`, J `pivotes-interaccion`, K `creditos`, L `fuente-testacular`, O `readme-docs`. C también se puede empezar ya.
- **En secuencia:**
  - C → D → P → Q (sideboard, luego matchups nuevos, luego imágenes y carga).
  - K y L → M (Origins; M también necesita C).
  - J → N (Gameplay).
  - Contenido terminado → R → S (móvil).
  - Todo → T (verificación final).

### Orden recomendado (lo que queda)

1. C `revision-sideboard` — bloquea D, M y P
2. D `matchups-sin-plan`
3. G `estudios-mulligan`
4. J `pivotes-interaccion`
5. K `creditos`
6. L `fuente-testacular`
7. M `revision-learn`
8. N `revision-gameplay-1` (First Turns y Game Plans; la parte 2 ya está hecha)
9. P `rendimiento-imagenes`
10. Q `rendimiento-carga`
11. R `movil-auditoria`
12. S `movil-arreglos`
13. O `readme-docs`
14. U `repo-cleanup` — cuando decidas borrar; mejor después de D
15. T `verificacion-final`

Hechas: A `push-y-workflow`, B `nombre-prepare`, E `goldfish-modos`, F `mulligan-probabilidades`, H `windows-propias`, I `windows-rival`, K `creditos`, P `rendimiento-imagenes`, R `movil-auditoria`, S `movil-arreglos` y N parte 2 `revision-gameplay-2` (publicadas en 83c5f2c).
