import { BotRound } from '@/store/state'
import MineType from './enum/MineType'
import Action from './enum/Action'

export default class MineManager {

  /**
   * Advance value with given number up to the given limit.
   * @param mineType Mine type
   * @param currentValue Current value
   * @param advance Advance, defaults to 0
   * @returns New value
   */
  advance(mineType: MineType, currentValue: number, advance?: number) {
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
   * Checks if the number of mines unlock a production token.
   * @param mineType Mine type
   * @param currentValue Current value
   * @returns true if production token is unlocked
   */
  unlockProductionToken(mineType: MineType, currentValue: number) : boolean {
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
  gainSeal(mineType: MineType, currentValue: number) : boolean {
    return currentValue == getMaximum(mineType)
  }

  /**
   * Checks with production actions are allowed depending on current status of mines.
   * @param botRound Bot round
   * @returns Allowed actions
   */
  getProductionChoiceActions(botRound: BotRound) : Action[] {
    const result : Action[] = []
    if (botRound.goldMineCount < getMaximum(MineType.GOLD)) {
      result.push(Action.INCREASE_PRODUCTION_GOLD)
    }
    if (botRound.quarryCount < getMaximum(MineType.STONE)) {
      result.push(Action.INCREASE_PRODUCTION_STONE)
    }
    return result
  }

  /**
   * Filters out production actions that are no longer possible because maximum is reached already.
   * Replaced gold or stone action with a single action if one of them has already reached its maximum.
   * @param botRound Bot round
   * @param actions Actions
   * @returns Filtered/Transformed actions
   */
  filterTransformProductionActions(botRound: BotRound, actions: Action[]) : Action[] {
    const choiceActions = this.getProductionChoiceActions(botRound)
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
