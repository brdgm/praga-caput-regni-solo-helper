import PlayerColor from '@/services/enum/PlayerColor'

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.BLUE:
      return "#1486c3"
    case PlayerColor.GREEN:
      return "#a3cd02"
    case PlayerColor.PURPLE:
      return "#b204e3"
    case PlayerColor.RED:
      return "#b91729";
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
