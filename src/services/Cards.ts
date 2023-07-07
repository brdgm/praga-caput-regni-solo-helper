import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Action from './enum/Action';

const cards = [
  {
    id: '1',
    actions: [   
      Action.CONSTRUCT_BUILDING
    ],
    actionTileIndex: 1
  },
  {
    id: '2',
    actions: [   
      Action.TAKE_WALL_TILE,
      Action.INCREASE_PRODUCTION_STONE
    ],
    actionTileIndex: 1
  },
  {
    id: '3',
    actions: [   
      Action.INCREASE_PRODUCTION_GOLD_OR_STONE
    ],
    actionTileIndex: 1
  },
  {
    id: '4',
    actions: [   
      Action.CONSTRUCT_BUILDING
    ],
    actionTileIndex: 2
  },
  {
    id: '5',
    actions: [   
      Action.TAKE_UPGRADE_TILE,
      Action.INCREASE_PRODUCTION_GOLD
    ],
    actionTileIndex: 3
  }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
