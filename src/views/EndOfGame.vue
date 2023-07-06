<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p class="mt-4" v-html="t('endOfGame.info1')"></p>
  <p v-html="t('endOfGame.info2')"></p>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
