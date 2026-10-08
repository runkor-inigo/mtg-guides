# Roadmap

## Decisiones pendientes

1. **Activar el workflow nocturno en GitHub Actions.**
   `.github/workflows/meta.yml` actualiza cada noche a las 00:05 (Madrid) los % de 7/14/30 días, los sideboards de MTGO y el archivo de resultados. Está subido pero nunca se ha ejecutado (0 ejecuciones). Para activarlo: pestaña Actions → habilitar workflows → "Nightly metagame refresh" → Run workflow. Si falla al hacer commit: Settings → Actions → General → Workflow permissions → "Read and write". Pendiente también: confirmar que las condiciones de uso de MTGGoldfish permiten la lectura automática.

2. **Nombre de la sección "Prepare".**
   El usuario empezó a proponer otro nombre ("cambiaría el nombre de la sección y pondría…") y el mensaje se cortó. Hasta que se decida, se queda "Prepare".

3. **Nuevos modos del Goldfish Lab: ¿incluirlos o no?**
   Propuestos: (a) "Setup turn", la ruta 2 del Speaker Loop paso a paso (pasar con Cradle y el motor y matar en turno 3); (b) un loop de Speaker desde un tablero ya montado, que sustituiría al modo "Visionary loop (older lists)", porque Visionary ya no está en la lista.

4. **Recuadro de probabilidades de mulligan: ¿incluirlo o no?**
   Solo como contexto, nunca como regla de keep/mull. Cifras calculadas con la lista del 5 Oct, siete cartas antes de mulligans:
   - Fuente verde para el turno 1: 83,7 %.
   - Fuente verde + acelerador (dork o GSZ para Arbor): 60,5 % en el play y 68,2 % en el draw.
   - Con Once Upon a Time en el play: ≈68 % (simulado).

## No verificado

- **Créditos de Speaker Elves (taka87 y ryo_sll).** La página dice que estos jugadores japoneses redescubrieron el arquetipo en 2026, según runkor. **No verificado:** sus publicaciones en X no se pueden leer sin cuenta y no aparecen en artículos ni resultados publicados. Hace falta una lista o publicación con fecha.

## Más adelante

- Plans for Boros Energy, Azorius Tempo and Rakdos Reanimator.
- Interaction Windows and Credits.
- Testacular's Elves guide, if it exists.
