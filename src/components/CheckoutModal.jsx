import { useState } from 'react'
import { validateCheckoutData } from '../utils/checkout.js'
import { formatCurrency } from '../utils/currency.js'

const initialForm = { name: '', email: '', address: '', city: '', postalCode: '', cardNumber: '' }

function CheckoutModal({ isOpen, total, onClose, onOrderComplete }) {
  const [form, setForm] = useState(initialForm)
  const [errorMessage, setErrorMessage] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  if (!isOpen) return null

  const handleChange = (event) => {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
    setErrorMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationMessage = validateCheckoutData(form)
    if (validationMessage) {
      setErrorMessage(validationMessage)
      return
    }
    onOrderComplete()
    setIsComplete(true)
  }

  const handleClose = () => {
    setForm(initialForm)
    setErrorMessage('')
    setIsComplete(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-blue-950/45 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="checkout-heading">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        {isComplete ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div>
            <h2 id="checkout-heading" className="mt-5 text-3xl font-bold">Order confirmed</h2>
            <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">Thanks for shopping with Marketly. Your mock order is on its way to {form.email}.</p>
            <button className="mt-8 h-12 w-full rounded-xl bg-blue-950 text-sm font-bold text-white transition hover:bg-blue-800" type="button" onClick={handleClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Almost there</p><h2 id="checkout-heading" className="mt-1 text-3xl font-bold">Checkout</h2></div>
              <button className="text-2xl leading-none text-slate-400 hover:text-slate-950" type="button" onClick={handleClose} aria-label="Close checkout">×</button>
            </div>
            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold">Full name<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" name="name" value={form.name} onChange={handleChange} required /></label>
              <label className="block text-sm font-semibold">Email<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" type="email" name="email" value={form.email} onChange={handleChange} required /></label>
              <label className="block text-sm font-semibold">Address<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" name="address" value={form.address} onChange={handleChange} required /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">City<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" name="city" value={form.city} onChange={handleChange} required /></label>
                <label className="block text-sm font-semibold">Postal code<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" name="postalCode" value={form.postalCode} onChange={handleChange} required /></label>
              </div>
              <label className="block text-sm font-semibold">Card number<input className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" inputMode="numeric" name="cardNumber" placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={handleChange} required /></label>
              {errorMessage && <p className="text-sm font-semibold text-red-600" role="alert">{errorMessage}</p>}
              <div className="flex items-center justify-between border-t border-slate-200 pt-5"><span className="font-bold">Total</span><span className="text-2xl font-bold">{formatCurrency(total)}</span></div>
              <button className="h-12 w-full rounded-xl bg-blue-700 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20" type="submit">Place mock order</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal