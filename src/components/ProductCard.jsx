import { useState } from 'react'
import { formatCurrency } from '../utils/currency.js'

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-4 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  )
}

function ProductCard({ product, onAddToCart }) {
  const [isVariantOpen, setIsVariantOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Cloud')
  const secondaryImage = product.images?.[1] || product.thumbnail
  const status = product.discountPercentage > 10 ? `Sale -${Math.round(product.discountPercentage)}%` : product.stock < 20 ? 'Low Stock' : product.rating > 4.5 ? 'Hot' : ''

  const addSelectedProduct = () => {
    onAddToCart({ ...product, selectedSize, selectedColor })
    setIsVariantOpen(false)
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img className="absolute size-full object-cover opacity-100 transition duration-500 group-hover:scale-105 group-hover:opacity-0" src={product.thumbnail} alt={product.title} loading="lazy" onError={(event) => { event.currentTarget.src = '/product-placeholder.svg' }} />
        <img className="size-full object-cover transition duration-500 group-hover:scale-105" src={secondaryImage} alt="" loading="lazy" onError={(event) => { event.currentTarget.src = '/product-placeholder.svg' }} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold capitalize text-slate-700 backdrop-blur">{product.category}</span>
        {status && <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-blue-950">{status}</span>}
        <button className="absolute bottom-4 left-4 right-4 h-10 translate-y-3 rounded-xl bg-blue-950 text-sm font-bold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" type="button" aria-label="Quick add featured product" onClick={addSelectedProduct}>Quick Add</button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold leading-tight text-slate-950">{product.title}</h2>
          <span className="shrink-0 text-lg font-bold text-blue-700">{formatCurrency(product.price)}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <StarIcon />
          <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
          <span>rating</span>
        </div>
        <div className="mt-6 flex gap-2"><button className="h-11 flex-1 rounded-xl border border-blue-950 text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20" type="button" aria-label="Add to cart" onClick={() => onAddToCart(product)}>Quick Add</button><button className="h-11 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-600 hover:border-blue-300" type="button" onClick={() => setIsVariantOpen((isOpen) => !isOpen)}>Options</button></div>
      </div>
      {isVariantOpen && <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"><div className="flex gap-2"><label className="flex-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Size<select className="mt-1 h-9 w-full rounded-lg bg-slate-50 px-2 text-sm font-bold text-slate-900" value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}><option>S</option><option>M</option><option>L</option></select></label><label className="flex-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Color<select className="mt-1 h-9 w-full rounded-lg bg-slate-50 px-2 text-sm font-bold text-slate-900" value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}><option>Cloud</option><option>Ink</option><option>Mint</option></select></label></div><button className="mt-3 h-9 w-full rounded-lg bg-emerald-400 text-xs font-bold text-blue-950" type="button" onClick={addSelectedProduct}>Add selected</button></div>}
    </article>
  )
}

export default ProductCard