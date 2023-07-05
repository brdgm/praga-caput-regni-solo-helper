<template>
  <div v-for="action in currentCard.actions" :key="action" class="mt-3">
    <template v-if="isProductionChoice(action)">
      <AppIcon class="actionIcon" :class="{[productionChoiceActions[0]]:true}"
          type="action" :name="productionChoiceActions[0]" extension="jpg" :help="true"/>
      <strong> or </strong>
      <AppIcon class="actionIcon" :class="{[productionChoiceActions[1]]:true}"
          type="action" :name="productionChoiceActions[1]" extension="jpg" :help="true"/>
    </template>
    <template v-else>
      <component :is="action" :action="action" :botRound="botRound" :navigationState="navigationState"/>
    </template>
  </div>
  <div class="mt-3">
    <AppIcon class="actionTileSelectionIcon"
          type="action-tile" :name="currentCard.actionTileIndex.toString()" extension="jpg" :help="true"
          data-bs-target="#actionTileSelectionModal" data-bs-toggle="modal"/>
  </div>

  <ModalDialog id="actionTileSelectionModal" :title="t('roundBot.actionTileSelection.title')">
    <template #body>
      <p v-html="t('roundBot.actionTileSelection.info', {ordinal:t(`ordinalOldest.${currentCard.actionTileIndex}`)})"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n';
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
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BotActions',
  components: {
    AppIcon,
    ConstructBuilding,
    IncreaseProductionGold,
    IncreaseProductionStone,
    TakeUpgradeTile,
    TakeWallTile,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
.actionIcon img, .actionTileSelectionIcon img {
  filter: drop-shadow(2px 2px 3px #888);
  border-radius: 10px;
  margin: 0.25rem;
}
</style>
