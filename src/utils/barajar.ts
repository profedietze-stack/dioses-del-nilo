/**
 * Barajado Fisher-Yates.
 *
 * Los tres puzzles usaban `[...items].sort(() => Math.random() - 0.5)`. Ese
 * comparador es inconsistente —devuelve algo distinto cada vez que se le
 * pregunta por el mismo par— y el resultado no es una permutación uniforme:
 * deja las piezas cerca de donde estaban. Medido sobre 200.000 barajados:
 *
 * | piezas | sale ya ordenado con el comparador | con Fisher-Yates |
 * |--------|------------------------------------|------------------|
 * | 5      | 9,4 %                              | 0,8 %            |
 * | 6      | 4,6 %                              | 0,15 %           |
 * | 8      | 1,0 %                              | 0,003 %          |
 *
 * En un puzzle de ordenar palabras, "sale ya ordenado" significa que el chico
 * lo encuentra resuelto: uno de cada once, con cinco palabras.
 */
export function barajar<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Baraja hasta que el resultado no sea la solución.
 *
 * Con un barajado uniforme la probabilidad de entregar el puzzle hecho es
 * chica pero no nula, y cuando pasa el chico no juega: toca "comprobar" y
 * listo. Reintenta unas pocas veces y se rinde —con dos piezas iguales no hay
 * otro orden posible y no tiene sentido colgarse.
 */
export function barajarDesordenado<T>(
  items: readonly T[],
  estaResuelto: (orden: T[]) => boolean,
  intentos = 12,
): T[] {
  let orden = barajar(items);
  for (let i = 0; i < intentos && estaResuelto(orden); i++) {
    orden = barajar(items);
  }
  return orden;
}
