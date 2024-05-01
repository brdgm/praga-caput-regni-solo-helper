import { BotRound, Round, State } from '@/store/state'
import CardDeck from './CardDeck'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import Action from './enum/Action'
import advanceTilePosition from '@/util/advanceTilePosition'
import MineType from './enum/MineType'
import MineManager from './MineManager'

export default class RoundManager {

  private _botCount : number
  private _rounds : Round[]

  public constructor(state : State) {
    this._botCount = state.setup.playerSetup.botCount
    this._rounds = state.rounds
  }

  /**
   * Prepares the first round
   * @returns Round
   */
  public prepareFirstRound() : Round {
    const round = 1
    const botRound : BotRound[] = []
    for (let bot=1; bot<=this._botCount; bot++) {
      const cardDeck = CardDeck.new()
      const quarryCount = 2
      const goldMineCount = 3
      const upgradeTilePosition = randomUniqueTilePosition(botRound, item => item.upgradeTilePosition)
      const wallTilePosition = randomUniqueTilePosition(botRound, item => item.wallTilePosition)
      const buildingTilePosition = randomUniqueTilePosition(botRound, item => item.buildingTilePosition)
      botRound.push({
        round,
        bot,
        cardDeck: cardDeck.toPersistence(),
        quarryCount,
        goldMineCount,
        upgradeTilePosition,
        wallTilePosition,
        buildingTilePosition
      })
    }
    return { round, botRound: botRound }
  }

  /**
   * Prepare next round.
   * @param round Next round
   * @returns Round
   */
  public prepareNextRound(round: number) : Round {
    let previousRound = this._rounds.find(item => item.round == round - 1)
    if (!previousRound) {
      // fallback if previous round is not present - should never happen
      previousRound = this.prepareFirstRound()
    }

    const botRound : BotRound[] = []
    for (let bot=1; bot<=this._botCount; bot++) {
      const previousBotRound = previousRound.botRound[bot-1]
      const cardDeck = CardDeck.fromPersistence(previousBotRound.cardDeck)
      cardDeck.draw()  // draw next card
      const mineManager = new MineManager(previousBotRound)
      const quarryCount = mineManager.getAdvancedCount(MineType.STONE)
      const goldMineCount = mineManager.getAdvancedCount(MineType.GOLD)
      const upgradeTilePosition = advanceTilePosition(previousBotRound.upgradeTilePosition, previousBotRound.upgradeTilePositionAdvance)
      const wallTilePosition = advanceTilePosition(previousBotRound.wallTilePosition, previousBotRound.wallTilePositionAdvance)
      const buildingTilePosition = advanceTilePosition(previousBotRound.buildingTilePosition, previousBotRound.buildingTilePositionAdvance)
      botRound.push({
        round,
        bot,
        cardDeck: cardDeck.toPersistence(),
        quarryCount,
        goldMineCount,
        upgradeTilePosition,
        wallTilePosition,
        buildingTilePosition
      })
    }
    return { round, botRound: botRound }
  }

  /**
   * Advance tile positions after completing bot's turn.
   * @param round Current round
   * @param bot Bot number
   */
  public advanceTilePosition(botRound: BotRound) {
    const cardDeck = CardDeck.fromPersistence(botRound.cardDeck)
    const currentCard = cardDeck.currentCard
    if (currentCard.actions.includes(Action.TAKE_UPGRADE_TILE)) {
      botRound.upgradeTilePositionAdvance = 1
    }
    if (currentCard.actions.includes(Action.TAKE_WALL_TILE)) {
      botRound.wallTilePositionAdvance = 1
    }
    if (currentCard.actions.includes(Action.CONSTRUCT_BUILDING)) {
      botRound.buildingTilePositionAdvance = 1
    }
  }

  /**
   * Stores the number of claimed production tokens this round.
   * @param botRound Bot round
   * @param actions Executed actions
   */
  public storeClaimedProductionTokens(botRound: BotRound, actions: Action[]) {
    const claimedProductionTokens = actions.filter(action => action == Action.GAIN_PRODUCTION_TOKEN).length
    botRound.productionTokensClaimed = claimedProductionTokens > 0 ? claimedProductionTokens : undefined
  }

}

function randomUniqueTilePosition(botRounds: BotRound[], getPosition: (botRound: BotRound) => number) : number {
  const position = rollDice(4)
  if (hasTilePosition(position, botRounds, getPosition)) {
    return randomUniqueTilePosition(botRounds, getPosition)
  }
  return position
}

function hasTilePosition(position: number, botRounds: BotRound[], getPosition: (botRound: BotRound) => number) : boolean {
  return botRounds.find(item => getPosition(item) == position) != undefined
}
