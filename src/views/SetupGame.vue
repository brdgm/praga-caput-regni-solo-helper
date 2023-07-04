<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <BoardSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import BoardSetup from '@/components/setup/BoardSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    PlayersSetup,
    BoardSetup
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    startGame() : void {
      
    }
  }
})
</script>
