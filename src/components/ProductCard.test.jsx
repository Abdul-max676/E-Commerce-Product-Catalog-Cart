/** @vitest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductCard from './ProductCard.jsx'

const product = {
  id: 1,
  title: 'Blue Phone',
  category: 'smartphones',
  price: 299.99,
  rating: 4.5,
  thumbnail: '/phone.jpg',
}

describe('ProductCard', () => {
  it('sends the product when Add to cart is clicked', () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={product} onAddToCart={onAddToCart} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))

    expect(onAddToCart).toHaveBeenCalledWith(product)
  })
})
