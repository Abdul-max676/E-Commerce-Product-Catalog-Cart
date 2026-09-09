import { describe, expect, it } from 'vitest'
import { filterProducts, getProductCategories } from './products.js'

const products = [
  { id: 1, title: 'Blue Phone', category: 'smartphones' },
  { id: 2, title: 'Green Shirt', category: 'mens-shirts' },
  { id: 3, title: 'Phone Case', category: 'mobile-accessories' },
]

describe('product utilities', () => {
  it('matches product titles case-insensitively', () => {
    expect(filterProducts(products, 'PHONE', 'all').map((product) => product.id)).toEqual([1, 3])
  })

  it('filters by category', () => {
    expect(filterProducts(products, '', 'mens-shirts').map((product) => product.id)).toEqual([2])
  })

  it('combines search and category filters', () => {
    expect(filterProducts(products, 'phone', 'mobile-accessories').map((product) => product.id)).toEqual([3])
  })

  it('returns no products when nothing matches', () => {
    expect(filterProducts(products, 'camera', 'all')).toEqual([])
  })

  it('returns sorted unique categories', () => {
    expect(getProductCategories([...products, products[0]])).toEqual(['mens-shirts', 'mobile-accessories', 'smartphones'])
  })
})