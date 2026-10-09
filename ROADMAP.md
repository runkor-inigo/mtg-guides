# Roadmap

## Decisiones pendientes

1. **Resuelta (8 Oct 2026): workflow nocturno.**
   El usuario acepta las condiciones de uso de MTGGoldfish para la lectura automática de los listados públicos. El workflow ya estaba activo (4 ejecuciones programadas en verde, 7 y 8 Oct), pero ninguna actualizó nada: GitHub las arrancó entre las 03:25 y las 04:38 de Madrid, y `update_meta.py` solo actualizaba de 00:00 a 02:59. Se quitó esa franja (commit 1b23972): ahora refresca en la primera ejecución de cada día de Madrid.

2. **Resuelta (8 Oct 2026): nombre de la sección "Prepare".**
   Ahora se llama "Metagame" (menú lateral y barra de capítulos del móvil). Cubre Sideboard, Matchups e Interaction Windows y no repite el nombre de ninguna sección. Sustituida por la decisión 9: la parte se llama ahora "Gameplay" (id `gameplay`).

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

9. **Resuelta (8 Oct 2026): partes del menú y sección de inicio.** Nombres publicados en el commit 83c5f2c: Learn → "Deck Foundations" (icono `cards`), Gameplay → "Game Theory" (`tree`), Metagame → "Gameplay" (`swords`). Sustituye al nombre "Metagame" del punto 2. Después, sin commit todavía:
   - Ids internos alineados con los nombres: `foundations`, `theory`, `gameplay`, `about` (antes `learn`, `gameplay`, `prepare`). Solo los usaba `GUIDE_GROUPS`.
   - La guía se abre en Start Here, no en Sideboard (`js/01.js` y la clase `active` pasa de `#map` a `#start` en `index.html`). Era un resto de cuando la guía era solo de sideboard.
   - El `#hash` de la URL guarda la sección abierta (`/#matchups`), sin añadir entradas al historial. Un enlace con hash abre la guía directamente en esa sección, sin pasar por la portada; también vale el id de un elemento dentro de una sección (`#windows-opponent`). Un hash desconocido muestra la portada y "All guides" borra el hash. Código: `guideTarget` y `syncGuideHash` en `js/01.js`, `openFromHash` en `js/05.js`.
   - Comprobado en local: portada, `#matchups`, `#windows-opponent`, `#bogus`, menú, "Next", "All guides" y hash editado a mano, a 390 px; 0 errores de consola.

## No verificado

- Ninguna afirmación pendiente por ahora. (Resuelto el 8 Oct 2026: el usuario confirmó que ryo_sll es Shimoizumi Ryoichi y taka87z3 es Takagi Yuki; los resultados en papel de metagame.info muestran a Shimoizumi con Speaker + Sabertooth desde el 21 Mar 2026. Deck Origins y Credits ya no llevan "Unverified" en ellos y cada mención enlaza a su X.)

## Plan de chats

Cada tarea cabe en un chat. Para empezar uno: `/rename <nombre>` y "Lee CLAUDE.md y ROADMAP.md; haz la tarea <nombre>". Al terminar, el chat actualiza esta sección (marca la tarea como hecha) y CLAUDE.md si cambia el estado.

**Nota sobre el peso:** `index.html` pesa ~160 KB. Desde la tarea P las imágenes en uso son WebP (~4 MB en total); los originales `.jpg`/`.png` sin uso siguen en `assets/` hasta la tarea U.

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
- Sneak & Show vuelve al mapa (8 Oct 2026, petición del usuario) con la fila AlurenTell de la guía de j-off traducida a la lista del 5 Oct: +4 Thoughtseize, +2 Choke, +1 Assassin's Trophy / −3 Quirion Ranger, −2 Wirewood Symbiote, −1 Collector Ouphe, −1 Badgermole Cub. Matchups vuelve a tener plan para Sneak and Show. Publicado en c790520.
- Material de referencia (8 Oct 2026): LEGACY.md, sección 10, transcribe la guía "Sabertooth Elves aka Badger Ball Z" (2 Oct 2026 probablemente, 13 matchups) con lo que se deduce para mapear; LEGACY.md, secciones 4 y 5, recoge las ideas de sideboard de Curran Delahanty. Revisar ambos antes de cambiar planes.
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
- Resultado: el pane `#credits` pasa de cartel a artículo: quién encontró el deck (taka87 y ryo_sll, primero con "Unverified" y después verificados, ver abajo; pilotos de MTGO del archivo de resultados, con fecha 7 Oct 2026 y enlace a Current 75), el linaje de Cradle Control (los pilotos ya citados en Deck Origins), autores y fuentes (mismos enlaces que Origins), datos y herramientas (MTGGoldfish, mtgo.com, Scryfall, GSAP) y el aviso de la Fan Content Policy de Wizards. Quitado `wip:true` de credits en `js/01.js`. Verificación de taka87 y ryo_sll: sin resultado (ver "No verificado"). Comprobado sobre una copia limpia de HEAD con solo este cambio: 0 errores de consola; a 1280 px y a 390 px sin scroll horizontal.
- Testing y debate: se agradece al canal #elves del Discord de runkor (sin enlace: no hay invitación en el proyecto).
- Verificación hecha: ryo_sll = Shimoizumi Ryoichi y taka87z3 = Takagi Yuki (confirmado por el usuario). Origins y Credits citan sus resultados de Hareruya con fecha y enlace a metagame.info, cada mención lleva su perfil de X, y la nota de método de Origins explica la fuente (182 torneos japoneses revisados; cobertura desde marzo de 2026). 0 errores de consola; Origins y Credits sin scroll horizontal a 390 px.
- Añadidos con nombre, usuario de MTGO y X (datos del usuario, 8 Oct 2026): Beñat (Benat, @Benatmtg), Newton Hang (hellonewton; @hello_newton), Jörg Heinrich (EronRelentless, @Eron_Relentless) y Curran Delahanty (Testacular, sin X: cuenta borrada). Formato en la página: "Nombre (MTGO: usuario; @X)". Autor: Iñigo Villamor (MTGO: runkor; @vllmr) en la entrada de Credits; en el resto de la página "runkor" se queda como firma. Sin datos aún: DB_ThrabenU, vegecookies, LarthPursenas, urzatheplaneswalker, INnoVationLB, o0oHyperiono0o y los pilotos japoneses salvo Shimoizumi y Takagi.
- Objetivo: escribir Credits y quitar la marca `wip`; intentar verificar a taka87 y ryo_sll (sección "No verificado").
- Archivos: el pane `#credits` en `index.html`, `js/01.js` (quitar `wip:true`), y `#origins` si cambia la verificación.
- Dependencias: ninguna. Cualquier orden.
- Tamaño: pequeña.
- Decisión previa: a quién se agradece y con qué enlaces.

