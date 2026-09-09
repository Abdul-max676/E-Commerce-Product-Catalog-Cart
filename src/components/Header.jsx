import { useState } from 'react'

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  )
}

function ShoppingBagIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path d="M5.5 8.5h13l-.7 11h-11.6l-.7-11Z" strokeLinejoin="round" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function HeartIcon() {
  return <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" strokeLinejoin="round" /></svg>
}

function MenuIcon() {
  return <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
}

function Header({ searchTerm, selectedCategory, categories, searchSuggestions = [], cartItemCount, wishlistCount = 0, onSearchChange, onCategoryChange, onCartOpen, onMenuOpen, onSuggestionSelect = () => {} }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-slate-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:py-6">
        <a className="flex shrink-0 items-center gap-2 text-slate-950" href="/" aria-label="Marketly home">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-700 text-lg font-bold text-white shadow-sm shadow-blue-700/20">M</span>
          <span className="text-xl font-bold tracking-tight">Marketly</span>
        </a>

        <nav className="hidden items-center gap-5 text-xs font-bold text-slate-600 xl:flex" aria-label="Primary navigation"><a className="hover:text-blue-700" href="#catalog">Catalog</a><a className="hover:text-blue-700" href="#catalog">New Arrivals</a><a className="hover:text-blue-700" href="#catalog">Best Sellers</a><a className="hover:text-blue-700" href="#catalog">Sale</a><a className="hover:text-blue-700" href="#footer">About Us</a></nav>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <label className="relative block">
            <span className="sr-only">Search products</span>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <SearchIcon />
            </span>
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products"
            />
            </label>
            {isSearchFocused && searchTerm && searchSuggestions.length > 0 && <div className="absolute left-0 right-0 top-14 z-30 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Suggested products</p>{searchSuggestions.slice(0, 4).map((product) => <button key={product.id} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50" type="button" onMouseDown={() => { onSuggestionSelect(product.title); setIsSearchFocused(false) }}><img className="size-9 rounded-md object-cover" src={product.thumbnail} alt="" /><span className="truncate text-sm font-bold text-slate-800">{product.title}</span></button>)}</div>}
          </div>

          <label className="relative sm:w-52">
            <span className="sr-only">Filter by category</span>
            <select
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold capitalize text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              <ChevronDownIcon />
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2 lg:shrink-0">
        <button className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-300 md:hidden" type="button" aria-label="Open mobile menu" onClick={onMenuOpen}><MenuIcon /></button>
        <button className="relative hidden size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-300 sm:grid" type="button" aria-label={`Wishlist with ${wishlistCount} items`}><HeartIcon /><span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-emerald-400 text-[9px] font-bold text-blue-950">{wishlistCount}</span></button>
        <button
          className="relative flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 lg:flex-none"
          type="button"
          onClick={onCartOpen}
          aria-label={`Open cart with ${cartItemCount} items`}
        >
          <ShoppingBagIcon />
          <span>Cart</span>
          <span className="grid min-w-6 place-items-center rounded-full bg-emerald-400 px-1.5 py-0.5 text-xs font-bold text-blue-950">
            {cartItemCount}
          </span>
        </button>
        </div>
      </div>
    </header>
  )
}

export default Header