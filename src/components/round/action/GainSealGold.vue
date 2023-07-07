<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg" :help="true"
      data-bs-target="#gainSealGoldModal" data-bs-toggle="modal"/>

  <ModalDialog id="gainSealGoldModal" :title="t('roundBot.gainSealGold.title')">
    <template #body>
      <p>
        <span v-html="t('roundBot.gainSealGold.seal')"></span><br/>
        <AppIcon class="sealIcon" type="seal" name="gold"/>
      </p>
      <p>
        <span v-html="t('roundBot.gainSealGold.seal6Points')"></span><br/>
        <AppIcon class="sealIcon" type="seal" name="6-points"/>
      </p>
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
  name: 'GainSealGold',
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
  }
})
</script>

<style lang="scss">
.sealIcon {
  width: 80px;
}
.sealIcon img {
  filter: drop-shadow(2px 2px 3px #888);
  border-radius: 5px;
}
</style>
