<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p class="mt-4" v-html="t('endOfGame.info1')"></p>
  <p v-html="t('endOfGame.info2')"></p>

  <h4 class="mt-4" v-html="t('endOfGame.scoringGoals.title')"></h4>
  <ul>
    <li v-for="level of 8" :key="level" v-html="t(`endOfGame.scoringGoals.level${level}`)"></li>
  </ul>
  <p class="small" v-html="t('endOfGame.scoringGoals.credits')"></p>
  
  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { botCount } = state.setup.playerSetup
    return { t, botCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/16/bot/${this.botCount}`
    }
  }
})
</script>
