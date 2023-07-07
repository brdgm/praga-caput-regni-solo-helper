<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg" :help="true"
      data-bs-target="#increaseProductionStoneModal" data-bs-toggle="modal"/>

  <ModalDialog id="increaseProductionStoneModal" :title="t('roundBot.increaseProductionStone.title')">
    <template #body>
      <p v-html="t('roundBot.increaseProductionStone.info1')"></p>
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
import MineType from '@/services/enum/MineType'

export default defineComponent({
  name: 'IncreaseProductionStone',
  components: {
    AppIcon,
    ModalDialog
  },
  emits: {
    increaseProductionMine: (_mineTypes: MineType[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
  },
  beforeMount() {
    this.$emit('increaseProductionMine', [MineType.STONE])
  }
})
</script>
