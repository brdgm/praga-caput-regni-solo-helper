<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <BoardSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import BoardSetup from '@/components/setup/BoardSetup.vue'
import RoundManager from '@/services/RoundManager'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    PlayersSetup,
    BoardSetup
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      const round = new RoundManager(this.state).prepareFirstRound()
      this.state.storeRound(round)
      this.$router.push('/round/1/player/1')
    }
  }
})
</script>
