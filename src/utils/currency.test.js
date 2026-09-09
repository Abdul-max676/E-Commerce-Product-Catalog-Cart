import { describe, expect, it } from 'vitest'
import { USD_TO_NGN, convertUsdToNgn, formatCurrency } from './currency.js'

describe('currency utilities', () => {
  it('converts USD amounts using the configured exchange rate', () => {
    expect(USD_TO_NGN).toBe(1400)
    expect(convertUsdToNgn(100)).toBe(140000)
  })

  it('formats converted amounts as whole Nigerian Naira', () => {
    expect(formatCurrency(100)).toBe('₦140,000')
    expect(formatCurrency(9.99)).toBe('₦13,986')
  })
})