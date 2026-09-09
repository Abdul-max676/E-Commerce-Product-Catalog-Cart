function FilterBar({ categories, selectedCategory, minRating, maxPrice, sortBy, onCategoryChange, onRatingChange, onMaxPriceChange, onSortChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm" aria-label="Product filters">
      <label className="flex min-w-40 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">Category<select className="min-w-0 flex-1 bg-transparent text-sm font-bold capitalize text-slate-900 outline-none" value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}><option value="all">All</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
      <label className="flex min-w-36 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">Price<select className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none" value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value)}><option value="all">Any price</option><option value="50">Under ₦70k</option><option value="100">Under ₦140k</option><option value="250">Under ₦350k</option></select></label>
      <label className="flex min-w-32 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">Rating<select className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none" value={minRating} onChange={(event) => onRatingChange(event.target.value)}><option value="0">Any rating</option><option value="4">4+ stars</option><option value="4.5">4.5+ stars</option></select></label>
      <label className="flex min-w-40 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">Sort<select className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none" value={sortBy} onChange={(event) => onSortChange(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price low-high</option><option value="popular">Popularity</option><option value="newest">Newest</option></select></label>
    </div>
  )
}

export default FilterBar
