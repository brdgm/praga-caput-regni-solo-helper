<template>
  <h1><PlayerColorDisplay :playerColor="playerColor"/> {{t('turnPlayer.title', {player:player}, playerCount)}}</h1>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
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
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    PlayerColorDisplay
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)

    const { round, player, playerCount, botCount } = navigationState
    const playerColor = navigationState.getPlayerColor()
    const firstRound = navigationState.isFirstRound()

    return { t, state, round, player, playerCount, botCount, playerColor, firstRound }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.player > 1) {
        return `/round/${this.round}/player/${this.player - 1}`
      }
      else if (!this.firstRound) {
        return `/round/${this.round - 1}/bot/${this.botCount}`
      }
      return ''
    }
  },
  methods: {
    next() : void {
      if (this.player < this.playerCount) {
        this.$router.push(`/round/${this.round}/player/${this.player + 1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/bot/1`)
      }
    }
  }
})
</script>
