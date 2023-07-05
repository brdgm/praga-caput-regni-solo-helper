<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg"/>
  <TilePosition class="tilePosition" :tileType="tileType"
      :playerColor="navigationState.getPlayerColor()"
      :tilePosition="botRound.buildingTilePosition"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import TilePosition from '@/components/structure/TilePosition.vue'
import AppIcon from '../../structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import { BotRound } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import TileType from '@/services/enum/TileType'

export default defineComponent({
  name: 'ConstructBuilding',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon,
    TilePosition
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
  computed: {
    tileType() : TileType {
      return TileType.BUILDING
    }
  }
})
</script>

<style lang="scss" scoped>
.tilePosition {
  margin-left: 10px;
}
</style>
