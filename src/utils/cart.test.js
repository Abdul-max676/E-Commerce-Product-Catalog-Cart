import { describe, expect, it } from 'vitest'
import { addToCart, getCartItemCount, getCartSubtotal, removeFromCart, updateCartQuantity } from './cart.js'

const firstProduct = { id: 1, title: 'Notebook', price: 12.5 }
const secondProduct = { id: 2, title: 'Pen', price: 3 }

const initialItems = [{ product: firstProduct, quantity: 2 }]

describe('cart utilities', () => {
  it('adds a new product with quantity one', () => {
    expect(addToCart([], firstProduct)).toEqual([{ product: firstProduct, quantity: 1 }])
  })

  it('increments an existing product instead of duplicating it', () => {
    expect(addToCart(initialItems, firstProduct)).toEqual([{ product: firstProduct, quantity: 3 }])
  })

  it('updates quantity and removes products below one', () => {
    const withSecondProduct = addToCart(initialItems, secondProduct)
    expect(updateCartQuantity(withSecondProduct, secondProduct.id, 4)).toEqual([
      { product: firstProduct, quantity: 2 },
      { product: secondProduct, quantity: 4 },
    ])
    expect(updateCartQuantity(withSecondProduct, secondProduct.id, 0)).toEqual(initialItems)
  })

  it('calculates item count and subtotal', () => {
    const items = [...initialItems, { product: secondProduct, quantity: 3 }]
    expect(getCartItemCount(items)).toBe(5)
    expect(getCartSubtotal(items)).toBe(34)
  })

  it('removes a product by id', () => {
    expect(removeFromCart(initialItems, firstProduct.id)).toEqual([])
  })
})
