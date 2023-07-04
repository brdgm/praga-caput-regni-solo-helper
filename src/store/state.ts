import { defineStore } from 'pinia'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerCount: 2
      },
      turns: []
    }
  },
  actions: {
    resetGame() {
      this.turns = []
    }
  },
  persist: true
})

export interface Setup {
  playerCount: number
}
export interface Turn {
  turn: number
  round: number
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
}
