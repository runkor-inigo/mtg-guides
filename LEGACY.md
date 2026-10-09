# Legacy · heurísticas del proyecto

Archivo de trabajo con las heurísticas de Legacy que usamos en la guía de Speaker Elves. Sirve para escribir la guía con un criterio coherente y para revisarlo cuando cambie el metajuego.

**Nada de esto es incuestionable.** Son reglas prácticas, no leyes: cada una dice de dónde sale y cuándo no aplica. Lo que funciona en un mazo de Cradle no funciona igual en otro, porque cada uno genera maná, cartas y presión a ritmos distintos. Cuando una heurística choque con el testing o con un piloto con experiencia, gana la evidencia y se actualiza este archivo.

Estados, igual que en la guía: **Settled** (asentado), **Working range** (rango de trabajo), **Under test** (en prueba), **Unverified** (sin fuente).

La versión publicada para los lectores está en la sección Heuristics de la guía (`#heur` en `index.html`). Este archivo es el detalle interno: no se publica (`.vercelignore`).

Última revisión: 9 Oct 2026. Sin cambios de contenido en esa fecha: el trabajo del día (auditoría de diseño, menú, portada) no toca las heurísticas, y la propuesta de sideboard de la sección 10 sigue esperando la decisión de runkor (tarea C).

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
- **Sin fuente, se marca "Unverified"** en la guía y en ROADMAP.md.

## 9. Ideas abiertas

- Underground Mortuary: el surveil ayuda, pero entra girada y retrasa el dork de turno 1 o el Speaker de turno 2. Caller of the Claw: candidata. Elvish Visionary: carta flex para un juego más grindy; no todas las listas la juegan.
- Las ideas de sideboard de Curran (arriba, **Under test**) se deciden en la revisión del sideboard (tarea C).

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
