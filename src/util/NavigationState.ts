import PlayerColor from '@/services/enum/PlayerColor'
import { BotRound, State } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly player : number
  readonly bot : number
  readonly botRound? : BotRound
  readonly playerCount : number
  readonly botCount : number
  readonly playerColors : PlayerColor[]
  readonly allBotRounds: BotRound[]
  readonly maximumProductionTokensLeft : number

  public constructor(route : RouteLocation, state: State) {    
    this.round = parseInt(route.params['round'] as string)
    this.allBotRounds = this.getAllBotRounds(state, this.round)
    if (route.name == 'RoundPlayer') {
      this.player = parseInt(route.params['player'] as string)
    }
    else {
      this.player = 0
    }
    if (route.name == 'RoundBot') {
      this.bot = parseInt(route.params['bot'] as string)
      this.botRound = this.allBotRounds.find(item => item.bot == this.bot)
    }
    else {
      this.bot = 0
    }

    const playerSetup = state.setup.playerSetup 
    this.playerCount = playerSetup.playerCount
    this.botCount = playerSetup.botCount
    this.playerColors = playerSetup.playerColors
    this.maximumProductionTokensLeft = getMaximumProductionTokensLeft(state, this.round, this.bot)
  }

  private getAllBotRounds(state: State, roundNo: number) : BotRound[] {
    const round = state.rounds.find(item => item.round == roundNo)
    if (round) {
      return round.botRound
    }
    else {
      return []
    }
  }

  public isFirstRound() {
    return this.round == 1
  }

  public isLastRoundOfEra1() {
    return this.round == 8
  }

  public isStartRoundOfEra2() {
    return this.round == 9
  }

  public isLastRoundOfEra2() {
    return this.round == 16
  }

  public getPlayerColor() : PlayerColor {
    if (this.player > 0) {
      return this.playerColors[this.player - 1]
    }
    else {
      return this.playerColors[this.bot + this.playerCount - 1]
    }
  }

}

function getMaximumProductionTokensLeft(state : State, roundNo : number, bot: number) : number {
  const totalPlayerCount = state.setup.playerSetup.playerCount + state.setup.playerSetup.botCount
  const productionTokenCountTotal = totalPlayerCount * 2
  const productionTokensClaimed = state.rounds
      .filter(round => round.round <= roundNo)
      .flatMap(round => round.botRound)
      .filter(botRound => botRound.round < roundNo || botRound.bot < bot)
      .map(botRound => botRound.productionTokensClaimed ?? 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return productionTokenCountTotal - productionTokensClaimed
}
