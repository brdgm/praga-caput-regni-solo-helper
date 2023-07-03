<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/308765/praga-caput-regni" target="_blank" rel="noopener">
      <img src="../assets/game-praga-caput-regni.jpg" class="rounded shadow w-100"/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

  <!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/XXX/XXX" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/praga-caput-regni-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
  -->

  <ModalDialog id="peterParlerModal" title="Peter Parler" :size-lg="true">
    <template #body>
      <img src="@/assets/peter-parler.jpg"/>
      <p v-html="t('home.peterParler1')"></p>
      <p v-html="t('home.peterParler2')"></p>
    </template>
  </ModalDialog>

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Delicious Games product and has no affiliation with <a href="https://deliciousgames.org/" target="_blank" rel="noopener">Delicious Games</a>.
    All art in this app is from <a href="https://deliciousgames.org/praga-caput-regni-en" target="_blank" rel="noopener">Praga Caput Regni</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png"/></a>
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'AppHome',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style>
a[href='#peterParlerModal'] {
  color: #000;
  text-decoration: underline dotted;
}
</style>
<style lang="scss" scoped>
#peterParlerModal {
  img {
    width: 150px;
    border-radius: 75px;
    float: right;
    margin: 15px;
    filter: drop-shadow(5px 5px 5px #aaa)
  }
}
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
</style>
