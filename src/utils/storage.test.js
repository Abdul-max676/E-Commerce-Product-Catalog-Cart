import { describe, expect, it } from 'vitest'
import { readStoredCart, writeStoredCart } from './storage.js'

function createStorage(value) {
  let storedValue = value
  return {
    getItem: () => storedValue,
    setItem: (_, nextValue) => { storedValue = nextValue },
  }
}

describe('cart storage utilities', () => {
  it('reads a stored cart array', () => {
    const cart = [{ product: { id: 1 }, quantity: 2 }]
    expect(readStoredCart(createStorage(JSON.stringify(cart)), 'marketly-cart')).toEqual(cart)
  })

  it('returns an empty cart for malformed or non-array data', () => {
    expect(readStoredCart(createStorage('{bad json'), 'marketly-cart')).toEqual([])
    expect(readStoredCart(createStorage(JSON.stringify({ quantity: 1 })), 'marketly-cart')).toEqual([])
  })

  it('serializes cart updates', () => {
    const storage = createStorage(null)
    const cart = [{ product: { id: 4 }, quantity: 1 }]
    writeStoredCart(storage, 'marketly-cart', cart)
    expect(readStoredCart(storage, 'marketly-cart')).toEqual(cart)
  })
})