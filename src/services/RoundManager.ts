import { BotRound, Round, State } from '@/store/state'
import CardDeck from './CardDeck'
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import Action from './enum/Action'

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
      const quarryCount = previousBotRound.quarryCount
      const goldMineCount = previousBotRound.goldMineCount
      const upgradeTilePosition = previousBotRound.upgradeTilePosition
      const wallTilePosition = previousBotRound.wallTilePosition
      const buildingTilePosition = previousBotRound.buildingTilePosition
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
  public advanceTilePosition(round: Round, bot: number) {
    const botRound = round.botRound[bot-1]
    const cardDeck = CardDeck.fromPersistence(botRound.cardDeck)
    const currentCard = cardDeck.currentCard
    if (currentCard.actions.includes(Action.TAKE_UPGRADE_TILE)) {
      botRound.upgradeTilePosition = getNextTilePosition(botRound.upgradeTilePosition)
    }
    if (currentCard.actions.includes(Action.TAKE_WALL_TILE)) {
      botRound.wallTilePosition = getNextTilePosition(botRound.wallTilePosition)
    }
    if (currentCard.actions.includes(Action.CONSTRUCT_BUILDING)) {
      botRound.buildingTilePosition = getNextTilePosition(botRound.buildingTilePosition)
    }
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

function getNextTilePosition(currentPosition: number) {
  if (currentPosition >= 4) {
    return 1
  }
  else {
    return currentPosition + 1
  }
}
