import { describe, expect, it } from 'vitest'
import { validateCheckoutData } from './checkout.js'

const validForm = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  address: '10 Main Street',
  city: 'Austin',
  postalCode: '78701',
  cardNumber: '4242 4242 4242 4242',
}

describe('checkout validation', () => {
  it('accepts a complete form with a valid email', () => {
    expect(validateCheckoutData(validForm)).toBe('')
  })

  it('rejects incomplete form data', () => {
    expect(validateCheckoutData({ ...validForm, city: '' })).toContain('valid information')
  })

  it('rejects an invalid email address', () => {
    expect(validateCheckoutData({ ...validForm, email: 'alex' })).toContain('valid information')
  })

  it('accepts formatted card numbers and ZIP+4 postal codes', () => {
    expect(validateCheckoutData({ ...validForm, postalCode: '78701-1234', cardNumber: '4242-4242-4242-4242' })).toBe('')
  })

  it('rejects invalid postal and card values', () => {
    expect(validateCheckoutData({ ...validForm, postalCode: 'ABC', cardNumber: '123' })).toContain('valid information')
  })
})