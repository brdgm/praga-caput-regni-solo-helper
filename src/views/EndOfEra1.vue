<template>
  <h1>{{t('endOfEra1.title')}}</h1>

  <div class="clearfix">
    <AppIcon name="era-2-change" class="era2ChangeIcon float-start"/>
    <p class="mt-4" v-html="t('endOfEra1.info1')"></p>
    <p v-html="t('endOfEra1.info2')"></p>
  </div>

  <RouterLink class="btn btn-primary btn-lg mt-4" :to="nextButtonRouteTo">
    {{t('action.next')}}
  </RouterLink>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'EndOfEra1',
  components: {
    FooterButtons,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { botCount } = state.setup.playerSetup
    return { t, botCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/8/bot/${this.botCount}`
    },
    nextButtonRouteTo() : string {
      return `/round/9/player/1`
    }
  }
})
</script>

<style lang="scss">
.era2ChangeIcon {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 150px;
}
.era2ChangeIcon img {
  filter: drop-shadow(2px 2px 3px #888);
  border-radius: 10px;
}
</style>
