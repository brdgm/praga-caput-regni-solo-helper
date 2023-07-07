import { BotRound } from '@/store/state';

export default function (params?: MockBotRoundParams) : BotRound {  
  return {
    round: params?.round ?? 1,
    bot: params?.bot ?? 1,
    cardDeck: {
      pile: params?.pile ?? ['1','2','3','4','5'],
      discard: params?.discard ?? []
    },
    quarryCount: params?.quarryCount ?? 2,
    quarryCountAdvance: params?.quarryCountAdvance,
    goldMineCount: params?.goldMineCount ?? 3,
    goldMineCountAdvance: params?.goldMineCountAdvance,
    upgradeTilePosition: params?.upgradeTilePosition ?? 1,
    upgradeTilePositionAdvance: params?.upgradeTilePositionAdvance,
    wallTilePosition: params?.wallTilePosition ?? 1,
    wallTilePositionAdvance: params?.wallTilePositionAdvance,
    buildingTilePosition: params?.buildingTilePosition ?? 1,
    buildingTilePositionAdvance: params?.buildingTilePositionAdvance
  }
}

export interface MockBotRoundParams {
  round?: number
  bot?: number
  pile?: string[]
  discard?: string[]
  quarryCount?: number
  quarryCountAdvance?: number
  goldMineCount?: number
  goldMineCountAdvance?: number
  upgradeTilePosition?: number
  upgradeTilePositionAdvance?: number
  wallTilePosition?: number
  wallTilePositionAdvance?: number
  buildingTilePosition?: number
  buildingTilePositionAdvance?: number
}
