import MineType from "@/services/enum/MineType"

/**
 * Checks if the number of mines unlock a production token.
 * @param mineType Mine type
 * @param currentValue Current value
 * @returns true if production token is unlocked
 */
export default function isMineProductionToken(mineType: MineType, currentValue: number) {
  if (mineType == MineType.STONE) {
    return currentValue == 5
  }
  else {
    return currentValue == 6
  }
}
