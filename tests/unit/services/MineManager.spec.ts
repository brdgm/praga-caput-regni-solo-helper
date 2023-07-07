import MineManager from '@/services/MineManager'
import MineType from '@/services/enum/MineType'
import { expect } from 'chai'
import mockBotRound from '../helper/mockBotRound'
import Action from '@/services/enum/Action'

describe('services/MineManager', () => {
  it('getAdvancedCount_stone', () => {
    expect(new MineManager(mockBotRound({quarryCount: 3, quarryCountAdvance: 1}))
        .getAdvancedCount(MineType.STONE))
        .to.eq(4)
    expect(new MineManager(mockBotRound({quarryCount: 3, quarryCountAdvance: 3}))
        .getAdvancedCount(MineType.STONE))
        .to.eq(6)
    expect(new MineManager(mockBotRound({quarryCount: 7, quarryCountAdvance: 1}))
        .getAdvancedCount(MineType.STONE))
        .to.eq(7)
  })

  it('getAdvancedCount_gold', () => {
    expect(new MineManager(mockBotRound({goldMineCount: 4, goldMineCountAdvance: 1}))
        .getAdvancedCount(MineType.GOLD))
        .to.eq(5)
    expect(new MineManager(mockBotRound({goldMineCount: 3, goldMineCountAdvance: 3}))
        .getAdvancedCount(MineType.GOLD))
        .to.eq(6)
    expect(new MineManager(mockBotRound({goldMineCount: 7, goldMineCountAdvance: 1}))
        .getAdvancedCount(MineType.GOLD))
        .to.eq(8)
    expect(new MineManager(mockBotRound({goldMineCount: 8, goldMineCountAdvance: 1}))
        .getAdvancedCount(MineType.GOLD))
        .to.eq(8)
  })

  it('getProductionChoiceActions', () => {
    expect(new MineManager((mockBotRound({quarryCount: 3, goldMineCount: 4})))
        .getProductionChoiceActions())
        .to.eql([Action.INCREASE_PRODUCTION_GOLD,Action.INCREASE_PRODUCTION_STONE])
    expect(new MineManager((mockBotRound({quarryCount: 7, goldMineCount: 4})))
        .getProductionChoiceActions())
        .to.eql([Action.INCREASE_PRODUCTION_GOLD])
    expect(new MineManager((mockBotRound({quarryCount: 3, goldMineCount: 8})))
        .getProductionChoiceActions())
        .to.eql([Action.INCREASE_PRODUCTION_STONE])
    expect(new MineManager((mockBotRound({quarryCount: 7, goldMineCount: 8})))
        .getProductionChoiceActions())
        .to.eql([])
  })

  it('filterTransformProductionActions_stone', () => {
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 4}))
        .filterTransformProductionActions([Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE]))
        .to.eql([Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE])
    expect(new MineManager(mockBotRound({quarryCount: 7, goldMineCount: 4}))
        .filterTransformProductionActions([Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE]))
        .to.eql([Action.TAKE_WALL_TILE])
  })

  it('filterTransformProductionActions_gold', () => {
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 4}))
        .filterTransformProductionActions([Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD]))
        .to.eql([Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD])
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 8}))
        .filterTransformProductionActions([Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD]))
        .to.eql([Action.TAKE_UPGRADE_TILE])
  })

  it('filterTransformProductionActions_both', () => {
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 4}))
        .filterTransformProductionActions([Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD_OR_STONE])
    expect(new MineManager(mockBotRound({quarryCount: 7, goldMineCount: 4}))
        .filterTransformProductionActions([Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD])
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 8}))
        .filterTransformProductionActions([Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_STONE])
    expect(new MineManager(mockBotRound({quarryCount: 7, goldMineCount: 8}))
        .filterTransformProductionActions([Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([])
  })

  it('getProductionGainActions', () => {
    expect(new MineManager(mockBotRound({quarryCount: 3, goldMineCount: 4}))
        .getProductionGainActions())
        .to.eql([])
    expect(new MineManager(mockBotRound({quarryCount: 3, quarryCountAdvance: 1, goldMineCount: 8}))
        .getProductionGainActions())
        .to.eql([Action.GAIN_PRODUCTION_TOKEN])
    expect(new MineManager(mockBotRound({quarryCount: 3, quarryCountAdvance: 1, goldMineCount: 7, goldMineCountAdvance: 1}))
        .getProductionGainActions())
        .to.eql([Action.GAIN_SEAL_GOLD, Action.GAIN_PRODUCTION_TOKEN])
    expect(new MineManager(mockBotRound({quarryCount: 6, quarryCountAdvance: 1, goldMineCount: 4, goldMineCountAdvance: 1}))
        .getProductionGainActions())
        .to.eql([Action.GAIN_PRODUCTION_TOKEN, Action.GAIN_SEAL_STONE])
  })

})
