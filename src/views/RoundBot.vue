<template>
  <SideBar :navigation-state="navigationState"/>

  <h1><PlayerColorDisplay :playerColor="playerColor"/> {{t(`botName.bot${bot}`)}}</h1>

  <BotActions v-if="navigationState.botRound" :botRound="navigationState.botRound"
      :navigation-state="navigationState"
      @increaseProductionMine="increaseProductionMine"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="nextEnabled">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import SideBar from '@/components/round/SideBar.vue'
import BotActions from '@/components/round/BotActions.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import RoundManager from '@/services/RoundManager'
import MineType from '@/services/enum/MineType'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import MineManager from '@/services/MineManager'

export default defineComponent({
  name: 'RoundBot',
  components: {
    FooterButtons,
    PlayerColorDisplay,
    SideBar,
    BotActions
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)

    const { round, bot, botRound, playerCount, botCount } = navigationState
    const playerColor = navigationState.getPlayerColor()

    return { t, state, navigationState, round, bot, botRound, playerCount, botCount, playerColor }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.bot > 1) {
        return `/round/${this.round}/bot/${this.bot - 1}`
      }
      else {
        return `/round/${this.round}/player/${this.playerCount}`
      }
    },
    nextEnabled() : boolean {
      if (this.botRound) {
        const currentCard = CardDeck.fromPersistence(this.botRound.cardDeck).currentCard
        if (currentCard.actions.includes(Action.INCREASE_PRODUCTION_GOLD_OR_STONE)) {
          const productionChoiceActions = new MineManager(this.botRound).getProductionChoiceActions()
          if (productionChoiceActions.length == 2) {
            return this.botRound.goldMineCountAdvance == 1 || this.botRound.quarryCountAdvance == 1
          }
        }
      }
      return true
    }
  },
  methods: {
    next() : void {
      const roundManager = new RoundManager(this.state)
      if (this.botRound) {
        roundManager.advanceTilePosition(this.botRound)
        roundManager.storeClaimedProductionTokens(this.botRound, new MineManager(this.botRound).getProductionGainActions())
      }
      if (this.bot < this.botCount) {
        this.$router.push(`/round/${this.round}/bot/${this.bot + 1}`)
      }
      else if (this.navigationState.isLastRoundOfEra1()) {
        this.prepareForNextRound(roundManager)
        this.$router.push('/endOfEra1')
      }
      else if (this.navigationState.isLastRoundOfEra2()) {
        this.$router.push('/endOfGame')
      }
      else {
        this.prepareForNextRound(roundManager)
        this.$router.push(`/round/${this.round + 1}/player/1`)
      }
    },
    prepareForNextRound(roundManager : RoundManager)  {
      const nextRound = roundManager.prepareNextRound(this.round + 1)
      this.state.storeRound(nextRound)
    },
    increaseProductionMine(mineTypes: MineType[]) {
      if (this.botRound) {
        if (mineTypes.includes(MineType.GOLD)) {
          this.botRound.goldMineCountAdvance = 1
        }
        else {
          this.botRound.goldMineCountAdvance = undefined
        }
        if (mineTypes.includes(MineType.STONE)) {
          this.botRound.quarryCountAdvance = 1
        }
        else {
          this.botRound.quarryCountAdvance = undefined
        }
      }
    }
  }
})
</script>
