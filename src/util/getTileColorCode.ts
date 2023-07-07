import TileType from "@/services/enum/TileType";

/**
 * Get color code for tile type.
 * @param tileType Tile type
 * @returns Color code
 */
export default function(tileType: TileType) : string {
  switch (tileType) {
    case TileType.UPGRADE:
      return "#eccd7d"
    case TileType.WALL:
      return "#bdb09d"
    case TileType.BUILDING:
      return "#d9b68b"
    default:
      throw new Error(`Invalid tile type: ${tileType}.`)
  }
}
