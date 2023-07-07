<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg" :help="true"
      data-bs-target="#constructBuildingModal" data-bs-toggle="modal"/>
  <TilePosition class="tilePosition" :tileType="tileType"
      :playerColor="navigationState.getPlayerColor()"
      :tilePosition="botRound.buildingTilePosition"/>

  <ModalDialog id="constructBuildingModal" :title="t('roundBot.constructBuilding.title')" :sizeLg="true" :scrollable="true">
    <template #body>
      <p v-html="t('roundBot.constructBuilding.info1', {ordinal:t(`ordinal.${botRound.buildingTilePosition}`)})"></p>
      <p v-html="t('roundBot.constructBuilding.info2')"></p>
      <p v-html="t('roundBot.constructBuilding.info3')"></p>
      <p v-html="t('roundBot.constructBuilding.info4')"></p>
      <hr/>
      <p v-html="t('roundBot.constructBuilding.info5')"></p>
      <p v-html="t('roundBot.constructBuilding.info6')"></p>
      <AppIcon name="building-move-pawn" extension="jpg" class="building-move-pawn"/>
    </template>
  </ModalDialog>

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
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'ConstructBuilding',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon,
    TilePosition,
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
  margin-left: 20px;
  margin-top: 10px;
}
.building-move-pawn {
  width: 500px;
}
</style>
