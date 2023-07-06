import advanceTilePosition from '@/util/advanceTilePosition'
import { expect } from 'chai'

describe('util/advanceTilePosition', () => {
  it('advanceTilePosition', () => {
    expect(advanceTilePosition(1)).to.eq(1)
    expect(advanceTilePosition(1,1)).to.eq(2)
    expect(advanceTilePosition(2,2)).to.eq(4)
    expect(advanceTilePosition(4,1)).to.eq(1)
  })
})
