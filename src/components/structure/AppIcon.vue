<template>
  <div class="imageContainer" :class="{help:help}">
    <img class="appIcon" :src="imageUrl" draggable="false" alt=""/>
    <img v-if="help" class="helpIcon" src="@/assets/icons/help-semi-transparent.png" draggable="false" alt=""/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppIcon',
  props: {
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      required: false,
      default: 'png'
    },
    help: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    imageUrl() : string {
      if (this.type) {
        return new URL(`/src/assets/icons/${this.type}/${this.name}.${this.extension}`, import.meta.url).toString()
      }
      else {
        return new URL(`/src/assets/icons/${this.name}.${this.extension}`, import.meta.url).toString()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.imageContainer {
  display: inline-block;
  position: relative;
  .appIcon {
    width: 100%;
    height: auto;
  }
  .helpIcon {
    position: absolute;
    z-index: 10;
    right: 0px;
    top: 5px;
    width: 1.4rem;
  }
  &.help {
    cursor: help;
  }
}
</style>
