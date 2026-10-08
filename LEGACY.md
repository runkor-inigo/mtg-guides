# Legacy · heurísticas del proyecto

Archivo de trabajo con las heurísticas de Legacy que usamos en la guía de Speaker Elves. Sirve para escribir la guía con un criterio coherente y para revisarlo cuando cambie el metajuego.

**Nada de esto es incuestionable.** Son reglas prácticas, no leyes: cada una dice de dónde sale y cuándo no aplica. Lo que funciona en un mazo de Cradle no funciona igual en otro, porque cada uno genera maná, cartas y presión a ritmos distintos. Cuando una heurística choque con el testing o con un piloto con experiencia, gana la evidencia y se actualiza este archivo.

Estados, igual que en la guía: **Settled** (asentado), **Working range** (rango de trabajo), **Under test** (en prueba), **Unverified** (sin fuente).

La versión publicada para los lectores está en la sección Heuristics de la guía (`#heur` en `index.html`). Este archivo es el detalle interno: no se publica (`.vercelignore`).

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

- **19 tierras, 6 fetchlands, 3 Boseiju.** Boseiju es maná verde inmediato pero no es Forest para Quirion; las copias extra valen más para el channel. **Settled.**
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