**Heurísticas en LEGACY.md (8 Oct 2026, chat principal, publicado en d5abbdc).** Archivo interno nuevo con las heurísticas de Legacy de la guía (fuente, estado y cuándo no aplican), enlazado desde CLAUDE.md y fuera de la web (`.vercelignore`). Idea del usuario: no son incuestionables y cada mazo juega distinto; Speaker Elves hace más maná y más rápido (intenta más el Natural Order de turno 2) y su plan midrange es peor que el de Cradle Control. Añadido también a Deck Origins ("Where they differ") y como tarjeta nueva en Heuristics ("Faster than Cradle Control"). Credits: Newton Hang como quien más ha empujado el arquetipo Cradle, del que deriva Speaker Elves; Jarvis Yu se queda.

**L. `fuente-testacular`** — HECHA (8 Oct 2026, publicada en d5abbdc): la guía existe. El usuario pasó el documento: Curran Delahanty, "Cradle Control: An Overview" (Google Docs, de 2024 a diciembre de 2025).
- Añadido a Deck Origins como fuente (primera de la lista) y citado en cinco eras: origen de Cradle Control (Newton Hang cuestiona Nettle Sentinel y propone Elvish Reclaimer; su propio Discord); top 8 del Eternal Weekend 2021 de Jörg Heinrich, Newton (xWhale) y Peter van der Ham (Maraxus_of_NL); el lema "cartas que no necesiten otras para ser buenas" y Fiend Artisan (Curran gana una Challenge en noviembre de 2022); Hierarchs y Endurance hasta abril de 2024; MH3 (Talon Gates, Springheart), Sylvan Safekeeper, Scythecat Cub, Keen-Eyed Curator; baneos de Troll of Khazad-dûm, Sowing Mycospawn, Entomb y Nadu; y la lista de Badgermole Cub de runkor con Quirion Ranger, que Curran destaca.
- Corregido: "Glimpse of Nature was never part of it" (Cradle Control) pasa a "se cortó antes de que el mazo tomara el nombre; su antecesor era la lista Reclaimer Glimpse".
- Heuristics: quitadas las dos menciones al plan de vegecookies, que ya no existe.
- Ideas del documento para la revisión del sideboard (tarea C), sin aplicar: contra mazos con counters (Rescaminator, Delver) Curran saca los tres Natural Order, Atraxa y Craterhoof; contra Red Stompy, −4 Endurance (Broadside Bombardiers) y Dismember para Magus of the Moon; "menos copias de Leyline es mejor si hay otra disrupción" (la lista del 5 Oct lleva 3); Toxicrene contra Mono-Green Post; secuenciar exponiendo primero las amenazas menores (Reclaimer) para gastar el removal del rival.

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

**O. `readme-docs`** — hecha (8 Oct 2026, sin commit): README.md reescrito con la estructura actual. Quedan fuera el panel Sources (`#sources`, ver más abajo) y el comentario de `.github/workflows/meta.yml` que aún dice que el papel viene de mtgtop8.
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

