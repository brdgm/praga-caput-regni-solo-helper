import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.pile.length, 'pile size').to.eq(5)
    expect(deck.discard.length, 'discard size').to.eq(0)

    expect(deck.currentCard, 'current card').to.not.undefined
    
    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(5)
    expect(persistence.discard.length, 'discard size').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({
      pile: ['1','3','4'],
      discard: ['2','5']
    })

    expect(deck.pile.length, 'pile size').to.eq(3)
    expect(deck.discard.length, 'discard size').to.eq(2)
    expect(deck.currentCard.id, 'currend card').to.eq('1')

    const card1 = deck.draw()
    expect(card1.id).to.eq('3')

    expect(deck.pile.length, 'pile size').to.eq(2)
    expect(deck.discard.length, 'discard size').to.eq(3)

    const card2 = deck.draw()
    expect(card2.id).to.eq('4')

    expect(deck.pile.length, 'pile size').to.eq(1)
    expect(deck.discard.length, 'discard size').to.eq(4)

    const card3 = deck.draw()
    expect(card3).to.not.undefined

    expect(deck.pile.length, 'pile size').to.eq(5)
    expect(deck.discard.length, 'discard size').to.eq(0)
  })
})
