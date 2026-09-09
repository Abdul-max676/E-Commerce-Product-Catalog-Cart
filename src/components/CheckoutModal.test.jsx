/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CheckoutModal from './CheckoutModal.jsx'

afterEach(cleanup)

function renderCheckout() {
  return render(
    <CheckoutModal
      isOpen
      total={24.5}
      onClose={vi.fn()}
      onOrderComplete={vi.fn()}
    />,
  )
}

describe('CheckoutModal', () => {
  it('shows validation feedback for an incomplete form', async () => {
    renderCheckout()

    fireEvent.submit(screen.getByRole('button', { name: 'Place mock order' }).closest('form'))

    expect(screen.getByRole('alert')).toHaveTextContent('Please complete every field')
  })

  it('submits a complete form', () => {
    const onOrderComplete = vi.fn()
    render(
      <CheckoutModal isOpen total={24.5} onClose={vi.fn()} onOrderComplete={onOrderComplete} />,
    )

    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Alex Morgan' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'alex@example.com' } })
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '10 Main Street' } })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Austin' } })
    fireEvent.change(screen.getByLabelText('Postal code'), { target: { value: '78701' } })
    fireEvent.change(screen.getByLabelText('Card number'), { target: { value: '4242 4242 4242 4242' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Place mock order' }).closest('form'))

    expect(onOrderComplete).toHaveBeenCalledOnce()
    expect(screen.getByRole('heading', { name: 'Order confirmed' })).toBeInTheDocument()
  })
})
