<template>
  <SideBar :navigation-state="navigationState"/>

  <h1><PlayerColorDisplay :playerColor="playerColor"/> {{t(`botName.bot${bot}`)}}</h1>

  <BotActions v-if="navigationState.botRound" :botRound="navigationState.botRound"
      :navigation-state="navigationState"
      @increaseProductionMine="increaseProductionMine"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    }
  },
  methods: {
    next() : void {
      const roundManager = new RoundManager(this.state)
      if (this.botRound) {
        roundManager.advanceTilePosition(this.botRound)
      }
      if (this.bot < this.botCount) {
        this.$router.push(`/round/${this.round}/bot/${this.bot + 1}`)
      }
      else if (!this.navigationState.isLastRound()) {
        const nextRound = roundManager.prepareNextRound(this.round + 1)
        this.state.storeRound(nextRound)
        this.$router.push(`/round/${this.round + 1}/player/1`)
      }
      else {
        this.$router.push(`/endOfGame`)
      }
    },
    increaseProductionMine(mineType: MineType) {
      
    }
  }
})
</script>
