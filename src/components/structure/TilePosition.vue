<template>
  <div class="tilePosition">
    <TileHex v-for="index of 4" :key="index" class="hex"
        :tileType="tileType"
        :playerColor="playerColor"
        :special="index == 4"
        :markerVisible="index == tilePosition" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import TileHex from './TileHex.vue';
import TileType from '@/services/enum/TileType';
import PlayerColor from '@/services/enum/PlayerColor';

export default defineComponent({
  name: 'TilePosition',
  components: {
    TileHex
  },
  props: {
    tileType: {
      type: String as PropType<TileType>,
      required: true
    },
    playerColor: {
      type: String as PropType<PlayerColor>,
      required: true
    },
    tilePosition: {
      type: Number,
      required: true
    },
    hexWidth: {
      type: String,
      required: false,
      default: '50px'
    }
  }
})
</script>

<style lang="scss" scoped>
.tilePosition {
  display: inline-block;
}
.hex {
  width: v-bind(hexWidth);
  @media (max-width: 600px) {
    width: calc( v-bind(hexWidth) / 3 * 2);
  }
}
</style>
