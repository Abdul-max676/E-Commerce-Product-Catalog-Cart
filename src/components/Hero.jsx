function Hero({ image, onShopBestSellers, onExploreCatalog, onQuickFilter }) {
  const quickFilters = ['All Items', 'New Hits', 'Bestsellers', 'Discounted', 'Under ₦70,000']

  return (
    <section className="overflow-hidden border-b border-blue-100 bg-[#dbeafe]" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">The everyday edit / 2026</p>
          <h1 id="hero-heading" className="max-w-2xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-blue-950 sm:text-7xl">Elevate Your Everyday Essentials</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-blue-900/70">Curated premium products built for quality, style, and utility.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="h-12 rounded-xl bg-blue-950 px-5 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20" type="button" onClick={onShopBestSellers}>Shop Best Sellers</button>
            <button className="h-12 rounded-xl border border-blue-900/20 bg-white/60 px-5 text-sm font-bold text-blue-950 transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20" type="button" onClick={onExploreCatalog}>Explore Catalog</button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Quick catalog filters">
            {quickFilters.map((filter) => <button key={filter} className="rounded-full border border-blue-900/15 bg-white/50 px-3.5 py-2 text-xs font-bold text-blue-900 transition hover:bg-white" type="button" onClick={() => onQuickFilter(filter)}>{filter}</button>)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div className="absolute -inset-5 rounded-[2rem] bg-emerald-300/35 blur-2xl" />
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-blue-950/15">
            {image && <img className="size-full object-cover" src={image} alt="Featured Marketly product" />}
            <div className="absolute bottom-4 left-4 rounded-xl bg-blue-950 px-4 py-3 text-white shadow-lg"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">Marketly pick</p><p className="mt-1 text-sm font-bold">Built to be lived in.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
