import { useState } from 'react'
import { convertUsdToNgn, formatCurrency } from '../utils/currency.js'

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function CartDrawer({ items, isOpen, onClose, onQuantityChange, onRemove, onCheckout }) {
  const [promoCode, setPromoCode] = useState('')
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const freeShippingThreshold = 150000
  const subtotalInNaira = convertUsdToNgn(subtotal)
  const shippingProgress = Math.min(100, (subtotalInNaira / freeShippingThreshold) * 100)
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotalInNaira)

  return (
    <>
      {isOpen && <button className="fixed inset-0 z-20 cursor-default bg-blue-950/35" type="button" aria-label="Close cart" onClick={onClose} />}
      <aside className={`fixed bottom-0 right-0 top-0 z-30 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Shopping cart" aria-hidden={!isOpen}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Your bag</p>
            <h2 className="mt-1 text-2xl font-bold">Shopping cart</h2>
          </div>
          <button className="grid size-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" type="button" onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {items.length > 0 && <div className="border-b border-slate-200 px-6 py-4"><div className="flex justify-between text-xs font-bold text-slate-600"><span>{amountUntilFreeShipping ? `Add ${formatCurrency(amountUntilFreeShipping / 1400)} more for FREE shipping` : 'You unlocked FREE shipping'}</span><span>{Math.round(shippingProgress)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${shippingProgress}%` }} /></div></div>}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="text-lg font-bold">Your cart is empty</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Add something you love and it will show up here.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {items.map(({ product, quantity }) => (
                <div className="flex gap-4" key={product.id}>
                  <img className="size-20 rounded-xl bg-slate-100 object-cover" src={product.thumbnail} alt="" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <h3 className="truncate text-sm font-bold">{product.title}</h3>
                      <button className="shrink-0 text-xs font-semibold text-slate-400 hover:text-red-600" type="button" onClick={() => onRemove(product.id)}>Remove</button>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-blue-700">{formatCurrency(product.price * quantity)}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">Size {product.selectedSize || 'M'} · {product.selectedColor || 'Cloud'}</p>
                    <div className="mt-3 inline-flex items-center rounded-lg border border-slate-200">
                      <button className="grid size-8 place-items-center text-lg text-slate-600 hover:bg-slate-100" type="button" onClick={() => onQuantityChange(product.id, quantity - 1)} aria-label={`Decrease ${product.title} quantity`}>-</button>
                      <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                      <button className="grid size-8 place-items-center text-lg text-slate-600 hover:bg-slate-100" type="button" onClick={() => onQuantityChange(product.id, quantity + 1)} aria-label={`Increase ${product.title} quantity`}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 px-6 py-6">
              <div className="flex justify-between text-sm text-slate-500"><span>{totalItems} items</span><span>Shipping calculated at checkout</span></div>
              <div className="mt-3 flex items-center justify-between"><span className="font-bold">Subtotal</span><span className="text-2xl font-bold">{formatCurrency(subtotal)}</span></div>
              <div className="mt-4 flex gap-2"><label className="sr-only" htmlFor="promo-code">Promo code</label><input id="promo-code" className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" placeholder="Promo code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} /><button className="h-11 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:border-blue-300" type="button">Apply</button></div>
              <button className="mt-5 h-12 w-full rounded-xl bg-blue-700 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20" type="button" aria-label="Checkout" onClick={onCheckout}>Proceed to Checkout</button>
              <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">🔒 Secure checkout · Encrypted payments · Buyer protection</p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartDrawer