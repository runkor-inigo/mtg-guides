# Legacy · heurísticas del proyecto

Archivo de trabajo con las heurísticas de Legacy que usamos en la guía de Speaker Elves. Sirve para escribir la guía con un criterio coherente y para revisarlo cuando cambie el metajuego.

**Nada de esto es incuestionable.** Son reglas prácticas, no leyes: cada una dice de dónde sale y cuándo no aplica. Lo que funciona en un mazo de Cradle no funciona igual en otro, porque cada uno genera maná, cartas y presión a ritmos distintos. Cuando una heurística choque con el testing o con un piloto con experiencia, gana la evidencia y se actualiza este archivo.

Estados (solo internos desde el 9 Oct 2026: la guía publicada ya no muestra etiquetas): **Settled** (asentado), **Working range** (rango de trabajo), **Under test** (en prueba), **Unverified** (sin fuente).

La versión publicada para los lectores está en la sección Heuristics de la guía (`#heur` en `index.html`). Este archivo es el detalle interno: no se publica (`.vercelignore`).

Última revisión: 9 Oct 2026. Añadida la sección 11 (artículos de Newton Hang, carpeta `Legacy Knowledbase/`), con lo que coincide y lo que choca con nuestros planes. La propuesta de sideboard de la sección 10 y las preguntas de 11.2 siguen esperando la decisión de runkor (tarea C).

---

## 1. Identidad: Speaker Elves no es Cradle Control

- **Speaker Elves genera más maná y más rápido.** Por eso intenta el Natural Order de turno 2 (y las líneas explosivas de turno 2) más a menudo que Cradle Control. *Fuente:* runkor. **Settled.**
- **Su plan midrange es algo peor.** Cradle Control convierte el acceso a tierras (Reclaimer, Wight, Talon Gates) en una partida larga muy sólida; Speaker Elves, cuando la partida se alarga, juega peor ese partido. No hay que forzar el juego lento si el rápido sigue disponible. *Fuente:* runkor; comparado con el documento de Curran Delahanty. **Settled.**
- **Las heurísticas de Cradle Control no se copian sin más.** Cradle Control trabaja con "cartas que sean buenas por sí solas" (Curran); Speaker Elves es un motor de sinergias (Speaker, Symbiote, Sabertooth, Cub, Quirion). Un consejo de Cradle Control vale aquí solo si sobrevive a esa diferencia.
- **Cuándo no aplica:** contra rivales que castigan el turno 2 explosivo (Force of Will con Daze en mano, sweepers rápidos), el plan midrange vuelve a ser el bueno aunque sea peor.

## 2. Mulligan y primeros turnos

- **El recuadro de probabilidades da contexto, no reglas de keep.** Fuente verde para el turno 1, acelerador y Once Upon a Time se calculan desde la lista publicada (`js/12.js`). **Settled.**
- **Once Upon a Time nunca se saca en el sideboard.** Es la carta que encuentra lo que falta del opening; Curran también la valora más cuanto menos se juega Glimpse. *Fuente:* runkor (8 Oct 2026). **Settled.**
- **Un primer turno funcional es lo que deja a Cradle subir el techo.** El mazo se construye bajo (19 tierras, 6 dorks). **Settled.**
- **Pendiente:** estudios de keep-or-mull con manos reales (tarea G).

## 3. Motor y combo

- **Cuenta Cradle después de pagar el bounce.** Una Cradle con earthbend se cuenta a sí misma y tiene prisa; el earthbend no la endereza. Con Symbiote devolviendo a Speaker, cuenta las criaturas que quedan y suma el extra de Cub. **Settled.**
- **Presupuesto de mano distinto en play y draw.** Turn-2 Sabertooth kill: en el play hace falta Quirion en mano, dos Symbiotes y tres descartes (incluido el Forest recuperado); sin Quirion la línea solo sale en el draw (una carta más). Una carta buscada no es descarte gratis. **Settled** (comprobado en el Goldfish Lab).
- **El ETB final de Speaker es la excepción.** En el loop se rechaza el descarte; solo al final se deja el ETB en la pila, se devuelve Speaker con Sabertooth y se descarta ese mismo Speaker para buscar Craterhoof. **Settled.**
- **Symbiote devuelve a Speaker para hacer crecer el tablero** (otra búsqueda); un Elfo de un maná solo cuando ya tienes la forma de matar y falta maná (+4 por ciclo en vez de +2). **Settled** (runkor).
- **Un Quirion sin usar se activa siempre sobre Cradle** si Cub la ha hecho criatura; el Forest devuelto pasa a ser descarte. **Settled.**
- **Craterhoof no siempre es letal.** En turno 2 con Natural Order solo ataca Craterhoof (7–9 de daño); por eso Natural Order de turno 2 busca Atraxa por defecto. **Settled** (runkor; Goldfish Lab).

## 4. Natural Order

- **En turno 2 suele ir a Atraxa**, que recarga la mano, salvo que el tablero haga letal a Craterhoof. **Settled.**
- **Contra counters es una carta arriesgada.** Convertir Force of Will en un 1 por 1, o comerse un Daze, es mal negocio. Curran saca los tres Natural Order, Atraxa y Craterhoof contra Rescaminator y Delver. Nuestros planes contra tempo sacan menos. **Under test** (revisar en la tarea C).
- **La criatura que sacrificas no vuelve en todo el turno:** una menos para Cradle y para el +X/+X de Craterhoof. **Settled.**
- **Allosaurus Shepherd hace que tus hechizos verdes no se puedan contrarrestar**, Natural Order incluido; sacrificar el Shepherd a Natural Order deja el hechizo contrarrestable. **Settled.**

## 5. Sideboard

- **Empieza por la fila del matchup**, no por un número fijo de cambios. Los cambios grandes son transformaciones deliberadas. **Settled.**
- **Conserva el motor:** suficiente maná y criaturas para que Cradle funcione; Speaker forma parte del motor del loop. **Settled.**
- **Vibrance vale más cuando el rival ataca el maná** (Wasteland, Moon); su modo verde busca Boseiju y el rojo quita una criatura pequeña. **Settled.**
- **Marwyn protege las tierras** de efectos con objetivo (Wasteland incluido), no de Blood Moon. **Settled.**
- **Los sweepers cambian cuánto te expones:** revisa el aviso de la fila antes de bajar la cuarta o quinta criatura. **Settled.**
- **Cada odio a cementerio hace un trabajo distinto:** Leyline en la mano inicial; Thoughtseize cubre planes que no pasan por el cementerio. **Settled.**
- **Menos copias de Leyline pueden ser mejores** si el resto del mazo tiene otra disrupción, porque cuesta más jugar alrededor (Curran). La lista del 5 Oct lleva tres. **Under test** (tarea C).
- **Contra Red Stompy**, Curran saca las cuatro Endurance (por Broadside Bombardiers) y propone Dismember para Magus of the Moon. **Under test** (tarea C).
- **Snuff Out solo apunta a criaturas no negras.** Quitar Oracle en respuesta reduce devoción, pero no para una victoria con biblioteca vacía. **Settled.**
- **Assassin's Trophy da una tierra básica al rival:** pésalo contra su maná. Primaris Eliminator es negro (no lo busca GSZ, sí Speaker). **Settled.**

## 6. Maná

- **19 tierras, 7 fetchlands, 2 Boseiju.** Boseiju es maná verde inmediato pero no es Forest para Quirion; las copias extra valen más para el channel. La lista del 5 Oct probó un tercer Boseiju por la segunda Windswept Heath (más valor de Marwyn desde el principio); la conclusión fue que no compensa: con menos Forests en juego Quirion Ranger pierde valor. El 8 Oct vuelve la segunda Heath. *Fuente:* runkor (8 Oct 2026). **Settled.**
- **Sin Savannah ni tipo Plains**, para no regalar un Massacre gratis a los mazos UB. **Settled.**

## 7. Interacción del rival

- **Expón primero las amenazas menores** para que el rival gaste ahí su removal (Curran: Reclaimer en Cradle Control). En Speaker Elves, el equivalente se decide en Interaction Windows. **Working range.**
- **Las ventanas de interacción están en la guía** (`#windows`): qué para cada línea, qué la frena y qué le sobra al rival.

## 8. Evidencia

- **Pesa el razonamiento de pilotos con experiencia** y tu propio testing. Copias repetidas de una lista no son acuerdos independientes. **Settled.**
- **La cuota del metajuego mide popularidad, no win rate.** **Settled.**
- **Sin fuente, se dice con palabras en la guía** ("not yet confirmed") y se anota como Unverified aquí y en ROADMAP.md. La guía ya no muestra etiquetas (runkor, 9 Oct 2026).

## 9. Ideas abiertas

- Underground Mortuary: el surveil ayuda, pero entra girada y retrasa el dork de turno 1 o el Speaker de turno 2. Caller of the Claw: candidata. Elvish Visionary: carta flex para un juego más grindy; no todas las listas la juegan.
- Las ideas de sideboard de Curran (arriba, **Under test**) y las preguntas de Newton Hang (sección 11.2) se deciden en la revisión del sideboard (tarea C).

---

## 10. Guías de sideboard de referencia

Material de consulta para hacer y revisar el mapa del sideboard (tarea C). No son nuestros planes: se comparan con ellos y con nuestra lista antes de copiar nada.

### "Sabertooth Elves aka Badger Ball Z · Sideboard Guide", de j-off (PDF aportado por runkor, 8 Oct 2026)

- **Fecha:** "10/02/2026". Probablemente formato de EE. UU., es decir 2 Oct 2026: la lista todavía juega Eladamri, Endurance, Elvish Visionary, Grist y Force of Vigor, como nuestra lista del 29 Sep (antes de los cambios del 3 y el 5 Oct). **Autor:** j-off (del Discord), según runkor.
- **Su pool de sideboard:** 4 Thoughtseize, 3 Leyline of the Void, 3 Force of Vigor, Snuff Out (hasta 2), Grist, the Hunger Tide, Assassin's Trophy, Choke. **Cartas del main que saca:** Quirion Ranger, Wirewood Symbiote, Allosaurus Shepherd, Collector Ouphe, Eladamri, Endurance, Formidable Speaker, Elvish Visionary, Temur Sabertooth, Badgermole Cub, Natural Order, Atraxa.

| Matchup | Entra | Sale |
|---|---|---|
| UB Tempo (Moonshadow) | +3 Leyline of the Void, +1 Grist, +1 Assassin's Trophy, +1 Choke | −2 Formidable Speaker, −1 Collector Ouphe, −1 Elvish Visionary, −1 Temur Sabertooth, −1 Quirion Ranger |
| Eldrazi | +2 Snuff Out, +1 Grist, +1 Assassin's Trophy | −1 Endurance, −1 Collector Ouphe, −1 Quirion Ranger, −1 Wirewood Symbiote |
| Energy | +2 Snuff Out, +1 Grist, +1 Assassin's Trophy | −2 Allosaurus Shepherd, −1 Endurance, −1 Collector Ouphe |
| Death & Taxes | +2 Snuff Out, +1 Grist, +1 Assassin's Trophy | −2 Allosaurus Shepherd, −1 Endurance, −1 Eladamri |
| Doomsday | +4 Thoughtseize, +1 Choke, +1 Assassin's Trophy | −2 Quirion Ranger, −2 Wirewood Symbiote |
| Tron | +1 Assassin's Trophy, +1 Grist | −1 Eladamri, −1 Wirewood Symbiote |
| UR Delver | +2 Snuff Out, +1 Assassin's Trophy | −1 Collector Ouphe, −1 Eladamri, −1 Formidable Speaker |
| Welder-Cam Combo | +3 Leyline of the Void, +2 Snuff Out, +1 Assassin's Trophy | −2 Allosaurus Shepherd, −2 Quirion Ranger, −1 Wirewood Symbiote, −1 Eladamri |
| AlurenTell | +4 Thoughtseize, +3 Force of Vigor, +1 Choke, +1 Grist | −3 Quirion Ranger, −2 Wirewood Symbiote, −1 Endurance, −1 Eladamri, −1 Collector Ouphe, −1 Badgermole Cub |
| Beanstalk Control | +4 Thoughtseize, +1 Choke | −2 Quirion Ranger, −1 Endurance, −1 Collector Ouphe, −1 Badgermole Cub |
| Lands | +3 Force of Vigor, +3 Leyline of the Void, +1 Assassin's Trophy | −3 Allosaurus Shepherd, −2 Wirewood Symbiote, −1 Eladamri, −1 Formidable Speaker |
| Reanimator | +4 Thoughtseize, +3 Leyline of the Void, +1 Grist | −2 Quirion Ranger, −2 Wirewood Symbiote, −2 Allosaurus Shepherd, −1 Collector Ouphe, −1 Eladamri |
| UW Phelia | +4 Thoughtseize, +2 Snuff Out, +1 Assassin's Trophy, +1 Choke, +1 Grist | −3 Natural Order, −1 Collector Ouphe, −1 Quirion Ranger, −1 Badgermole Cub, −1 Eladamri, −1 Endurance, −1 Atraxa |

**Qué se deduce, para usarlo al mapear** (todo **Under test** hasta la tarea C):

- **Once Upon a Time no sale nunca**, igual que nuestra regla.
- **Natural Order solo sale contra UW Phelia** (−3 Natural Order, −1 Atraxa). Contra UB Tempo y UR Delver se queda; Curran, en cambio, lo saca contra mazos con counters. Dos criterios distintos que hay que decidir.
- **Quirion Ranger y Wirewood Symbiote son los primeros recortes contra combo y control** (Doomsday, AlurenTell, Beanstalk, Reanimator, Welder-Cam): el loop pierde valor cuando el rival no interactúa con criaturas o va más rápido.
- **Allosaurus Shepherd sale contra mazos justos de criaturas** sin counters relevantes (Energy, Death & Taxes, Lands, Welder-Cam, Reanimator).
- **Collector Ouphe sale casi siempre** salvo donde para algo concreto (Tron, Lands, Doomsday no lo sacan).
- **Formidable Speaker solo sale contra tempo y Lands** (UB Tempo −2, UR Delver −1, Lands −1).
- **Grist y Assassin's Trophy son los comodines** contra casi todo lo justo; Choke contra azul; Force of Vigor contra Lands y AlurenTell.
- **Traducción a nuestra lista del 5 Oct:** no tenemos Eladamri, Endurance, Elvish Visionary, Grist ni Force of Vigor. Donde la guía saca Eladamri, Endurance o Visionary hay que elegir otro recorte; donde mete Grist o Force of Vigor, nuestro equivalente es Assassin's Trophy, Primaris Eliminator o Snuff Out según el objetivo. Se decide en la tarea C, igual que la capa de conversión de `js/01.js`.
- **Ya aplicado:** Sneak & Show usa la fila AlurenTell traducida (+4 Thoughtseize, +2 Choke, +1 Assassin's Trophy / −3 Quirion Ranger, −2 Wirewood Symbiote, −1 Collector Ouphe, −1 Badgermole Cub).
- **Matchups que la guía cubre y nuestro mapa no:** UW Phelia, AlurenTell (nuestro mapa tiene Aluren), Tron (genérico), UR Delver (nuestro UR Cutter / Izzet Tempo).

### Matriz de sideboard de una lista de Cradle Control (captura aportada por runkor, 9 Oct 2026)

**Otro mazo, ideas para el nuestro.** Es una lista de la familia Cradle Control (autor no indicado en la captura): 8 Hierarch / Birds of Paradise, 2 Sylvan Safekeeper, 4 Wight of the Reliquary, 4 Carnivorous Cultivator, 3 Elvish Spirit Guide, 1 "Mole Man" (probablemente Badgermole Cub), 1 Hogaak ("Gaak"), 4 Thoughtseize de main, 3 Natural Order, 1 Atraxa, 1 Wasteland, 1 Bojuka Bog, 1 Talon Gates, 21 tierras. Sideboard (15): 1 Gaddock Teeg, 1 Terastodon, 1 Assassin's Trophy, 3 Damping Sphere, 3 Leyline of the Void, 1 Duress, 1 The Tabernacle at Pendrell Vale, 4 Snuff Out.

Transcrita de la captura y comprobada con su fila "Card Count" (entra = sale): cuadran 27 de 28 matchups; en Necrodominance falta una carta de entrada que no se lee bien (**dudoso**). Rol: C = control, B = beatdown, según la hoja.

| Matchup | Rol | Entra | Sale |
|---|---|---|---|
| UB Moonshadow | C | +3 Leyline, +1 Trophy | −4 Thoughtseize |
| UB Legends | C | +4 Snuff Out, +1 Trophy | −4 Thoughtseize, −1 Bog |
| UR Cutter | C | +4 Snuff Out, +1 Tabernacle | −4 Thoughtseize, −1 Bog |
| BG Gaak | C | +3 Leyline, +1 Tabernacle | −4 Thoughtseize |
| UW Stiflenought | C | +4 Snuff Out, +1 Trophy | −4 Thoughtseize, −1 Bog |
| Yorion WB Taxes | B | +2 Snuff Out | −1 Hogaak, −1 Bog |
| 5C Beanstalk | B | +1 Duress | −1 Bog |
| UWr Stoneblade | B | +1 Duress | −1 Bog |
| Blue Tron | B | +3 Damping Sphere, +1 Teeg, +1 Terastodon, +1 Trophy, +1 Duress | −3 Wight, −1 Hogaak, −1 Atraxa, −1 Bog, −1 Talon Gates |
| Gx Lands | C | +3 Leyline, +1 Trophy | −4 Thoughtseize |
| 8 Moon | C | +4 Snuff Out, +1 Trophy | −4 Thoughtseize, −1 Bog |
| Eldrazi | C | +4 Snuff Out, +1 Trophy | −4 Thoughtseize, −1 Bog |
| WR Initiative | C | +4 Snuff Out, +1 Trophy | −4 Thoughtseize, −1 Bog |
| Affinity | C | +4 Snuff Out, +1 Trophy, +1 Tabernacle | −4 Thoughtseize, −1 Bog, −1 Talon Gates |
| Mono-B Reanimator | C | +3 Leyline, +1 Trophy, +1 Duress | −3 Natural Order, −1 Atraxa, −1 Hogaak |
| UB Reanimator | C | +3 Leyline, +1 Trophy | −3 Natural Order, −1 Atraxa |
| Oops All Spells | C | +3 Leyline, +3 Damping Sphere, +1 Teeg, +1 Trophy, +1 Duress | −3 Natural Order, −2 Safekeeper, −1 Atraxa, −1 Mole Man, −1 Hogaak, −1 Talon Gates |
| Cephalid Breakfast | C | +4 Snuff Out | −3 Natural Order, −1 Atraxa |
| Sneak & Show | B | +1 Teeg, +1 Terastodon, +1 Duress | −2 Safekeeper, −1 Bog |
| OmniTell | B | +3 Damping Sphere, +1 Terastodon, +1 Trophy, +1 Duress | −2 Safekeeper, −1 Hierarch, −1 Mole Man, −1 Hogaak, −1 Bog |
| Aluren Tell | B | +3 Damping Sphere, +1 Teeg, +1 Terastodon, +1 Trophy, +1 Duress | −2 Hierarch, −2 Safekeeper, −1 Mole Man, −1 Hogaak, −1 Bog |
| Necrodominance | B | +3 Damping Sphere, +1 Teeg, +1 Trophy, +1 Duress (+1 sin leer) | −2 Wight, −1 Mole Man, −1 Hogaak, −1 Atraxa, −1 Bog, −1 Talon Gates |
| Doomsday | B | +1 Damping Sphere, +1 Trophy, +1 Duress | −1 Mole Man, −1 Atraxa, −1 Bog |
| TES | B | +3 Leyline, +3 Damping Sphere, +1 Teeg, +1 Terastodon, +1 Duress, +1 Tabernacle | −4 Wight, −1 Hierarch, −1 Mole Man, −1 Hogaak, −1 Atraxa, −1 Bog, −1 Talon Gates |
| WRx Energy | C | +4 Snuff Out, +1 Trophy, +1 Tabernacle | −4 Thoughtseize, −1 Hogaak, −1 Bog |
| Elves | — | +4 Snuff Out, +3 Damping Sphere, +1 Tabernacle | −4 Carnivorous Cultivator, −1 Mole Man, −1 Hogaak, −1 Bog, −1 Talon Gates |
| Key Ring | B | +3 Damping Sphere, +1 Teeg, +1 Terastodon, +1 Trophy, +1 Duress, +1 Tabernacle | −4 Wight, −1 Hogaak, −1 Atraxa, −1 Bog, −1 Talon Gates |
| Welder Cam | B | +3 Leyline, +4 Snuff Out | −4 Thoughtseize, −1 Mole Man, −1 Hogaak, −1 Talon Gates |

**Lo que se aprende, razonado** (todo **Under test** para nuestra lista; se decide en la tarea C):

- **Cuándo entra Leyline of the Void (la pregunta de runkor).** Siempre las tres copias, y solo contra mazos cuyo plan vive en el cementerio: Reanimator (los dos), Oops All Spells, TES, Welder Cam, Gx Lands (Life from the Loam), BG Gaak y UB Moonshadow (sus amenazas crecen o se pagan con el cementerio). **No** entra contra Doomsday, Cephalid Breakfast, Sneak & Show, OmniTell ni Aluren: ahí el problema no es el cementerio, y prefieren discard, Damping Sphere o removal. La guía de j-off coincide en UB Tempo (Moonshadow), Welder-Cam, Lands y Reanimator. **Dos fuentes de acuerdo en UB Moonshadow con Leyline**: nuestro plan actual mete Choke y Primaris; candidata clara para la revisión.
- **Thoughtseize de main sale contra todo lo justo** (tempo, Moon, Eldrazi, Initiative, Energy, Lands, Affinity) y se queda contra combo y control. Nosotros lo tenemos en el sideboard: es el mismo criterio visto al revés (entra contra combo, no contra justos).
- **Natural Order y Atraxa salen contra Reanimator, Oops y Cephalid**, es decir, contra combo rápido o mazos que castigan el plan lento o que pueden usar nuestras criaturas grandes. Contra counters (Moonshadow, Legends, Cutter, Stiflenought) **Natural Order se queda**: coincide con j-off y contradice a Curran. Dos de tres fuentes lo mantienen.
- **Hate de combo por ejes:** Damping Sphere contra los mazos de muchos hechizos por turno o de maná rápido (Tron, Oops, OmniTell, Aluren Tell, Necrodominance, TES, Key Ring y el espejo de Elves); Teeg y Terastodon contra combo de permanentes y Tron; Duress como discard barato contra combo y control. Nuestro sideboard no tiene ninguno de los tres ejes salvo Thoughtseize: ideas para el Maybeboard y la tarea C.
- **Snuff Out siempre en bloque de 4** contra tempo, aggro y Moon; **Assassin's Trophy como comodín** (una copia casi en todo). Coincide con j-off (Trophy en casi todos los matchups).
- **Las piezas de valor salen contra combo:** Safekeeper, Hierarch, Mole Man, Hogaak y Talon Gates salen contra combo rápido; Wight sale contra Tron, TES y Key Ring (no hay tiempo para crecer). En nuestra lista el equivalente sería recortar la parte lenta (Sabertooth, Ouphe, Vibrance) contra combo.
- **Contra el espejo de Elves** sale su Carnivorous Cultivator y entran Snuff Out, Damping Sphere y Tabernacle. Útil para saber qué esperar de un Cradle Control que juega contra nosotros: Snuff Out a los dorks y a Speaker, Damping Sphere contra el turno de muchos hechizos y Tabernacle contra el tablero ancho.
- **Rol control frente a beatdown:** se ponen de control contra tempo y aggro, y de beatdown contra combo, ramp y control. Encaja con nuestra columna de rol (Slow / Control / Turbo) y con LEGACY.md, sección 1.

---

## 11. Base de conocimiento: artículos de Newton Hang (2021–2023)

Carpeta local `Legacy Knowledbase/` (15 PDF aportados por runkor el 9 Oct 2026; fuera de git y de Vercel). Todos son de **Newton Hang** (MTGO: hellonewton; @hello_newton), el piloto que más ha empujado Reclaimer Elves / Cradle Control. **Ojo al contexto:** escribe para Elves de Glimpse of Nature y Elvish Reclaimer (2021–2022) y para Cradle Control (2023), con 21–23 tierras. Speaker Elves es otro mazo (sección 1): lo que sigue se adapta, no se copia.

| Fecha | Artículo | Tema |
|---|---|---|
| 1 Nov 2021 | Constructing a Cohesive Sideboard | El sideboard tapa las debilidades del main, no "el metajuego" |
| 9 Nov 2021 | Sideboarding Heuristics | Quién es el beatdown y qué sacar por arquetipo |
| 24 Nov 2021 | Non-Gameplay Practices | Preparación, mapa de sideboard previo, descanso |
| 6 Dec 2021 | Flipping a Matchup Profile | Cómo dio la vuelta a Doomsday (Shepherd + Trophy/Endurance) |
| 21 Dec 2021 | Macro-Level Game-Planning | Elves contra UR Delver/Murktide |
| 4 Jan 2022 | 2022 New Year's Resolution | Hábitos (no táctico) |
| 1 Mar 2022 | Boseiju Priority Targets | A qué apuntar con Boseiju por matchup |
| 26 Apr 2022 | 2022 Reclaimer Elves FAQ | 21 tierras, Snuff Out, 0 Quirion, criterio de flex |
| 10 May 2022 | Through the Looking Glass | Entrevista: Elves contra TES |
| 25 May 2022 | Adapting Ideas from Similar Archetypes | Sylvan Syndicate, Golgari combo, tribales |
| 19 Jul 2022 | Elf Sequencing 101, part 1 | Turnos 0 y 1 |
| 16 Aug 2022 | Elf Sequencing 101, part 2 | Turno 2 y orden de jugadas |
| 28 Mar 2023 | The Art of Artisan Deckbuilding | Fiend Artisan, toolbox, removal eficiente |
| 4 Jul 2023 | Cradle Control Mana Base | Mínimos de la base de maná (23 tierras, 14 IMS) |
| 26 Oct 2023 | Cradle Control: Flex Mana Acceleration | Fetch frente a Gemstone Caverns, Elvish Spirit Guide y Chrome Mox |

### 11.1 Heurísticas que aportan (adaptadas a Speaker Elves)

**Construcción**
- **El sideboard es parte de los 75:** se eligen 15 cartas para tapar las debilidades propias, no para "responder al metajuego" con odio genérico. Elves ya va bien contra el azul justo, así que Newton deja fuera Choke y Carpet of Flowers. *(Cohesive Sideboard.)* **Under test** para nosotros: ver 11.2.
- **Criterio de flex slot:** *impacto* (gana partidas solo en un puñado de matchups relevantes) y *suelo* (vivo en la mayoría y nunca la causa de perder un game 1). *(FAQ 2022.)* Encaja con nuestra caja "Main-deck flex" de Deck Construction.
- **No sobrecargar el toolbox:** con muchos tutores, solo balas que ganan la partida solas (Ouphe, Opposition Agent) o quitan un permanente problemático contra buena parte del campo. Que exista un jugador de Goblins no justifica un Tivadar. *(Artisan.)*
- **Removal eficiente mejor que flexible** cuando el plan es de tempo y criaturas: Snuff Out o Swords antes que Trophy o Decay; demasiados hechizos no-criatura bajan el valor de Cradle y de Once Upon a Time. *(Artisan, FAQ.)*
- **Boseiju es el sucesor de Abrupt Decay y Trophy:** con 2–3 Boseiju de main, Trophy deja de ser obligatorio y Snuff Out pasa a ser el removal negro de cabecera. *(FAQ, Boseiju.)*
- **Seis dorks es el punto dulce** de los mazos de Cradle (rango 4–8), porque Green Sun's Zenith por Dryad Arbor suma cuatro copias virtuales. *(Artisan.)* Coincide con nuestra lista.
- **Escala de aceleración extra**, de conservadora a agresiva: fetch extra → Gemstone Caverns → Elvish Spirit Guide → Chrome Mox. Spirit Guide es información oculta (castiga Daze) y una criatura más para Cradle y Craterhoof; Chrome Mox es siempre desventaja de cartas, choca con Collector Ouphe y dos copias suelen ser mulligan. *(Flex Mana.)*

**Sideboarding por rol** *(Sideboarding Heuristics, Macro-Level)*
- **Quién es el beatdown:** Elves es el beatdown contra combo y contra midrange/control; el tempo (UR Delver, Stifle) y la prisión (Stompy, Death & Taxes) son el beatdown contra Elves.
- **Contra tempo azul:** sacar lo caro (el paquete de Natural Order) para no quedarse atrás con Daze y Wasteland; meter removal y bloqueadores; los 60 de después deben tener robos vivos siempre. Lo que pierde la partida es un Murktide temprano: guardar el mejor removal para el dragón y cortar el delve (Endurance, Bojuka Bog).
- **Contra Stompy (Chalice, Trinisphere, Moon):** meter respuestas a las piezas de bloqueo; **Natural Order no es un problema ahí** y cierra la partida; sacar lo grindy (Symbiote, que además muere a Chalice en 1).
- **Contra combo rápido:** somos el beatdown; meter disrupción (discard, Leyline, odio a hechizos) y sacar el motor grindy (Symbiote, Visionary); no "carrerear" a TES: una o dos piezas de disrupción y luego bloqueo o kill, comprometiendo criaturas. Contra TES, Bojuka Bog y Endurance no sirven y Leyline solo si faltan cartas relevantes; en Golgari, Mindbreak Trap es el mejor odio contra Storm.
- **Contra control azul:** Elves va de favorito; cortar lo que invita a sobreextender frente a los sweepers; Thoughtseize es seguro.
- **Densidad de discard:** con Veil of Summer en el formato, 4–6 descartes en total; aun así, se meten todos contra combo porque importa la densidad de cartas relevantes.
- **Leyline of the Void es "el Force of Will de los mazos no azules":** gratis y difícil de responder (sus respuestas no son las del resto del mazo). Endurance permitió bajar de 4 a 2–3 Leyline, pero **no la sustituye**: Endurance es fácil de responder (Chancellor, discard).

**Secuenciación** *(Elf Sequencing 101, partes 1 y 2)*
- **Turno 0:** no pasar prioridad en automático (oculta información y deja jugar Endurance con flash); Once Upon a Time en respuesta a un discard si hace falta tierra; no lanzar Once Upon a Time "para jugar alrededor de Daze".
- **Turno 1, tierra:** ante la duda, Forest antes que fetch y Forest antes que Bayou; fetch primero contra Lightning Bolt, contra "no puedes buscar" (Opposition Agent) y contra Moon (para tener dos básicas). Si no necesitas tierra, rompe la fetch antes de Once Upon a Time para no ver la tierra que ibas a buscar.
- **La mayoría de partidas se pierden en el turno 2** por el orden de jugadas. Contra Daze: tierra primero si solo te quedarían dos manás; si el Elfo es irrelevante, tantea Daze o Force antes de la tierra. Abre con Allosaurus Shepherd para apagar los counters.
- **Orden de cebos contra removal:** el Elfo de un maná redundante primero, las piezas importantes al final. Ante la duda, haz el máximo de maná.
- **Tierras que no dan maná ese turno (Dryad Arbor):** al final, después de los hechizos, salvo que Cradle necesite la criatura.

**Base de maná** *(Cradle Control Mana Base)*: 23 tierras, 14 fuentes verdes iniciales (IMS), 12 "Swamps virtuales" (Bayou y fetches), 1 Forest básico, 4 Cradle, 2 Dryad Arbor (solo si hay Natural Order), 1 Bojuka Bog, 2 flex y 3 Once Upon a Time.

### 11.2 Contraste con nuestra guía y nuestros planes

**Coincide (refuerza lo que tenemos):**
- **Quirion y Boseiju no conviven bien:** Newton jugó 0 Quirion porque no puede devolver 2–3 Boseiju; nosotros quitamos el tercer Boseiju para no perder valor de Quirion. El mismo conflicto, resuelto al revés según el motor de cada mazo (sección 6).
- **Seis dorks**, **Once Upon a Time como pilar de consistencia** y **Leyline solo contra cementerio** (nuestro plan contra TES no la mete; él tampoco).
- **Contra combo se recorta el motor grindy:** nuestros planes de Doomsday, Sneak & Show y Reanimator sacan Symbiote, Quirion o Speaker, como Newton y j-off.
- **"Cartas buenas por sí solas" (Curran) = diseño "FIRE" de Newton:** confirma la sección 1: es la filosofía de Cradle Control, no la nuestra.
- **Construcción baja:** 19 tierras y 13 fuentes verdes de turno 1 frente a sus 21–23 tierras y 14 IMS. Es la diferencia de identidad de la sección 1 (más rápido, menos midrange), no una incoherencia.

**Choca o abre preguntas (para la tarea C, sin aplicar):**
1. **Choke.** Lo metemos contra UB Moonshadow, UR Cutter, Beanstalk, Jeskai, Doomsday y Sneak & Show. Newton lo deja fuera por principio (Elves ya gana al azul justo), y la tarjeta "Discard is part of the plan" de Heuristics lo da por bueno. **Pregunta:** ¿Choke tapa una debilidad nuestra o es odio genérico? Speaker Elves es más combo que su Elves, así que puede que sí lo necesite; decidirlo con testing.
2. **Natural Order contra tempo azul.** Ahora hay **dos fuentes contra dos**: Newton y Curran lo sacan; j-off y la matriz de Cradle Control lo mantienen. Nuestros planes: UR Cutter saca uno, UB Moonshadow ninguno. La sección 1 (intentamos más el Natural Order de turno 2) apoya mantenerlo; Newton escribía para un Elves con Visionary que ganaba la partida larga. Sigue **Under test**.
3. **Natural Order contra Stompy y Moon.** Newton lo **mantiene** (cierra la partida tras la pieza de bloqueo) y saca Symbiote. Nuestro plan contra Mono Red **saca** Natural Order y Sabertooth. Contradicción directa: revisar.
4. **Doomsday.** Newton dio la vuelta al matchup con un "A + B": Allosaurus Shepherd o GSZ (A) más Assassin's Trophy a la Underground Sea o Endurance (B). j-off también mete Trophy. Nuestro plan mete 4 Thoughtseize y 2 Choke y **ninguna** Trophy, aunque tenemos dos. Candidato claro: +1 o +2 Trophy contra Doomsday.
5. **Leyline sin Endurance.** Newton bajó a 2–3 Leyline **porque** tenía Endurance. Nuestra lista del 5 Oct juega 3 Leyline y 0 Endurance (salió del main). Con su lógica, o volvemos a 4 Leyline o recuperamos Endurance como flex. La idea de Curran ("menos Leyline si hay otra disrupción", sección 5) apunta a lo mismo: depende de tener esa otra disrupción.
6. **Mindbreak Trap contra TES.** Para Newton, el mejor odio a Storm en Golgari. No está en nuestro sideboard; nuestro plan contra TES es 4 Thoughtseize y 1 Trophy. Idea para la tarea C y el Maybeboard.
7. **Snuff Out frente a Trophy.** Newton pasó a Snuff Out como removal principal al jugar Boseiju de main. Nosotros tenemos 3 Snuff Out, 2 Trophy y 2 Boseiju: ya bastante alineado; la pregunta es si la segunda Trophy compensa frente a una cuarta Snuff Out.

**Huecos de la guía que estos artículos llenarían (propuestas):**
- **First Turns** es corto. Las reglas de secuenciación de Newton (turno 0, elección de tierra, orden contra Daze, Shepherd primero contra counters, Dryad Arbor al final) se pueden adaptar a Speaker Elves (sin Glimpse, Reclaimer ni Heritage Druid; con Cub, Cradle y Speaker). Encaja en la tarea N parte 1 y en J.
- **Heuristics no tiene el marco de rol** (quién es el beatdown), aunque el Sideboard map ya usa Turbo, Slow y Control. Una tarjeta "Who is the beatdown" lo explicaría.
- **El criterio de flex (impacto y suelo)** cabe en Deck Construction, en la caja de "Main-deck flex".
- **Maybeboard:** Gemstone Caverns, Elvish Spirit Guide y Chrome Mox (con los pros y contras de Newton), Mindbreak Trap, Fatal Push, Swords to Plowshares, Progenitus, Archon of Valor's Reach y Crop Rotation tienen ya razonamiento publicado. Varios están en el Maybeboard con "Unverified": estos artículos sirven de fuente para la tarea W.
- **Deck Origins:** Newton aparece ya; estos artículos documentan su versión 2021–2023 (Reclaimer, 21 tierras, 0 Quirion, Fiend Artisan de 2022 con Curran) y pueden citarse como fuente primaria.

### 11.3 Decisiones de runkor sobre el contraste (9 Oct 2026)

Los artículos son de 2021–2023 y el formato ha cambiado desde entonces: se leen como antecedente, no como regla.

- **Quirion Ranger es core y se queda.** Sin Boseiju extra, Quirion vale más; que Newton jugara 0 Quirion responde a su mazo, no al nuestro. **Settled.**
- **Tierras:** la diferencia con Cradle Control (21–23) viene de que su lista lleva buscadores de tierras y utility lands; la nuestra no. runkor valoró subir a 20 tierras; **decidido el 9 Oct 2026: se queda en 19 por ahora.**
- **Choke se queda contra azul.** Choke es verde: con Allosaurus Shepherd en juego no se puede contrarrestar, así que Shepherd y después Choke dejan al azul sin Islands y sin objetivo para Force of Will o Daze. Publicado en Heuristics. **Settled.**
- **Natural Order contra tempo azul se queda.** Como mucho se saca una copia, porque varias en mano son un mal robo; el mazo depende demasiado de ellas para sacarlas todas. **Settled.**
- **Natural Order contra Stompy / Moon: se guardan todas.** Aplicado el 9 Oct 2026: el plan de Mono Red pasa a +3 Snuff Out, +1 Assassin's Trophy / −1 Temur Sabertooth, −1 Vibrance, −1 Wirewood Symbiote, −1 Marwyn (sale un Symbiote en vez de un Natural Order). **Settled.**
- **Doomsday hay que revisarlo:** el matchup ha cambiado desde 2021. Propuesta de runkor: sacar el paquete de Natural Order y meter toda la interacción (Assassin's Trophy, Snuff Out, Thoughtseize), **dejando al menos Craterhoof**, con entradas y salidas cuadradas. Pendiente de aprobar el plan concreto (tarea C).
- **Leyline y Endurance:** aparcado (9 Oct 2026): no hay hueco en el main para Endurance ahora mismo. Se quedan las tres Leyline en el sideboard.
- **Mindbreak Trap: solo para la versión Mono-Green.** Si jugamos negro, Thoughtseize al 100 %: ahora mismo está muy bien posicionado. **Settled.**
- **Huecos aprobados y publicados:** secuenciación (desde el 9 Oct por la tarde, sección propia "Sequencing" en Gameplay; First Turns enlaza a ella), tarjeta "Who is the beatdown?" en Heuristics, criterio de flex (impacto y suelo) en Deck Construction y la importancia de los turnos 1 y 2 al principio de Interaction Windows. Los artículos se citan en Credits. Pendiente: usar los artículos como fuente para los borradores del Maybeboard (tarea W).

---

## 12. Once Upon a Time en números

Fuente: Tanner Bromer, "Mathed Up: Once Upon A Time", Good Grief Games, 7 Oct 2019 (https://goodgriefgames.wordpress.com/2019/10/07/mathed-up-once-upon-a-time/). Añadida por runkor el 9 Oct 2026. Es un análisis genérico para mazos de 60 cartas (Standard y Modern), no de Elves: biblioteca completa de 60, sin contar la mano.

**Sus cifras:**
- Al menos una Once Upon a Time en la mano inicial de 7: 4 copias 39,95 %, **3 copias 31,54 %**, 2 copias 22,15 %, 1 copia 11,67 %.
- Aciertos medios por lanzamiento (tierras + criaturas en las 5 cartas): 30 → 2,50; 40 → 3,33; 50 → 4,13.
- Encontrar tierra: 18 tierras, 84,4 % (1,58 de media); 24 tierras, 93,1 %.
- Encontrar criatura: 10 criaturas, 61,7 %; 20 criaturas, 88,0 %.
- Conclusión: la mayoría de mazos que la juegan ven 3–4 opciones por lanzamiento; incluso los de pocas tierras encuentran tierra en torno al 85 % de las veces.

**Las mismas cuentas con nuestra lista del 5 Oct** (19 tierras y 31 criaturas del Current 75, con el mismo supuesto de biblioteca de 60; las 2 Dryad Arbor cuentan como tierra):
- 50 de 60 cartas son tierra o criatura: **4,17 opciones de media** por lanzamiento; fallar del todo pasa un 0,005 % de las veces.
- Tierra en las 5 cartas: **86,3 %** (1,58 de media). Criatura: **97,8 %** (2,58 de media).
- Al menos una de nuestras 3 Once Upon a Time: 31,5 % en 7 cartas (en el play) y 35,4 % en 8 (en el draw).

**Qué se deduce:** con 50 objetivos, Once Upon a Time casi nunca falla y casi siempre deja elegir entre tierra y criatura; por eso funciona como "la carta que encuentra la pieza que falta" (sección 2) y no se saca en el sideboard. Con 19 tierras, pedirle tierra concreta falla una de cada siete veces: contar con ella para la tierra del turno 1 es razonable, no seguro. El recuadro de probabilidades de Mulligans (`js/12.js`) ya modela la primera copia como gratis y mirando el top 5. **Settled** como contexto; no cambia ninguna regla.

---

## 13. Base de maná y sideboarding: artículos generales (Karsten, Damo da Rosa)

Añadidos por runkor el 9 Oct 2026. No son de Elves ni de Legacy: son marcos generales que se aplican a nuestra lista con cuidado. Las páginas de TCGplayer cargan el texto con JavaScript; se leyeron en el navegador.

### 13.1 Frank Karsten, "How Many Sources Do You Need to Consistently Cast Your Spells? A 2022 Update" (TCGplayer; actualizado el 13 Feb 2025)

https://www.tcgplayer.com/content/article/How-Many-Sources-Do-You-Need-to-Consistently-Cast-Your-Spells-A-2022-Update/dc23a7d2-0a16-4c0b-ad36-586fcca03ad8/

- **Método:** un hechizo de valor de maná M con N símbolos de un color se lanza "con consistencia" si hay al menos un (89 + M) % de probabilidad de tener N fuentes de ese color en el turno M en el play, condicionado a haber robado M tierras, con mulligan de Londres razonable. Supone 25 tierras en 60 cartas y que solo las tierras dan maná.
- **Tabla de 60 cartas (fuentes del color necesarias):** C (un maná, p. ej. un dork) 14; 1C 13; 2C 12; CC 21; 1CC 18; 2CC 16; 3CC 15; CCC 23.
- **Turno 1:** solo cuentan las fuentes que entran enderezadas; es la restricción más difícil de cumplir. Fetchlands que pueden buscar el color: fuente completa.
- **Dorks:** para hechizos de valor 2 o más, un dork frágil cuenta como **media fuente**, siempre que el mazo lance el dork con consistencia (14 fuentes verdes enderezadas).
- **Cantrips y selección barata:** cuentan como la fracción del mazo que da el color, redondeando hacia abajo (p. ej. 18 de 60 → ~0,25 de fuente).
- **Tierras giradas:** como mucho 3 en un mazo agresivo de 60 con jugadas de un maná.

**Aplicado a Speaker Elves** (19 tierras, no 25: el condicionamiento a "haber robado tierras" cambia, así que son orientaciones):
- **Dork en el turno 1 (C):** Karsten pide 14 fuentes verdes enderezadas; tenemos 13 (sección 2). Estamos una por debajo de su umbral, y lo cubren Once Upon a Time (la primera copia gratis mira 5 cartas: tierra en el 86 % de las veces, sección 12) y Green Sun's Zenith por Dryad Arbor. Es un argumento a favor de la tierra número 20 que runkor dejó aparcada (sección 11.3).
- **Natural Order (2GG = 2CC):** pide 16 fuentes verdes. 13 tierras verdes + 6 dorks × 0,5 = 16, sin contar Cradle ni Cub. Justo en el umbral.
- **Hechizos negros del sideboard** (Thoughtseize B, Assassin's Trophy BG, Primaris): con 2 Bayou + 7 fetchlands tenemos 9 fuentes negras; para un hechizo de un maná negro la tabla pide 14. Nuestro negro es de sideboard y casi nunca hace falta en el turno 1, pero confirma que el negro es un splash ligero. **Ojo:** Snuff Out solo es gratis si controlas un Swamp (Bayou o lo que busque una fetch); la Verge negra no cuenta (13.3).

### 13.2 Frank Karsten, "How Many Surveil Lands Should You Be Playing in Modern MTG?" (TCGplayer; actualizado el 13 Feb 2025)

https://www.tcgplayer.com/content/article/How-Many-Surveil-Lands-Should-You-Be-Playing-in-Modern-MTG/34e0ac98-3ef3-4e13-8ab4-5421124c07c4/

- 5 981 listas de Modern (feb–mar de 2024): más tierras de surveil, más win rate en el conjunto, pero porque los mazos que las aprovechan estaban bien posicionados, no porque sirvan a todos.
- Por mazo: los que gastan todo el maná desde el turno 1 (Izzet Murktide) se quedan en **una**; los que no juegan nada los dos primeros turnos llegan a 3; Yawgmoth, con muchos dorks, puede permitirse 2 porque los dorks dan "aire" a la base de maná. **Un mazo monocolor sin fetchlands no las quiere.**
- La ventaja principal: buscarla con una fetch cuando no necesitas maná enderezado ese turno (filtro gratis).

**Aplicado a nosotros:** es la pregunta de **Underground Mortuary** (sección 9). Es Swamp Forest: se busca con nuestras fetchlands, cuenta como Forest para Quirion y como Swamp para Snuff Out, pero entra girada y retrasa el dork del turno 1 o el Speaker del turno 2. Con el criterio de Karsten, como mucho **una** copia, buscada con una fetch en un turno en que no haga falta el maná. Sigue como idea abierta.

### 13.3 Frank Karsten, "Building Mana Bases with Duskmourn's New Verge Lands" (TCGplayer; actualizado el 13 Feb 2025)

https://www.tcgplayer.com/content/article/Building-Mana-Bases-with-Duskmourn-s-New-Verge-Lands/02256252-047e-458a-92b3-bed999bd3364/

- Las Verge dan un color siempre y el segundo solo si controlas una tierra con cierto tipo básico. Con 8 tierras de ese tipo (fetchlands incluidas), la Verge da el segundo color el 76,7 % de las veces en el turno 3; con 12, el 90,5 %.
- **Nuestra Verge sería Wastewood Verge:** {G} siempre; {B} si controlas un Swamp **o un Forest** (Oracle comprobado en Scryfall). En nuestra lista casi todas las tierras cuentan, así que sería una Bayou que no pierde vida… pero **no es Forest** (Quirion no la devuelve), **no se busca con fetchlands** y **no es Swamp** (no activa Snuff Out). Para nosotros, peor que Bayou. Sin cambio.

### 13.4 Paulo Vitor Damo da Rosa, "There's More To Sideboarding Than You Think" (StarCityGames, 19 Dec 2019)

https://articles.starcitygames.com/magic-the-gathering/premium/theres-more-to-sideboarding-than-you-think/

- **Sideboard distinto en el play y en el draw:** proactivo en el play (se toca menos; el plan A llega primero), reactivo en el draw (más respuestas, alargar la partida). Las cartas que mejoran yendo primero (planeswalkers, dorks contra barridas pequeñas) se quedan en el play y salen en el draw.
- **En el draw hacen falta menos tierras:** para lanzar una carta de cuatro en el turno 4 con un ~70 %, 26 tierras en el play equivalen a 24 en el draw. A veces se puede sacar una tierra en el draw.
- **Sideboard contra el mazo del rival después de su sideboard**, no contra su game 1.
- **Mulligan distinto en las partidas con sideboard:** son más largas y van más de cantidad de cartas que de velocidad; buscar con mulligans una mano explosiva castiga más cuando el rival ha metido respuestas.
- **Adaptar el plan al rival concreto:** su lista y su forma de jugar (si ya juega alrededor de una carta, esa carta vale menos).

**Aplicado a nosotros (ideas para la tarea C, sin aplicar):**
- **Play y draw en el Sideboard map:** hoy cada matchup tiene un solo plan. Contra tempo azul, por ejemplo, encaja con lo decidido en 11.3: Natural Order se queda, y en el draw es donde tendría sentido sacar una copia. Una columna o nota "on the draw" en las filas donde cambie.
- **Mulligans:** la sección de Mulligans podría distinguir game 1 (buscar la mano explosiva de turno 2) de los games 2 y 3 (aceptar manos más lentas pero sólidas contra rivales con más respuestas). Encaja en la tarea G.
- **Sideboard contra su configuración de después:** la columna "Their sideboard" de Matchups (MyMTGO, "Sided in") ya da esa información; los planes deberían leerse junto a ella.
