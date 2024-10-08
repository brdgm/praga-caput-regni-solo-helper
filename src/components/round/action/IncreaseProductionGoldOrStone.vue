<template>
  <div class="chooseMine">
    <AppIcon class="actionIcon" :class="{[productionChoiceActions[0]]:true, inactive:!goldMineChosen}"
        type="action" :name="productionChoiceActions[0]" extension="jpg" :help="true"
        data-bs-target="#increaseProductionGoldOrStoneModal" data-bs-toggle="modal"/>
    <button class="btn chooseButton" :class="{'btn-primary':chooseGoldMineActive, 'btn-secondary':!chooseGoldMineActive}"
        @click="chooseGoldMine">{{t('roundBot.increaseProductionGoldOrStone.choose')}}</button>
  </div>
  <div class="chooseMine">
    <div class="labelOr" v-html="t('roundBot.increaseProductionGoldOrStone.or')"></div>
    <button class="btn chooseButton" :class="{'btn-primary':chooseBothActive, 'btn-secondary':!chooseBothActive}"
        @click="chooseBoth">{{t('roundBot.increaseProductionGoldOrStone.chooseBoth')}}</button>
  </div>
  <div class="chooseMine">
    <AppIcon class="actionIcon" :class="{[productionChoiceActions[1]]:true, inactive:!quarryChosen}"
        type="action" :name="productionChoiceActions[1]" extension="jpg" :help="true"
        data-bs-target="#increaseProductionGoldOrStoneModal" data-bs-toggle="modal"/>
    <button class="btn chooseButton" :class="{'btn-primary':chooseQuarryActive, 'btn-secondary':!chooseQuarryActive}"
        @click="chooseQuarry">{{t('roundBot.increaseProductionGoldOrStone.choose')}}</button>
  </div>

  <ModalDialog id="increaseProductionGoldOrStoneModal" :title="t('roundBot.increaseProductionGoldOrStone.title')">
    <template #body>
      <p v-html="t('roundBot.increaseProductionGoldOrStone.info1')"></p>
      <p v-html="t('roundBot.increaseProductionGoldOrStone.info2')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import { BotRound } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import MineType from '@/services/enum/MineType'
import MineManager from '@/services/MineManager'

export default defineComponent({
  name: 'IncreaseProductionGoldOrStone',
  components: {
    AppIcon,
    ModalDialog
  },
  emits: {
    increaseProductionMine: (_mineTypes: MineType[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: String as PropType<Action>,
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
  data() {
    return {
      goldMineChosen: false,
      quarryChosen: false
    }
  },
  beforeMount() {
    if (this.botRound.goldMineCountAdvance == 1) {
      this.goldMineChosen = true
    }
    if (this.botRound.quarryCountAdvance == 1) {
      this.quarryChosen = true
    }
  },
  computed: {
    productionChoiceActions() : Action[] {
      const mineManager = new MineManager(this.botRound)
      return mineManager.getProductionChoiceActions()
    },
    chooseGoldMineActive() : boolean {
      return (this.goldMineChosen && !this.quarryChosen) || (!this.goldMineChosen && !this.quarryChosen)
    },
    chooseQuarryActive() : boolean {
      return (this.quarryChosen && !this.goldMineChosen) || (!this.goldMineChosen && !this.quarryChosen)
    },
    chooseBothActive() : boolean {
      return (this.goldMineChosen && this.quarryChosen) || (!this.goldMineChosen && !this.quarryChosen)
    }
  },
  methods: {
    chooseGoldMine() : void {
      this.goldMineChosen = true
      this.quarryChosen = false
      this.$emit('increaseProductionMine', [MineType.GOLD])
    },
    chooseQuarry() : void {
      this.goldMineChosen = false
      this.quarryChosen = true
      this.$emit('increaseProductionMine', [MineType.STONE])
    },
    chooseBoth() : void {
      this.goldMineChosen = true
      this.quarryChosen = true
      this.$emit('increaseProductionMine', [MineType.STONE,MineType.GOLD])
    }   
  }
})
</script>

<style lang="scss">
.actionIcon.inactive img {
  filter: opacity(40%);
}
.chooseMine {
  display: inline-block;
  position: relative;
  vertical-align: top;
  min-width: 110px;
  text-align: center;
  @media (max-width: 600px) {
    min-width: 80px;
  }
  .chooseButton {
    position: absolute;
    left: 25px;
    top: 85px;
    @media (max-width: 600px) {
      font-size: smaller;
      left: 9px;
      top: 60px;
    }
  }
}
.labelOr {
  margin-top: 30px;
  font-weight: bold;
  font-size: larger;
}
</style>
