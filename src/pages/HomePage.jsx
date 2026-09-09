import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import TrustBar from '../components/TrustBar.jsx'

function HomePage({ products, onAddToCart, onQuickFilter, onShop, onExplore }) {
  return <><Hero image={products[0]?.images?.[0] || products[0]?.thumbnail} onShopBestSellers={onShop} onExploreCatalog={onExplore} onQuickFilter={onQuickFilter} /><section className="mx-auto max-w-7xl px-5 py-14 sm:px-8" aria-labelledby="home-products"><div className="flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">The shortlist</p><h2 id="home-products" className="mt-2 text-3xl font-bold text-blue-950">Top sellers, thoughtfully chosen</h2></div><a className="text-sm font-bold text-blue-700 hover:text-blue-950" href="/shop">View all →</a></div><div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}</div></section><TrustBar /></>
}

export default HomePage
