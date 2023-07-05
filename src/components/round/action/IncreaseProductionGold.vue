<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import { BotRound } from '@/store/state'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'IncreaseProductionGold',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon
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

<style lang="scss" scoped>
</style>
