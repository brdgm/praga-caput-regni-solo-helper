import RoundManager from '@/services/RoundManager'
import { expect } from 'chai'
import mockState from '../helper/mockState'

describe('services/RoundManager', () => {
  it('prepareFirstRound', () => {
    const roundManager = new RoundManager(mockState({playerCount:1,botCount:3}))
    const round = roundManager.prepareFirstRound()

    expect(round.round).to.eq(1)
    expect(round.botRound.length).to.eq(3)

    const botRound1 = round.botRound[0]
    expect(botRound1.round).to.eq(1)
    expect(botRound1.bot).to.eq(1)
    expect(botRound1.cardDeck).to.not.undefined
    expect(botRound1.quarryCount).to.eq(2)
    expect(botRound1.goldMineCount).to.eq(3)
    expect(botRound1.upgradeTilePosition).to.oneOf([1,2,3,4])
    expect(botRound1.wallTilePosition).to.oneOf([1,2,3,4])
    expect(botRound1.buildingTilePosition).to.oneOf([1,2,3,4])

    for (let bot=2; bot<=3; bot++) {
      const botRoundN = round.botRound[bot-1]
      expect(botRoundN.round).to.eq(1)
      expect(botRoundN.bot).to.eq(bot)
      expect(botRoundN.cardDeck).to.not.undefined
      expect(botRoundN.quarryCount).to.eq(2)
      expect(botRoundN.goldMineCount).to.eq(3)
      expect(botRoundN.upgradeTilePosition).to.oneOf([1,2,3,4])
      expect(botRoundN.wallTilePosition).to.oneOf([1,2,3,4])
      expect(botRoundN.buildingTilePosition).to.oneOf([1,2,3,4])
      expect(botRoundN.upgradeTilePosition).to.not.eq(botRound1.upgradeTilePosition)
      expect(botRoundN.wallTilePosition).to.not.eq(botRound1.wallTilePosition)
      expect(botRoundN.buildingTilePosition).to.not.eq(botRound1.buildingTilePosition)
    }
  })

  it('prepareNextRound', () => {
    const roundManager = new RoundManager(mockState({playerCount:1,botCount:1,rounds:[
      {round:1,botRound:[{
        round:1,
        bot:1,
        cardDeck:{pile:['1','2','3','4','5'],discard:[]},
        quarryCount:4,
        goldMineCount:5,
        upgradeTilePosition:2,
        wallTilePosition:1,
        buildingTilePosition:4
      }]}
    ]}))
    const round = roundManager.prepareNextRound(2)

    expect(round.round).to.eq(2)
    expect(round.botRound.length).to.eq(1)

    const botRound = round.botRound[0]
    expect(botRound.round).to.eq(2)
    expect(botRound.bot).to.eq(1)
    expect(botRound.cardDeck).to.eql({pile:['2','3','4','5'],discard:['1']})
    expect(botRound.quarryCount).to.eq(4)
    expect(botRound.goldMineCount).to.eq(5)
    expect(botRound.upgradeTilePosition).to.eq(2)
    expect(botRound.wallTilePosition).to.eq(1)
    expect(botRound.buildingTilePosition).to.eq(4)
  })

  it('prepareNextRound_advance', () => {
    const roundManager = new RoundManager(mockState({playerCount:1,botCount:1,rounds:[
      {round:1,botRound:[{
        round:1,
        bot:1,
        cardDeck:{pile:['1','2','3','4','5'],discard:[]},
        quarryCount:4,
        quarryCountAdvance:1,
        goldMineCount:5,
        goldMineCountAdvance:5,
        upgradeTilePosition:2,
        upgradeTilePositionAdvance:1,
        wallTilePosition:1,
        wallTilePositionAdvance:2,
        buildingTilePosition:4,
        buildingTilePositionAdvance:3
      }]}
    ]}))
    const round = roundManager.prepareNextRound(2)

    expect(round.round).to.eq(2)
    expect(round.botRound.length).to.eq(1)

    const botRound = round.botRound[0]
    expect(botRound.round).to.eq(2)
    expect(botRound.bot).to.eq(1)
    expect(botRound.cardDeck).to.eql({pile:['2','3','4','5'],discard:['1']})
    expect(botRound.quarryCount).to.eq(5)
    expect(botRound.goldMineCount).to.eq(8)
    expect(botRound.upgradeTilePosition).to.eq(3)
    expect(botRound.wallTilePosition).to.eq(3)
    expect(botRound.buildingTilePosition).to.eq(3)
  })

  it('advanceTilePosition_upgrade', () => {
    const state = mockState({playerCount:1,botCount:1,rounds:[
      {round:1,botRound:[{
        round:1,
        bot:1,
        cardDeck:{pile:['5','2','3','4','1'],discard:[]},
        quarryCount:4,
        goldMineCount:5,
        upgradeTilePosition:2,
        wallTilePosition:1,
        buildingTilePosition:4
      }]}
    ]})
    const roundManager = new RoundManager(state)
    roundManager.advanceTilePosition(state.rounds[0].botRound[0])

    const botRound = state.rounds[0].botRound[0]
    expect(botRound.upgradeTilePosition).to.eq(2)
    expect(botRound.upgradeTilePositionAdvance).to.eq(1)
    expect(botRound.wallTilePosition).to.eq(1)
    expect(botRound.wallTilePositionAdvance).to.undefined
    expect(botRound.buildingTilePosition).to.eq(4)
    expect(botRound.buildingTilePositionAdvance).to.undefined
  })

  it('advanceTilePosition_wall', () => {
    const state = mockState({playerCount:1,botCount:1,rounds:[
      {round:1,botRound:[{
        round:1,
        bot:1,
        cardDeck:{pile:['2','1','3','4','5'],discard:[]},
        quarryCount:4,
        goldMineCount:5,
        upgradeTilePosition:2,
        wallTilePosition:1,
        buildingTilePosition:4
      }]}
    ]})
    const roundManager = new RoundManager(state)
    roundManager.advanceTilePosition(state.rounds[0].botRound[0])

    const botRound = state.rounds[0].botRound[0]
    expect(botRound.upgradeTilePosition).to.eq(2)
    expect(botRound.upgradeTilePositionAdvance).to.undefined
    expect(botRound.wallTilePosition).to.eq(1)
    expect(botRound.wallTilePositionAdvance).to.eq(1)
    expect(botRound.buildingTilePosition).to.eq(4)
    expect(botRound.buildingTilePositionAdvance).to.undefined
  })

  it('advanceTilePosition_building', () => {
    const state = mockState({playerCount:1,botCount:1,rounds:[
      {round:1,botRound:[{
        round:1,
        bot:1,
        cardDeck:{pile:['1','2','3','4','5'],discard:[]},
        quarryCount:4,
        goldMineCount:5,
        upgradeTilePosition:2,
        wallTilePosition:1,
        buildingTilePosition:4
      }]}
    ]})
    const roundManager = new RoundManager(state)
    roundManager.advanceTilePosition(state.rounds[0].botRound[0])

    const botRound = state.rounds[0].botRound[0]
    expect(botRound.upgradeTilePosition).to.eq(2)
    expect(botRound.upgradeTilePositionAdvance).to.undefined
    expect(botRound.wallTilePosition).to.eq(1)
    expect(botRound.wallTilePositionAdvance).to.undefined
    expect(botRound.buildingTilePosition).to.eq(4)
    expect(botRound.buildingTilePositionAdvance).to.eq(1)
  })
})
