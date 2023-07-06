import ProductionToken from "@/services/enum/ProductionToken";

/**
 * Get production tokens for board setup depending on player count.
 * @param playerCount Player count
 * @returns Production tokens. Returns empty array if player count is not 2 or 3 (use all tokens for 4 players)
 */
export default function(playerCount: number) : ProductionToken[] {
  switch (playerCount) {
    case 2:
      return [ProductionToken.TWO_POINT, ProductionToken.TWO_POINT, ProductionToken.POINT_GOLD, ProductionToken.POINT_STONE]
    case 3:
      return [ProductionToken.TWO_POINT, ProductionToken.TWO_POINT, ProductionToken.POINT_GOLD, ProductionToken.POINT_STONE, ProductionToken.GOLD, ProductionToken.STONE]
    default:
      return []
  }
}
