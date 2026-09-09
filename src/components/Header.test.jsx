/** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import Header from './Header.jsx'

describe('Header mobile navigation controls', () => {
  it('uses distinct labels for the menu trigger and its close action', () => {
    render(
      <Header
        searchTerm=""
        selectedCategory="all"
        categories={['smartphones']}
        cartItemCount={2}
        wishlistCount={3}
        onSearchChange={() => {}}
        onCategoryChange={() => {}}
        onCartOpen={() => {}}
        onMenuOpen={() => {}}
      />,
    )

    expect(screen.getByRole('button', { name: 'Open mobile menu' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close mobile menu' })).not.toBeInTheDocument()
  })
})
