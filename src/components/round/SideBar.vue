<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{navigationState.round}}</strong> / 16</p>
    <div v-for="(botRound,index) of navigationState.allBotRounds" :key="index">
      <h5 class="mt-3">{{t(`botName.bot${index+1}`)}}</h5>
       {{getQuarryCount(botRound)}}<AppIcon class="mineIcon" type="mine" name="stone"/> &nbsp;
       {{getGoldMineCount(botRound)}}<AppIcon class="mineIcon" type="mine" name="gold"/><br/>
      <div v-for="tileType of tileTypes" :key="tileType">
      <TilePosition 
          class="tilePosition" :tileType="tileType"
          :playerColor="getBotPlayerColor(index+1)"
          :tilePosition="getTilePosition(botRound, tileType)"
          hexWidth="20px"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import AppIcon from '../structure/AppIcon.vue';
import TilePosition from '../structure/TilePosition.vue';
import TileType from '@/services/enum/TileType';
import getAllEnumValues from 'brdgm-commons/src/util/enum/getAllEnumValues';
import { BotRound, useStateStore } from '@/store/state';
import PlayerColor from '@/services/enum/PlayerColor';
import advanceTilePosition from '@/util/advanceTilePosition'
import MineType from '@/services/enum/MineType';
import MineManager from '@/services/MineManager';

export default defineComponent({
  name: "SideBar",
  components: {
    AppIcon,
    TilePosition
  },
  setup() {
    const { t } = useI18n();
    const playerSetup = useStateStore().setup.playerSetup
    const mineManager = new MineManager()
    return { t, playerSetup, mineManager };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    tileTypes() : TileType[] {
      return getAllEnumValues(TileType)
    }
  },
  methods: {
    getQuarryCount(botRound: BotRound) : number {
      return this.mineManager.advance(MineType.STONE, botRound.quarryCount, botRound.quarryCountAdvance)
    },
    getGoldMineCount(botRound: BotRound) : number {
      return this.mineManager.advance(MineType.GOLD, botRound.goldMineCount, botRound.goldMineCountAdvance)
    },
    getTilePosition(botRound: BotRound, tileType: TileType) : number {
      switch (tileType) {
        case TileType.UPGRADE:
          return advanceTilePosition(botRound.upgradeTilePosition, botRound.upgradeTilePositionAdvance)
        case TileType.WALL:
          return advanceTilePosition(botRound.wallTilePosition, botRound.wallTilePositionAdvance)
        case TileType.BUILDING:
          return advanceTilePosition(botRound.buildingTilePosition, botRound.buildingTilePositionAdvance)
        default:
          return 0
      }
    },
    getBotPlayerColor(bot: number) : PlayerColor {
      return this.playerSetup.playerColors[this.playerSetup.playerCount + bot - 1]
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 160px;
  margin-right: -12px;
  margin-left: 20px;
  padding-right: 10px;
  .mineIcon {
    width: 1.5rem;
  }
}
</style>
