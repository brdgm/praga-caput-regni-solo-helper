import MineType from "@/services/enum/MineType"
import getMineMaximum from "./getMineMaximum"

/**
 * Advance value with given number up to the given limit.
 * @param mineType Mine type
 * @param currentValue Current value
 * @param advance Advance, defaults to 0
 * @returns New value
 */
export default function advanceMine(mineType: MineType, currentValue: number, advance?: number) {
  const newValue = currentValue + (advance ?? 0)
  const maxValue = getMineMaximum(mineType)
  if (newValue > maxValue) {
    return maxValue
  }
  else {
    return newValue
  }
}
