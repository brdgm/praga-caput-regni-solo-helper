<template>
  <AppIcon class="actionIcon" :class="{[action]:true}"
      type="action" :name="action" extension="jpg" :help="true"
      data-bs-target="#takeWallTileModal" data-bs-toggle="modal"/>
  <TilePosition class="tilePosition" :tileType="tileType"
      :playerColor="navigationState.getPlayerColor()"
      :tilePosition="botRound.wallTilePosition"/>

  <ModalDialog id="takeWallTileModal" :title="t('roundBot.takeWallTile.title')">
    <template #body>
      <p v-html="t('roundBot.takeWallTile.info1', {ordinal:t(`ordinal.${botRound.wallTilePosition}`)})"></p>
      <p v-html="t('roundBot.takeWallTile.info2')"></p>
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
  name: 'TakeWallTile',
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
      return TileType.WALL
    }
  }
})
</script>

<style lang="scss" scoped>
.tilePosition {
  margin-left: 20px;
  margin-top: 10px;
}
</style>
