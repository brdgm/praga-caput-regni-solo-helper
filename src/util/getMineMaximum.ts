import MineType from "@/services/enum/MineType"

/**
 * Maximum value for given mime type.
 * @param mineType Mine type
 * @returns Maximum value
 */
export default function getMineMaximum(mineType: MineType) {
  if (mineType == MineType.STONE) {
    return 7
  }
  else {
    return 8
  }
}
