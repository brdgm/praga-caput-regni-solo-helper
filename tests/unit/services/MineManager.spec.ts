import MineManager from '@/services/MineManager'
import MineType from '@/services/enum/MineType'
import { expect } from 'chai'
import mockBotRound from '../helper/mockBotRound'
import Action from '@/services/enum/Action'

describe('services/MineManager', () => {
  it('advance', () => {
    const mineManager = new MineManager()
    expect(mineManager.advance(MineType.STONE, 3, 1)).to.eq(4)
    expect(mineManager.advance(MineType.STONE, 3, 3)).to.eq(6)
    expect(mineManager.advance(MineType.STONE, 7, 1)).to.eq(7)

    expect(mineManager.advance(MineType.GOLD, 4, 1)).to.eq(5)
    expect(mineManager.advance(MineType.GOLD, 3, 3)).to.eq(6)
    expect(mineManager.advance(MineType.GOLD, 7, 1)).to.eq(8)
    expect(mineManager.advance(MineType.GOLD, 8, 1)).to.eq(8)
  })

  it('unlockProductionToken', () => {
    const mineManager = new MineManager()
    expect(mineManager.unlockProductionToken(MineType.STONE, 3)).to.false
    expect(mineManager.unlockProductionToken(MineType.STONE, 4)).to.true
    expect(mineManager.unlockProductionToken(MineType.STONE, 5)).to.false

    expect(mineManager.unlockProductionToken(MineType.GOLD, 4)).to.false
    expect(mineManager.unlockProductionToken(MineType.GOLD, 5)).to.true
    expect(mineManager.unlockProductionToken(MineType.GOLD, 6)).to.false
  })

  it('gainSeal', () => {
    const mineManager = new MineManager()
    expect(mineManager.gainSeal(MineType.STONE, 6)).to.false
    expect(mineManager.gainSeal(MineType.STONE, 7)).to.true

    expect(mineManager.gainSeal(MineType.GOLD, 7)).to.false
    expect(mineManager.gainSeal(MineType.GOLD, 8)).to.true
  })

  it('getProductionChoiceActions', () => {
    const mineManager = new MineManager()
    expect(mineManager.getProductionChoiceActions(mockBotRound({quarryCount: 3, goldMineCount: 4})))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD,Action.INCREASE_PRODUCTION_STONE])
    expect(mineManager.getProductionChoiceActions(mockBotRound({quarryCount: 7, goldMineCount: 4})))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD])
    expect(mineManager.getProductionChoiceActions(mockBotRound({quarryCount: 3, goldMineCount: 8})))
        .to.eql([Action.INCREASE_PRODUCTION_STONE])
    expect(mineManager.getProductionChoiceActions(mockBotRound({quarryCount: 7, goldMineCount: 8})))
        .to.eql([])
  })

  it('filterTransformProductionActions_stone', () => {
    const mineManager = new MineManager()
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 3, goldMineCount: 4}),
        [Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE]))
        .to.eql([Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE])
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 7, goldMineCount: 4}),
        [Action.TAKE_WALL_TILE, Action.INCREASE_PRODUCTION_STONE]))
        .to.eql([Action.TAKE_WALL_TILE])
  })

  it('filterTransformProductionActions_gold', () => {
    const mineManager = new MineManager()
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 3, goldMineCount: 4}),
        [Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD]))
        .to.eql([Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD])
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 3, goldMineCount: 8}),
        [Action.TAKE_UPGRADE_TILE, Action.INCREASE_PRODUCTION_GOLD]))
        .to.eql([Action.TAKE_UPGRADE_TILE])
  })

  it('filterTransformProductionActions_both', () => {
    const mineManager = new MineManager()
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 3, goldMineCount: 4}),
        [Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD_OR_STONE])
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 7, goldMineCount: 4}),
        [Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_GOLD])
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 3, goldMineCount: 8}),
        [Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([Action.INCREASE_PRODUCTION_STONE])
    expect(mineManager.filterTransformProductionActions(mockBotRound({quarryCount: 7, goldMineCount: 8}),
        [Action.INCREASE_PRODUCTION_GOLD_OR_STONE]))
        .to.eql([])
  })

})