**W. `revision-maybeboard`**
- Objetivo: que runkor revise los 70 borradores "Why it is not in this list" del Maybeboard (cartas de otras listas de Speaker, Cradle Control y combo Elves que nunca estuvieron en las nuestras). Los escribió Claude el 9 Oct 2026 y van marcados "Unverified".
- Cómo: repasar carta por carta (filtro por origen o por función en `#maybeboard`); corregir el texto en el artículo de `index.html` y quitar la etiqueta `ev unverified` de los que se den por buenos. Revisar también la función ("Job") si algo no encaja con cómo se jugaba la carta.
- Archivos: `index.html` (pane `#maybeboard`), solo texto.
- Dependencias: ninguna. Encaja bien junto a C `revision-sideboard` (cartas como Dismember, Toxicrene o Alpha Deathclaw son candidatas al sideboard).
- Tamaño: media (lectura).
- Decisión previa: ninguna.

### Diseño (8 Oct 2026, chat principal)

- **Cabecera retirada.** Decisión del usuario: "All guides" y el nombre de la guía pasan a la parte de arriba del menú lateral; en el móvil, una flecha de volver a la izquierda de la barra de capítulos. La línea "19 lands · 6 fetchlands…" se quita (ya está en Deck Construction y Current 75). Archivos: `index.html` (sin `<header>`, `h1` oculto), `js/menu.js` (opción `brand`), `js/01.js`, `js/05.js`, `css/menu.css`, y limpieza de reglas de cabecera en `css/01.css`, `02.css`, `06.css` y `12.css`. Verificado en local: 0 errores de consola; escritorio, menú plegado y 390 px sin scroll horizontal; los dos botones de volver llevan a la portada y al reabrir la guía el foco va al botón de volver. Publicado en cad80d3.
- **Skills de diseño instaladas** en `.claude/skills/` (solo local): emil-design-eng, impeccable (sin hooks), design-taste-frontend y redesign-existing-projects.
- **Playwright MCP: añadido el 8 Oct 2026** (`claude mcp add playwright -- npx -y @playwright/mcp@0.0.83 --browser chrome`, con `-s user`, config de usuario en `C:\Users\Ini\.claude.json`, no en el repo; con el ámbito local no aparecía porque VS Code abre la carpeta como `c:` y la config estaba guardada bajo `C:`). El chequeo de salud falla dentro del sandbox de Claude (no ve `cmd.exe`); confirmar tras reiniciar la sesión que aparecen las herramientas `mcp__playwright__*`. El CLI `claude` no está en el PATH: el binario está en la extensión de VS Code (`resources\native-binary\claude.exe`).
- **Opcional: hooks de Impeccable.** Ejecutarían su binario (que se descarga la primera vez) tras cada edición y al final de cada turno. Desactivados hasta que el usuario decida.

### Goldfish, zoom y Credits (8 Oct 2026, chat principal)

Publicado en el commit cad80d3 (8 Oct 2026). En vivo: HTML idéntico al local, sin `<header>`, 0 errores de consola en escritorio y a 390 px, interruptores del Goldfish visibles, `ROADMAP.md` da 404.

- **Zoom de cartas:** la imagen ampliada mantiene las esquinas redondeadas (`border-radius: 4.75%/3.4%`, 3 mm sobre 63×88 mm) y su caja ya coincide con la carta (`css/01.css`, `.combo37-large`).
- **Variantes del Goldfish** (petición del usuario): interruptores de carta enlazados en cada modo (`GF_VARIANTS` y `buildGoldfish(mode, side, v)` en `js/04.js`; estilos en `css/12.css`).
  - Natural Order: 7 rutas legales para 4 de maná en turno 2 (Cub + Cradle con dork o GSZ → Dryad Arbor, con o sin Quirion; sin Cub: dork o Arbor + Quirion; sin dork: Quirion en turno 1 + Cub). Objetivo Atraxa por defecto (decisión del usuario: Craterhoof en turno 2 no es letal) o Craterhoof (7–9 de daño). Sin Cradle no hay línea: el interruptor se niega y explica la cuenta.
  - Turn-2 Sabertooth: con o sin Quirion. Sin Quirion en el play llega a Sabertooth con 0 de maná y pasa el turno; en el draw, con Quirion, usa tres Symbiotes.
  - Ready board: solo maná o robando con Elvish Visionary (línea antigua recuperada del historial; carta flex, no está en el main del 5 Oct).
  - Comprobado con Node: todas las combinaciones (modo × variante × play/draw) se construyen sin maná negativo ni cartas duplicadas, y las líneas que ya existían dan los mismos pasos y el mismo maná que antes. Navegador: 0 errores de consola; los interruptores se mueven juntos y Cradle se niega con su explicación.
  - Natural Order (`#natural-order`) ya no dice que el Goldfish solo muestra la primera ruta.
- **Credits:** nueva sección "Elves through the years", en orden: Luis Scott-Vargas (Pro Tour Berlin 2008, Extended), Chris Andersen (era de Glimpse), Matt Nass, Andrew Cuneo y Ross Merriam (2013–14, Natural Order y Craterhoof; fuente: Ross Merriam en StarCityGames), Juan Félix Flury (top 8 GP París 2014, mtgtop8), Lukas Müller (8-0 en el día 1 del GP Birmingham 2018, cobertura de Wizards), Reid Duke y Julian Knab (Everyday Eternal), Cradle Control y Speaker Elves. Nueva sección "Long-time collaborators": Jonathan Caballero (Donostia) y Serafín Gómez (Portugal).
  - dssit = David Schittinger (@Dsitt7), según el usuario; enlazado en Credits y Deck Origins.
  - Quitadas las cuentas alternativas de Newton Hang (petición del usuario: no revelar cuentas).
  - **Cerrado (9 Oct 2026):** el nombre "que gustes" del dictado no se identificó; el usuario lo da por cerrado y no se añade a nadie.

### Deck Origins, Current 75 y Maybeboard (8 Oct 2026, chat principal, publicado en 5457fee)

- **Deck Origins con resultados y nombres** (petición del usuario): cada era antigua gana un párrafo "Results and people" con fuentes: Brad Herwy (Aggro Elves, top 4 GenCon 2008 Legacy Championship, mtgtop8); Chris Andersen (Ross Merriam, SCG); Reid Duke gana el SCG Legacy Open Philadelphia 2013 (SCG); Andrew Cuneo y Ross Merriam; Juan Félix Flury (top 8 GP París 2014, mtgtop8); Lukas Müller (8-0 día 1 GP Birmingham 2018, Wizards); 2020: Elves 4.º mejor mazo del año, Challenge del 5 Dic 2020 (Comeback 1.º, EronRelentless 2.º) y Newton Hang y Julian Knab citados como pilotos (Joe Dyer, MTGGoldfish); 2022: Testacular 2.º y EronRelentless 3.º en Challengers de julio (TCDecks), JHK 3.º y Testacular 6.º en la Challenge del 30 Oct (MTGGoldfish), final de Reid Duke en diciembre (Ultimate Guard). Credits enlaza la cita de 2020.
- **Current 75 es su propia sección** (`current-75`, pane `#deck`); Deck Construction queda con `#construction` y `#mana`. Los enlaces "Current 75" apuntan a la sección nueva.
- **Sideboard pasa a "Sideboard map"** (id `sideboard` sin cambiar) y **nueva sección Maybeboard** (`#maybeboard`) con 10 cartas que salieron de la lista: Elvish Visionary, Windswept Heath (una), Hogaak y Chomping Changeling (5 Oct); Force of Vigor, Gaddock Teeg, Grist, Endurance y Eladamri (3 Oct); Savannah (21 Sep). Para cada una: su papel y por qué salió, según las notas de las listas en el historial de git.
  - **Resuelto (9 Oct 2026):** runkor dio los motivos de Windswept Heath (tercer Boseiju), Grist, Gaddock Teeg, Endurance y Eladamri; ver "Maybeboard ampliado" abajo.
- Verificado en local: 16 secciones, `#current-75` y `#maybeboard` abren su sección, 0 errores de consola, 390 px sin scroll horizontal.
- **Prominent decklists** (arriba de Current 75, `js/10.js`, estilos en `css/11.css`): tarjeta con la lista de runkor (la 75 de la página) y tarjeta "Best performing now", recalculada en cada carga desde `js/results-archive.js` (lo actualiza el bot cada noche). Criterio del usuario: más resultados publicados en los 14 días hasta la última actualización; desempate: mejor puesto en Challenge, después el resultado más reciente. Las listas se enlazan, no se copian (las páginas de mazos de MTGGoldfish están protegidas). A 7 Oct: urzatheplaneswalker y Beñat empatan a tres 5-0 y gana urzatheplaneswalker por fecha; el desempate se puede cambiar.
- **Goldfish (petición del usuario):** "Turn-2 Sabertooth" pasa a "Turn-2 Sabertooth kill". En ese modo Quirion y play/draw están enlazados: sin Quirion la línea solo sale en el draw (necesita una carta más), así que apagar Quirion cambia a "On the draw" con destello y aviso "Only on the draw", y elegir el play enciende Quirion. La línea del play sin Quirion (que se quedaba corta) ya no se puede elegir. El selector play/draw se oculta en Natural Order (sale en los dos; se muestra en el play) y en Ready board.
- **Julian Knab en Deck Origins y Credits:** ganó el Bazaar of Moxen 8 en París con Elves (695 jugadores, 3 Nov 2013), MKM Series Milán 2016 y Hamburgo 2018, top 8 en el Legacy European Championship 2017; doce resultados destacados con Elves de 2013 a 2018 (mtgtop8). Resuelve la duda "Knab o Knapp": es Knab.
- **Game Plans · Slower board:** con Elvish Visionary el juego largo puede ser más grindy (Symbiote lo devuelve y cada recast roba; con Sabertooth roba toda la biblioteca); no todas las listas lo juegan.

### Maybeboard ampliado y vuelta a 2 Windswept Heath (9 Oct 2026, chat de preguntas abiertas, sin subir)

- **Motivos de salida (runkor):** Windswept Heath se quitó para probar un tercer Boseiju y sacar más valor de Marwyn desde el principio; no compensa, porque con menos Forests en juego Quirion Ranger pierde valor. Grist es algo lenta para el mazo, pero vuelve si el metajuego es muy grindy o con muchas Containment Priest (GSZ la encuentra porque fuera del campo es criatura; entra como planeswalker, así que Priest no la exilia). Gaddock Teeg: sin Eladamri (que la ponía en juego desde la mano) es imposible de lanzar, aunque es top contra Tron y similares. Endurance: falta de sitio y el mazo ya tiene sus líneas; sigue siendo una bomba de cementerio.
- **Cambio de lista (aprobado por el usuario):** vuelve la segunda Windswept Heath y sale el tercer Boseiju. 19 tierras: 7 fetches (2 Misty, 2 Verdant, 2 Windswept, 1 Wooded), 2 Boseiju, 2 Bayou, 2 Forest, 4 Cradle, 2 Arbor. Actualizados la decklist y la nota de Current 75, el perfil de maná (11 Forests o fetches para Quirion; 13 fuentes verdes, 83,72 % sin cambio), la tarjeta MANA de Heuristics, LEGACY.md (sección 6) y el comentario de la capa de conversión en `js/01.js` (ningún plan mueve tierras). El recuadro de mulligan lee la lista sola. El badge "5 Oct 2026 list" del menú se quita (decisión del usuario) y el pie de página muestra "Last updated 9 October 2026".
- **Maybeboard ampliado (petición del usuario):** de 10 a 80 cartas. Fuente: 914 listas de Legacy publicadas en mtgtop8 (Cradle Control 2022–2026 y Elves 2025–2026, leídas el 8 Oct 2026; lectura puntual, no automática; el archivo de resultados sigue solo con MTGGoldfish). 52 son Speaker Elves (Speaker + Sabertooth + Symbiote en el main), 813 Cradle Control, 49 combo Elves. Entran las cartas fuera de nuestra 75 con 25 listas o más, o al menos dos listas de Speaker (elección del usuario), sin básicas. Cuatro estanterías: nuestras listas (10, incluido el tercer Boseiju), otras listas de Speaker (17), Cradle Control (47) y combo Elves (6).
  - Cada carta: función (comprobada con el Oracle de Scryfall), dónde se jugó (listas, main/side, copias, primera y última fecha, % por año y por mazo) y por qué no está. En las 70 cartas que no salieron de nuestras listas, ese motivo es un **borrador de Claude marcado "Unverified"**: el usuario debe revisarlo.
  - Diseño (elección del usuario: índice + ficha fija): filtros por origen y por función (control segmentado común), búsqueda, rejilla por estanterías con el número de listas en cada carta, y la ficha a la derecha, fija al desplazar (encima en pantallas estrechas) con mini gráfica por año. Los artículos de `index.html` siguen siendo la fuente del texto y la versión sin JS; los datos van en `data-stats`/`data-role`/`data-shelf`. Generados con un script puntual, no se regeneran solos.
  - Arte: 71 imágenes nuevas, primera impresión según "Card art" (`assets/<nombre>.webp`, entradas en `COMBO_CARD_ART` al final de `js/02.js`). Excepción: Legolas's Quick Reflexes solo existe sin borde (Tales of Middle-earth Commander 493). Miniaturas de 208×290 para la rejilla en `assets/thumbs/` (~12 KB cada una, ~1 MB en total).
  - Verificado en local: 0 errores de consola, filtros, búsqueda, estado vacío y ficha de Wight; a 390 px la ficha va arriba.
- **Eladamri (runkor):** el plan salía poco y a coste 3 podía ser pesado; no salió por mala, sino para liberar un hueco flex y probar otras cosas, porque no es parte del núcleo.
- **Cerrado:** el nombre "que gustes" de Credits no se identificó y queda descartado (decisión del usuario, 9 Oct 2026).
- **Pendiente:** la revisión de los borradores "Unverified" es la tarea W `revision-maybeboard`.

### Resultados en papel, refresco nocturno y selectores (8 Oct 2026, chat principal, publicado en 25fd194)

- El archivo de resultados no se refrescaba si el metajuego no cambiaba (condición del workflow). Ahora `update_results.py` corre cada noche con su propio control de "una vez al día de Madrid" (`--force` para repetir), y el workflow ya no depende del metajuego.
- Resultados en papel: mtgtop8 (sin robots.txt ni comprobación anti-bots), búsqueda Legacy con Formidable Speaker en el main, eventos no MTGO, arquetipos Elves / Cradle Control. Incluye las Cup y Super DX de Hareruya, KMC y Tokai. hareruyamtg.com prohíbe en su robots.txt leer `/deck/result?*`, así que no se lee directamente. Primera ejecución: 103 resultados (44 trofeos, 11 de Challenge, 48 en papel).
- Current 75: filtros All MTGO / MTGO trophies / MTGO challenges / Paper events; en papel el puesto se muestra como Top 4, Top 8… con enlace al evento en mtgtop8. "Prominent decklists" sigue contando solo MTGO (los puestos en papel son tramos); con los datos nuevos el mejor ahora es Beñat Garay.
- Selectores: un solo estilo segmentado (cápsula oscura, opción activa con el degradado menta → oro) para Compact / Visual, el filtro de resultados, los modos y play/draw del Goldfish y las vistas del Sideboard map. Compact / Visual y el filtro de resultados tenían el estilo antiguo (menta plano).
- Verificado en local: 0 errores de consola; los cuatro filtros devuelven filas; 390 px sin scroll horizontal.

### Deck Origins como timeline (8 Oct 2026, chat principal, publicado en 04cf99f)

- Petición del usuario: menos scroll en Deck Origins. `js/14.js` y `css/14.css` (nuevos) convierten la lista de eras en un timeline: una línea con los 10 hitos (año y título) y una ficha debajo con el texto, los resultados y las fuentes del hito elegido, más botones anterior / siguiente. El hito activo late con un pulso menta → oro (sin pulso si las animaciones están apagadas); la línea se ilumina hasta él; flechas del teclado para moverse. Abre en 2026 (Speaker Elves).
- La lista `<ol class="timeline">` sigue en el HTML como única fuente del texto y versión sin JavaScript; el script solo la lee.
- Verificado en local: 0 errores de consola; a 1440 px caben los 10 hitos; a 390 px el carril se desliza y mantiene visible el hito activo; sin scroll horizontal de la página.

### Ajustes del Sideboard map y del Maybeboard (8 Oct 2026, chat principal, publicado en f1ab0fc)

- Maybeboard: el carrusel en movimiento no dejaba elegir carta. Lo sustituye una bandeja fija bajo la mesa, agrupada por cuándo salió cada carta; al elegir una en el móvil, la página sube a la mesa. Savannah tiene imagen: primera impresión, Limited Edition Alpha · 280 (Rob Alexander), en `assets/savannah.webp` y en `COMBO_CARD_ART` (js/02.js).
- Once Upon a Time nunca se saca (decisión del usuario). Venía de los planes RC51 del 3 Oct (código original, commit 7602930) en Eldrazi, Sneak & Show y Cephalid Breakfast:
  - Eldrazi: +3 Snuff Out / −1 Collector Ouphe, −1 Vibrance, −1 Formidable Speaker.
  - Sneak & Show y Cephalid Breakfast: fuera del mapa hasta revisar todo el plan de sideboard (tarea C). Sneak and Show está en el top 10 de Matchups, que ahora la muestra sin plan.
- Fuera el plan alternativo de vegecookies (sacaba Atraxa). La función sigue en js/01.js, sin llamarse.
- Matriz: celdas +N / −N cuadradas (24×24). Las categorías muestran su cuota 7d / 14d / 30d en Plan rows, en Matrix (14d en su columna) y en la hoja impresa (14d); orden: categoría con más meta primero y, dentro, los mazos de más a menos.
- Verificado en local: 26 filas, ningún plan saca OUaT, 0 errores de consola, PDF de una página.

### Sideboard map y Maybeboard nuevos (8 Oct 2026, chat principal, publicado en 226a7f6)

- Decisión del usuario tras la página de opciones (https://claude.ai/artifact/PDz974TvcHyS73KUXSP1jv): Plan rows y Matrix como dos vistas, más Presence (cobertura del meta) y modo de impresión. Sin Bubble matrix. Card strips y By card no entran por ahora.
- `js/13.js` y `css/13.css` (nuevos). Vistas Plan rows (por defecto), Matrix y Presence; buscador; el nombre de un matchup abre su plan; botón "Print / Save as PDF" con una hoja A4 en blanco y negro de una cara (comprobado con un PDF real: una página, 29 matchups). La matriz antigua sigue en el DOM, oculta.
- Maybeboard como mesa de estudio: carta grande con "Why it was chosen", "Where it helped" (calculado de los planes antiguos de `js/01.js`, guardado en `data-served` de cada ficha) y, en pequeño, "Why it is not in the list now"; debajo, un carrusel que se mueve despacio y se para con el ratón. Criterio del usuario: el Maybeboard es el archivo de todas las cartas consideradas, y lo importante es por qué se eligieron.
- Verificado en local: 0 errores de consola; a 390 px ninguna vista desborda (la matriz hace scroll dentro de su marco).
- Hecho: "Reading the sideboard map" en Sources describe ya las tres vistas (8 Oct 2026, chat `sources`).

### Credits y Deck Origins sin duplicados (8 Oct 2026, chat principal, publicado en 226a7f6)

- Regla del usuario: la historia del mazo vive solo en Deck Origins; Credits y About no la repiten y enlazan a Deck Origins.
- Credits: quitadas "The people who found the deck" y "Elves through the years"; queda "The players behind the deck" con enlace interno a Deck Origins. "Writers and sources" enlaza a la lista de fuentes de Deck Origins. Se mantienen autor, colaboradores, datos y herramientas, testing y Fan Content.
- Deck Origins recibe lo que solo estaba en Credits: pilotos japoneses (Okuto Shinya, Tozuka Kouta, Maegawa Naoya, Yanagisawa Yuta), pilotos de MTGO (DB_ThrabenU, Beñat y el resto, a 7 Oct) y Everyday Eternal. Su lista de fuentes añade Joe Dyer (MTGGoldfish), el SCG Open de Philadelphia, mtgtop8, TCDecks y la cobertura del GP Birmingham. Comprobado: cada nombre que estaba en Credits aparece en Deck Origins.
- Perfiles nuevos (datos del usuario): Julian Knab (MTGO: Julian23; @itsJulian23) y Reid Duke (MTGO: reiderrabbit; @ReidDuke) en Deck Origins; SamwiseGeeGee (@jkyu06), "que conoce todas las versiones del mazo", en los agradecimientos de Credits. Prominent decklists muestra Julian23 y reiderrabbit con su nombre real.
- Colaboradores (datos del usuario): Jonathan Caballero, Serafín Gómez, Beñat Garay (MTGO: Benat), David Melchor (MTGO: deimus), Shimoizumi Ryoichi y Takagi Yuki, vegecookies, j-off (Discord) y Jarvis Yu (MTGO: SamwiseGeeGee; @jkyu06: ganó el GP Seattle-Tacoma 2015 con Lands, según mtgtop8; no tiene resultados con Elves; el usuario lo confirma. Aparece aparte como persona de referencia para contrastar ideas), más un agradecimiento al canal #elves. "Beñat Garay" con nombre completo también en Deck Origins y en Prominent decklists.
- Hecho (8 Oct 2026, chat `sources`, sin subir): Sources reescrito con las fuentes actuales (MTGGoldfish, MyMTGO, búsqueda de mazos + mtgo.com, Scryfall con primera impresión local), refresco en la primera ejecución del día, las tres vistas del Sideboard map, el origen de los planes (conversión al 5 Oct, revisión de runkor, j-off) y enlaces a Deck Origins y Heuristics. Quitados 17Lands, Mana Math, "Selected printings · RC51" y las etiquetas RC39/RC51. En js/01.js, el tooltip de la matriz ya no pone "captured 2026-09-28" y las notas de mapeo ya no dicen "manual refresh". La tarea L (Testacular) puede añadir su tarjeta aquí.

### Próximo paso de diseño (propuesto, 8 Oct 2026)

- **V. `pasada-impeccable`** — pendiente de confirmar por el usuario. Auditoría y crítica de toda la guía con la skill Impeccable (`audit`, `critique`): lista priorizada de problemas de tipografía, jerarquía, espaciado y contraste. Después se aplica solo lo que el usuario apruebe, respetando las reglas de CLAUDE.md (sin build step, paleta verde oscura, mint → oro). Hasta ahora solo se ha usado emil-design-eng, para detalles de interacción (botón de volver, interruptores).
- Archivos: los CSS (`css/01.css`, `css/11.css`, `css/12.css`, `css/menu.css`) y, si hace falta, marcado puntual en `index.html`.
- Tamaño: media (auditoría) + lo que se apruebe.
- Preguntas de Credits cerradas (9 Oct 2026): "que gustes" no se identificó y se descarta; dssit = David Schittinger está confirmado.

### Resultados solo de MTGGoldfish (8 Oct 2026, chat principal, sin subir)

- Decisión del usuario: todas las fuentes de resultados desde MTGGoldfish, manteniendo la clasificación (All MTGO / MTGO trophies / MTGO challenges / Paper events). mtgtop8 deja de usarse.
- `update_results.py`: los eventos de MTGO que no son liga ni Challenge (Showcase Challenge, RC Qualifier, Last Chance) cuentan con las Challenges; los que no son de MTGO, como papel. Goldfish no da puesto para ellos: salen como "Published list". Se quitan duplicados en esos eventos (Goldfish lista a veces dos veces el mismo mazo); los trofeos de liga se cuentan todos.
- Consecuencia aceptada por el usuario: el papel baja de 48 resultados (mtgtop8, casi todos japoneses) a 2 (j-off en la DMV League y el SCG CON de Baltimore). Archivo regenerado: 59 resultados (44 trofeos, 13 de Challenge y otros eventos de MTGO, 2 en papel).

### Resumen del 8 Oct 2026 (últimos despliegues)

- 226a7f6: Sideboard map con Plan rows, Matrix, Presence e impresión; Maybeboard como mesa de estudio; Credits sin historia repetida.
- f1ab0fc: bandeja del Maybeboard, arte de Savannah, Once Upon a Time nunca sale, % de categoría en todas las vistas.
- 04cf99f: Deck Origins como timeline interactivo.
- 25fd194: resultados en papel (mtgtop8), refresco nocturno de resultados, un solo estilo de selector.
- d5abbdc: guía de Curran Delahanty en Deck Origins, LEGACY.md, Newton Hang en Credits.
- c790520: Sneak & Show con el plan de j-off; su guía en LEGACY.md.
- Pendiente de comprobar el 9 Oct: el commit nocturno del bot debe traer `js/meta-live.js` (con `mymtgo`) y `js/results-archive.js` (con resultados en papel); después, `git pull`.

### Estado (8 Oct 2026, tras el commit 83c5f2c)

- **Hechas y publicadas:** A, B, E, F, H, I (commit 55ac39b); K, N parte 2, P, R y S (commit 83c5f2c); y las decisiones 1–8. A solo espera el commit del bot el 9 Oct.
- **Matchups (chat de Matchups, publicado en 83c5f2c):** top 10 de MTGGoldfish en filas desplegables; tabla "Their sideboard" con MTGGoldfish y MyMTGO; semáforos que leen también la lista de referencia de MyMTGO; plan de Boros Energy (parte de D).
- **Se pueden empezar ya:** C `revision-sideboard` ★, G `estudios-mulligan` ★, J `pivotes-interaccion`, Q `rendimiento-carga`, U `repo-cleanup` (cuando decidas borrar), W `revision-maybeboard` (lectura tuya). L `fuente-testacular` está hecha. ★ = necesita una decisión del usuario antes de empezar.
- **Bloqueadas:** D (Azorius Tempo y Rakdos Reanimator, opcionales porque ya no están en el top 10; por C), M (por C y L), N parte 1 (`revision-gameplay-1`, por J), T (todas).
- **Decisión 9 (menú):** resuelta. Ids internos alineados, la guía abre en Start Here y el `#hash` de la URL guarda la sección (publicado en el commit que sigue a ede2026).
- **Pregunta de H (Quirion en la ruta 1):** resuelta el 8 Oct 2026; ver la tarea N.

### Deploy del 8 Oct 2026 (commit 83c5f2c)

Publicado: K `creditos`, N parte 2, P `rendimiento-imagenes` (58 `.webp`), R y S (móvil, título "Speaker Elves"), nombres nuevos del menú, Matchups (filas, "Their sideboard" con MyMTGO, plan de Boros Energy), `scripts/update_meta.py` con MyMTGO y `.vercelignore` con `/_*.html`. No se subieron las 16 `.webp` sustituidas (tarea U) ni páginas `_*.html`.

- Comprobado en vivo (https://speaker-elves.vercel.app/): 0 errores de consola en escritorio y a 390 px; título "Speaker Elves"; Matchups con 11 filas, Boros Energy incluido; `assets/matchups/boros-energy.webp` da 200 y `ROADMAP.md` da 404.
- La próxima ejecución del bot ya leerá MyMTGO: el 9 Oct, comprueba que `js/meta-live.js` trae la clave `mymtgo`.
- Sigue pendiente: U `repo-cleanup` (borrar las 72 imágenes sin uso), C, D (opcional), G, J, L, M, N parte 1, Q y T.

**Chats en paralelo:** varias tareas tocan `index.html`. Cada chat edita solo su pane (`<section class="pane" id="…">`), con ediciones puntuales, nunca reescribiendo el archivo entero. Antes de dar la tarea por hecha, comprueba que las secciones de otros chats siguen intactas. Al terminar, cada chat marca su tarea aquí y en "Estado" y no hace push: el push lo pide el usuario desde un solo chat.

### En cualquier orden o en secuencia

- **Cualquier orden** (no dependen de nada ni chocan entre sí): C `revision-sideboard`, G `estudios-mulligan`, J `pivotes-interaccion`, Q `rendimiento-carga`.
- **En secuencia:**
  - C → D (opcional: Azorius Tempo y Rakdos Reanimator) → U (por si D cambia arte).
  - C y L → M (Construction y Origins).
  - J → N parte 1 (First Turns y Game Plans).
  - Si D, M o N añaden tablas o tarjetas, repetir el recorrido móvil de R.
  - Todo → T (verificación final).

### Orden recomendado (lo que queda)

1. C `revision-sideboard` — bloquea D y M
2. J `pivotes-interaccion` — bloquea N parte 1
2b. W `revision-maybeboard` — revisión de los borradores del Maybeboard; mejor junto a C
3. G `estudios-mulligan`
4. L `fuente-testacular` — hecha (documento de Curran Delahanty)
5. M `revision-learn`
6. N `revision-gameplay-1` (First Turns y Game Plans)
7. D `matchups-sin-plan` — opcional (Azorius Tempo y Rakdos Reanimator fuera del top 10)
8. Q `rendimiento-carga`
9. U `repo-cleanup` — cuando decidas borrar; mejor después de D
10. O `readme-docs` (hecha)
11. T `verificacion-final`

Hechas: A `push-y-workflow`, B `nombre-prepare`, E `goldfish-modos`, F `mulligan-probabilidades`, H `windows-propias`, I `windows-rival` (55ac39b); K `creditos`, N parte 2 `revision-gameplay-2`, P `rendimiento-imagenes`, R `movil-auditoria`, S `movil-arreglos` (83c5f2c); decisión 9 y nombres reales en Credits y Origins (commit que sigue a ede2026).
