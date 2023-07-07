import * as _ from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'

export default class CardDeck {

  private _pile : Card[]
  private _discard : Card[]

  public constructor(pile : Card[], discard : Card[]) {
    this._pile = pile
    this._discard = discard
  }

  public get currentCard() : Card {
    return this._pile[0]
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  /**
   * Draws a card from the draw pile.
   * If the pile is empty, the discard pile is reshuffled before drawing.
   * @returns Next card
   */
  public draw() : Card {
    const discardCard = this._pile.shift()
    if (discardCard) {
      this._discard.push(discardCard)
    }
    if (this._pile.length == 0) {
      this._pile = _.shuffle(this._discard)
      this._discard = []
    }
    return this.currentCard
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      discard: this._discard.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new() : CardDeck {
    const pile = _.shuffle(Cards.getAll())
    return new CardDeck(pile, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
