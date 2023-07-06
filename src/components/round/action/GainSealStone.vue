<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg" :help="true"
      data-bs-target="#gainSealStoneModal" data-bs-toggle="modal"/>

  <ModalDialog id="gainSealStoneModal" :title="t('roundBot.gainSealStone.title')">
    <template #body>
      <p v-html="t('roundBot.gainSealStone.info1')"></p>
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
  name: 'GainSealStone',
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
