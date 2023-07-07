<template>
  <h3 class="mt-4 mb-3">{{t('setup.board.title')}}</h3>
  <ol>
    <li v-html="t('setup.board.setupForPlayers', {playerCount: totalPlayerCount})"></li>
    <li v-if="totalPlayerCount < 4">
      <span v-html="t('setup.board.productionTokenSet')"></span>
      <AppIcon v-for="(token,index) of productionTokens" :key="index"
          class="icon" type="production-token" :name="token"/>
    </li>
    <li v-else v-html="t('setup.board.productionTokenAll')"></li>
    <li>
      <span v-html="t('setup.board.botPawnPlaza', state.setup.playerSetup.botCount)"></span><br/>
      <AppIcon class="setup-bot-pawn" name="setup-bot-pawn"/>
    </li>
  </ol>
  <p v-html="t('setup.board.noOtherComponents')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'
import ProductionToken from '@/services/enum/ProductionToken'
import getProductionTokens from '@/util/getProductionTokens'

export default defineComponent({
  name: 'BoardSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    totalPlayerCount() : number {
      return this.state.setup.playerSetup.playerCount + this.state.setup.playerSetup.botCount
    },
    productionTokens() : ProductionToken[] {
      return getProductionTokens(this.totalPlayerCount)
    }
  }
})
</script>

<style lang="scss">
.icon img, .setup-bot-pawn img {
  filter: drop-shadow(2px 2px 3px #888);
  margin: 0.25rem;
}
.icon {
  width: 2rem;
  margin-left: 0.5rem;
}
.setup-bot-pawn {
  width: 8rem;
}
</style>
