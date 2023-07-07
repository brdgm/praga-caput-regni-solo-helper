import PlayerColor from '@/services/enum/PlayerColor';
import { Round, State } from '@/store/state';

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerColors: [PlayerColor.BLUE, PlayerColor.RED, PlayerColor.GREEN, PlayerColor.PURPLE]
      }
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  playerCount?: number
  botCount?: number
  rounds?: Round[]
}
