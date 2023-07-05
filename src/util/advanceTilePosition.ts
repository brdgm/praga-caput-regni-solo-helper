/**
 * Advance value with given number for tile position (1..4).
 * @param currentValue Current value
 * @param advance Advance, defaults to 0
 * @returns New value
 */
export default function advanceTilePosition(currentPosition: number, advance?: number) {
  let newPosition = currentPosition + (advance ?? 0)
  while (newPosition > 4) {
    newPosition -= 4
  }
  return newPosition
}
