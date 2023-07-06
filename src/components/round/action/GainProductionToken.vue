<template>
  <AppIcon class="productionTokenIcon" :class="{[action]:true}"
      type="action" :name="action" extension="png" :help="true"
      data-bs-target="#gainProductionTokenModal" data-bs-toggle="modal"/>

  <ModalDialog id="gainProductionTokenModal" :title="t('roundBot.gainProductionToken.title')">
    <template #body>
      <p v-html="t('roundBot.gainProductionToken.info1')"></p>
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
  props: {
    action: {
      type: Object as PropType<Action>,
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
  }
})
</script>

<style lang="scss">
.productionTokenIcon {
  width: 80px;
}
</style>
