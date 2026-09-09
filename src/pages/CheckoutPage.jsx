import { useState } from 'react'
import { formatCurrency } from '../utils/currency.js'

function CheckoutPage({ items, total, onOrderComplete }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const formData = new FormData(event.currentTarget)
      await onOrderComplete({
        email: formData.get('email'),
        full_name: formData.get('full_name'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal_code'),
        items: items.map(({ product, quantity, selectedSize, selectedColor }) => ({ product_id: product.id, quantity, selected_size: selectedSize || '', selected_color: selectedColor || '' })),
      })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Secure checkout</p><h1 className="mt-3 text-5xl font-bold tracking-tight text-blue-950">Complete your order</h1><p className="mt-4 text-slate-600">Express checkout is available through your preferred secure payment method.</p></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><form className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" onSubmit={handleSubmit}><div className="flex gap-3"><button className="h-12 flex-1 rounded-xl bg-blue-950 text-sm font-bold text-white" type="button">Apple Pay</button><button className="h-12 flex-1 rounded-xl border border-slate-200 text-sm font-bold text-blue-950" type="button">Transfer</button></div><div className="my-7 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400"><span className="h-px flex-1 bg-slate-200" /> Or enter details <span className="h-px flex-1 bg-slate-200" /></div><div className="grid gap-4 sm:grid-cols-2"><input name="full_name" className="h-12 rounded-xl border border-slate-200 px-4 text-sm sm:col-span-2" placeholder="Full name" required /><input name="email" className="h-12 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Email" type="email" required /><input name="phone" className="h-12 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Phone number" required /><input name="address" className="h-12 rounded-xl border border-slate-200 px-4 text-sm sm:col-span-2" placeholder="Shipping address" required /><input name="city" className="h-12 rounded-xl border border-slate-200 px-4 text-sm" placeholder="City" required /><input name="postal_code" className="h-12 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Postal code" required /></div>{errorMessage && <p className="mt-4 text-sm font-semibold text-red-600" role="alert">{errorMessage}</p>}<button className="mt-6 h-12 w-full rounded-xl bg-emerald-400 text-sm font-bold text-blue-950 hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating order...' : 'Place order'}</button></form><aside className="h-fit rounded-2xl bg-blue-950 p-6 text-white"><h2 className="text-2xl font-bold">Order summary</h2><div className="mt-6 space-y-4">{items.length ? items.map(({ product, quantity }) => <div className="flex justify-between gap-4 text-sm" key={product.id}><span className="text-blue-200">{product.title} × {quantity}</span><span>{formatCurrency(product.price * quantity)}</span></div>) : <p className="text-blue-200">Your cart is empty.</p>}</div><div className="mt-8 flex justify-between border-t border-white/15 pt-5 text-lg font-bold"><span>Total</span><span>{formatCurrency(total)}</span></div></aside></div></main>
}

export default CheckoutPage
