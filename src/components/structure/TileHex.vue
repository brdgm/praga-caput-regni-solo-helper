<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" xmlns:xlink="http://www.w3.org/1999/xlink"> 
    <polygon class="hexShape" points="150,300 280,225 280,75 150,0 20,75 20,225"></polygon>
    <image v-if="special" :href="specialImageUrl" width="100" height="100" x="100" y="180"/>
    <rect v-if="markerVisible" class="playerMarker" x="90" y="90" width="120" height="120"/>
  </svg>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import TileType from '@/services/enum/TileType'
import getPlayerColorCode from '@/util/getPlayerColorCode'
import getTileColorCode from '@/util/getTileColorCode'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'TileHex',
  props: {
    tileType: {
      type: String as PropType<TileType>,
      required: true
    },
    playerColor: {
      type: String as PropType<PlayerColor>,
      required: true
    },
    special: {
      type: Boolean,
      required: true
    },
    markerVisible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    tileColorCode() : string {
      return getTileColorCode(this.tileType)
    },
    playerColorCode() : string {
      return getPlayerColorCode(this.playerColor)
    },
    specialImageUrl() : string {
      return new URL(`/src/assets/icons/tile-special/${this.tileType}.png`, import.meta.url).toString()
    }
  }
})
</script>

<style lang="scss" scoped>
.hexShape {
  stroke-width: 5;
  stroke: #000;
  fill: v-bind(tileColorCode);
}
.playerMarker {
  stroke-width: 5;
  stroke: #000;
  fill: v-bind(playerColorCode);
}
</style>
