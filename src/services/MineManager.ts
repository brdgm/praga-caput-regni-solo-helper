import { BotRound } from '@/store/state'
import MineType from './enum/MineType'
import Action from './enum/Action'

export default class MineManager {

  private _botRound : BotRound

  public constructor(botRound : BotRound) {
    this._botRound = botRound
  }

  /**
   * Gets the count of mines regarding the advancements of this round.
   * @param mineType Mine type
   * @returns New value
   */
  getAdvancedCount(mineType: MineType) {
    if (mineType == MineType.STONE) {
      return advance(mineType, this._botRound.quarryCount, this._botRound.quarryCountAdvance)
    }
    else {
      return advance(mineType, this._botRound.goldMineCount, this._botRound.goldMineCountAdvance)
    }
  }

  /**
   * Checks with production actions are allowed depending on current status of mines.
   * @returns Allowed actions
   */
  getProductionChoiceActions() : Action[] {
    const result : Action[] = []
    if (this._botRound.goldMineCount < getMaximum(MineType.GOLD)) {
      result.push(Action.INCREASE_PRODUCTION_GOLD)
    }
    if (this._botRound.quarryCount < getMaximum(MineType.STONE)) {
      result.push(Action.INCREASE_PRODUCTION_STONE)
    }
    return result
  }

  /**
   * Filters out production actions that are no longer possible because maximum is reached already.
   * Replaced gold or stone action with a single action if one of them has already reached its maximum.
   * @param actions Actions
   * @returns Filtered/Transformed actions
   */
  filterTransformProductionActions(actions: Action[]) : Action[] {
    const choiceActions = this.getProductionChoiceActions()
    return actions
        .filter(action => {
          switch (action) {
            case Action.INCREASE_PRODUCTION_GOLD:
            case Action.INCREASE_PRODUCTION_STONE:
              return choiceActions.includes(action)
            case Action.INCREASE_PRODUCTION_GOLD_OR_STONE:
              return choiceActions.length > 0
            default:
              return true
          }
        })
        .map(action => {
          if (action == Action.INCREASE_PRODUCTION_GOLD_OR_STONE && choiceActions.length == 1) {
            return choiceActions[0]
          }
          else {
            return action
          }
        })
  }

  /**
   * Checks if with the gained advancements this round production tokens or seals are unlocked and returns the appropriate actions.
   * @param botRound Bot round
   * @return Actions
   */
  getProductionGainActions() : Action[] {
    const result : Action[] = []

    if (this._botRound.goldMineCountAdvance) {
      const newCount = this.getAdvancedCount(MineType.GOLD)
      if (unlockProductionToken(MineType.GOLD, newCount)) {
        result.push(Action.GAIN_PRODUCTION_TOKEN)
      }
      if (gainSeal(MineType.GOLD, newCount)) {
        result.push(Action.GAIN_SEAL_GOLD)
      }
    }

    if (this._botRound.quarryCountAdvance) {
      const newCount = this.getAdvancedCount(MineType.STONE)
      if (unlockProductionToken(MineType.STONE, newCount)) {
        result.push(Action.GAIN_PRODUCTION_TOKEN)
      }
      if (gainSeal(MineType.STONE, newCount)) {
        result.push(Action.GAIN_SEAL_STONE)
      }
    }

    return result
  }
  
}

/**
 * Advance value with given number up to the given limit.
 * @param mineType Mine type
 * @param currentValue Current value
 * @param advance Advance, defaults to 0
 * @returns New value
 */
function advance(mineType: MineType, currentValue: number, advance?: number) {
  const newValue = currentValue + (advance ?? 0)
  const maxValue = getMaximum(mineType)
  if (newValue > maxValue) {
    return maxValue
  }
  else {
    return newValue
  }
}

/**
 * Maximum value for given mime type.
 * @param mineType Mine type
 * @returns Maximum value
 */
function getMaximum(mineType: MineType) {
  if (mineType == MineType.STONE) {
    return 7
  }
  else {
    return 8
  }
}

/**
 * Checks if the number of mines unlock a production token.
 * @param mineType Mine type
 * @param currentValue Current value
 * @returns true if production token is unlocked
 */
function unlockProductionToken(mineType: MineType, currentValue: number) : boolean {
  if (mineType == MineType.STONE) {
    return currentValue == 4
  }
  else {
    return currentValue == 5
  }
}

/**
 * Checks if the number of mines gain a seal.
 * @param mineType Mine type
 * @param currentValue Current value
 * @returns true if seal is gained
 */
function gainSeal(mineType: MineType, currentValue: number) : boolean {
  return currentValue == getMaximum(mineType)
}
