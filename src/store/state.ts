import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import PlayerColor from '@/services/enum/PlayerColor'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerSetup: {
          playerCount: 2,
          botCount: 1,
          playerColors: [PlayerColor.BLUE, PlayerColor.RED, PlayerColor.GREEN, PlayerColor.PURPLE]
        }
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  playerSetup: PlayerSetup
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}
export interface Round {
  round: number
  botRound: BotRound[]
}
export interface BotRound {
  round: number
  bot: number
  cardDeck: CardDeckPersistence
  quarryCount: number
  goldMineCount: number
  upgradeTilePosition: number
  wallTilePosition: number
  buildingTilePosition: number
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
}
