import MineType from './enum/MineType'

export default class MineManager {

  /**
   * Advance value with given number up to the given limit.
   * @param mineType Mine type
   * @param currentValue Current value
   * @param advance Advance, defaults to 0
   * @returns New value
   */
  advance(mineType: MineType, currentValue: number, advance?: number) {
    const newValue = currentValue + (advance ?? 0)
    const maxValue = getMaximum(mineType)
    if (newValue > maxValue) {
      return maxValue
    }
    else {
      return newValue
    }
  }

  /**
   * Checks if the number of mines unlock a production token.
   * @param mineType Mine type
   * @param currentValue Current value
   * @returns true if production token is unlocked
   */
  unlockProductionToken(mineType: MineType, currentValue: number) : boolean {
    if (mineType == MineType.STONE) {
      return currentValue == 4
    }
    else {
      return currentValue == 5
    }
  }

  /**
   * Checks if the number of mines gain a seal.
   * @param mineType Mine type
   * @param currentValue Current value
   * @returns true if seal is gained
   */
  gainSeal(mineType: MineType, currentValue: number) : boolean {
    return currentValue == getMaximum(mineType)
  }

}

/**
 * Maximum value for given mime type.
 * @param mineType Mine type
 * @returns Maximum value
 */
function getMaximum(mineType: MineType) {
  if (mineType == MineType.STONE) {
    return 7
  }
  else {
    return 8
  }
}
