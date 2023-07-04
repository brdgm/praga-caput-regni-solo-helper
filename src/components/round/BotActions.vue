<template>
  <div v-for="action in currentCard.actions" :key="action" class="mt-3">
    <template v-if="isProductionChoice(action)">
      <AppIcon class="action" :class="{[productionChoiceActions[0]]:true}"
          type="action" :name="productionChoiceActions[0]" extension="jpg"/>
      <strong> or </strong>
      <AppIcon class="action" :class="{[productionChoiceActions[1]]:true}"
          type="action" :name="productionChoiceActions[1]" extension="jpg"/>
    </template>
    <template v-else>
      <AppIcon class="action" :class="{[action]:true}"
          type="action" :name="action" extension="jpg"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '../structure/AppIcon.vue';
import { BotRound } from '@/store/state';
import Card from '@/services/Card';
import CardDeck from '@/services/CardDeck';
import Action from '@/services/enum/Action';

export default defineComponent({
  name: 'BotActions',
  components: {
    AppIcon
  },
  props: {
    botRound: {
      type: Object as PropType<BotRound>,
      required: true
    }
  },
  computed: {
    currentCard() : Card {
      return CardDeck.fromPersistence(this.botRound.cardDeck).currentCard
    },
    productionChoiceActions() : Action[] {
      return [Action.INCREASE_PRODUCTION_GOLD, Action.INCREASE_PRODUCTION_STONE]
    }
  },
  methods: {
    isProductionChoice(action : Action) {
      return action == Action.INCREASE_PRODUCTION_GOLD_OR_STONE
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  width: 300px;
}
.action.increase-production-stone, .action.increase-production-gold {
  width: 120px;
}
</style>
