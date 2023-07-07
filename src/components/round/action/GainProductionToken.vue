<template>
  <AppIcon class="productionTokenIcon" :class="{[action]:true}"
      type="action" :name="action" extension="png" :help="true"
      data-bs-target="#gainProductionTokenModal" data-bs-toggle="modal"/>

  <div class="tokenNumber">
    <span v-html="t('roundBot.gainProductionToken.tokenNumber', {ordinal:t(`ordinal.${tokenNumber}`)})"></span>
    <button class="btn btn-outline-secondary btn-sm" @click="reroll">{{t('roundBot.gainProductionToken.reroll')}}</button>
  </div>

  <ModalDialog id="gainProductionTokenModal" :title="t('roundBot.gainProductionToken.title')">
    <template #body>
      <p v-html="t('roundBot.gainProductionToken.info1', {ordinal:t(`ordinal.${tokenNumber}`)})"></p>
      <button class="btn btn-outline-secondary btn-sm" @click="reroll">{{t('roundBot.gainProductionToken.reroll')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import { BotRound } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import rollDiceDifferentValue from 'brdgm-commons/src/util/random/rollDiceDifferentValue'
import MineType from '@/services/enum/MineType'

export default defineComponent({
  name: 'GainProductionToken',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon,
    ModalDialog
  },
  emits: {
    increaseProductionMine: (_mineTypes: MineType[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  data() {
    return {
      tokenNumber: 0
    }
  },
  props: {
    action: {
      type: String as PropType<Action>,
      required: true
    },
    botRound: {
      type: Object as PropType<BotRound>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  methods: {
    reroll() : void {
      this.tokenNumber = rollDiceDifferentValue(this.navigationState.maximumProductionTokensLeft, this.tokenNumber)
    }
  },
  beforeMount() {
    this.reroll()
  }
})
</script>

<style lang="scss">
.productionTokenIcon {
  width: 80px;
  @media (max-width: 600px) {
    width: 60px;
  }
}
.tokenNumber {
  display: inline-block;
  margin-left: 20px;
  font-weight: bold;
  button {
    margin-left: 10px;
  }
}
</style>
