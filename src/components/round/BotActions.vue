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
      <component :is="action" :action="action" :botRound="botRound" :navigationState="navigationState"/>
    </template>
  </div>
  <div class="mt-3">
    <AppIcon class="actionTileSelectionIcon"
          type="action-tile" :name="currentCard.actionTileIndex.toString()" extension="jpg"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '../structure/AppIcon.vue';
import { BotRound } from '@/store/state';
import Card from '@/services/Card';
import CardDeck from '@/services/CardDeck';
import Action from '@/services/enum/Action';
import ConstructBuilding from './action/ConstructBuilding.vue';
import IncreaseProductionGold from './action/IncreaseProductionGold.vue';
import IncreaseProductionStone from './action/IncreaseProductionStone.vue';
import TakeUpgradeTile from './action/TakeUpgradeTile.vue';
import TakeWallTile from './action/TakeWallTile.vue';
import NavigationState from '@/util/NavigationState';

export default defineComponent({
  name: 'BotActions',
  components: {
    AppIcon,
    ConstructBuilding,
    IncreaseProductionGold,
    IncreaseProductionStone,
    TakeUpgradeTile,
    TakeWallTile
  },
  props: {
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

<style lang="scss">
.actionIcon {
  width: 300px;
}
.actionIcon.increase-production-stone, .actionIcon.increase-production-gold, .actionTileSelectionIcon {
  width: 120px;
}
img.actionIcon, img.actionTileSelectionIcon {
  filter: drop-shadow(2px 2px 3px #888);
  border-radius: 10px;
  margin: 0.25rem;
}
</style>
