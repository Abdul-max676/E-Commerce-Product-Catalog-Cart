import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileDrawer from './components/MobileDrawer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { addToCart, getCartItemCount, getCartSubtotal, removeFromCart, updateCartQuantity } from './utils/cart.js'
import { filterProducts, getProductCategories } from './utils/products.js'
import { readStoredCart, writeStoredCart } from './utils/storage.js'
import { createOrder, fetchProducts } from './utils/api.js'

const cartStorageKey = 'marketly-cart'

function Storefront() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [minRating, setMinRating] = useState('0')
  const [maxPrice, setMaxPrice] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [cartItems, setCartItems] = useState(() => readStoredCart(localStorage, cartStorageKey))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const loadProducts = async (signal) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      setProducts(await fetchProducts(fetch, signal))
    } catch (error) {
      if (error.name !== 'AbortError') setErrorMessage(error.message)
    } finally {
      if (!signal.aborted) setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    loadProducts(controller.signal)
    return () => controller.abort()
  }, [])

  useEffect(() => writeStoredCart(localStorage, cartStorageKey, cartItems), [cartItems])

  useEffect(() => {
    const closeOverlays = (event) => {
      if (event.key !== 'Escape') return
      if (isCheckoutOpen) setIsCheckoutOpen(false)
      else if (isCartOpen) setIsCartOpen(false)
      else setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', closeOverlays)
    return () => window.removeEventListener('keydown', closeOverlays)
  }, [isCartOpen, isCheckoutOpen])

  const categories = getProductCategories(products)
  const filteredProducts = filterProducts(products, searchTerm, selectedCategory).filter((product) => !minRating || product.rating >= Number(minRating)).filter((product) => maxPrice === 'all' || product.price <= Number(maxPrice)).filter((product) => !onlyDiscounted || product.discountPercentage > 0).sort((first, second) => {
    if (sortBy === 'price-low') return first.price - second.price
    if (sortBy === 'popular') return second.rating - first.rating
    if (sortBy === 'newest') return second.id - first.id
    return 0
  })
  const searchSuggestions = searchTerm ? products.filter((product) => product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())) : []

  const handleAddToCart = (product) => {
    setCartItems((items) => addToCart(items, product))
    setToastMessage(`${product.title} added to cart`)
    window.setTimeout(() => setToastMessage(''), 2400)
  }
  const handleQuickFilter = (filter) => {
    setSelectedCategory('all'); setSearchTerm(''); setMinRating('0'); setMaxPrice('all'); setOnlyDiscounted(filter === 'Discounted')
    if (filter === 'New Hits') setSortBy('newest')
    else if (filter === 'Bestsellers') setMinRating('4.5')
    else if (filter === 'Under ₦70,000') setMaxPrice('50')
    else setSortBy('featured')
    navigate('/shop')
  }
  const retryProducts = () => loadProducts(new AbortController().signal)
  const openCheckout = () => { setIsCartOpen(false); navigate('/checkout') }
  const completeOrder = async (orderData) => {
    if (orderData) await createOrder(fetch, orderData)
    setCartItems([])
    setIsCheckoutOpen(false)
    setToastMessage('Your order has been confirmed')
    navigate('/')
  }

  return <div className="min-h-screen bg-slate-50 text-slate-950"><Header searchTerm={searchTerm} selectedCategory={selectedCategory} categories={categories} searchSuggestions={searchSuggestions} cartItemCount={getCartItemCount(cartItems)} wishlistCount={3} onSearchChange={setSearchTerm} onCategoryChange={setSelectedCategory} onCartOpen={() => setIsCartOpen(true)} onMenuOpen={() => setIsMobileMenuOpen(true)} onSuggestionSelect={setSearchTerm} /><MobileDrawer isOpen={isMobileMenuOpen} searchTerm={searchTerm} cartItemCount={getCartItemCount(cartItems)} onClose={() => setIsMobileMenuOpen(false)} onSearchChange={setSearchTerm} onCartOpen={() => setIsCartOpen(true)} onNavigate={navigate} /><Routes><Route path="/" element={<HomePage products={products} onAddToCart={handleAddToCart} onQuickFilter={handleQuickFilter} onShop={() => { setSortBy('popular'); navigate('/shop') }} onExplore={() => navigate('/shop')} />} /><Route path="/shop" element={<ShopPage products={products} categories={categories} filteredProducts={filteredProducts} isLoading={isLoading} errorMessage={errorMessage} searchTerm={searchTerm} selectedCategory={selectedCategory} minRating={minRating} maxPrice={maxPrice} sortBy={sortBy} onSearchChange={setSearchTerm} onCategoryChange={setSelectedCategory} onRatingChange={setMinRating} onMaxPriceChange={setMaxPrice} onSortChange={setSortBy} onRetry={retryProducts} onAddToCart={handleAddToCart} />} /><Route path="/product/:slug" element={<ProductDetailPage products={products} onAddToCart={handleAddToCart} />} /><Route path="/checkout" element={<CheckoutPage items={cartItems} total={getCartSubtotal(cartItems)} onOrderComplete={completeOrder} />} /><Route path="/contact" element={<ContactPage />} /></Routes><Footer /><CartDrawer items={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onQuantityChange={(productId, quantity) => setCartItems((items) => updateCartQuantity(items, productId, quantity))} onRemove={(productId) => setCartItems((items) => removeFromCart(items, productId))} onCheckout={openCheckout} /><CheckoutModal isOpen={isCheckoutOpen} total={getCartSubtotal(cartItems)} onClose={() => setIsCheckoutOpen(false)} onOrderComplete={completeOrder} />{toastMessage && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-xl" role="status">{toastMessage}</div>}</div>
}

function App() {
  return <BrowserRouter><Storefront /></BrowserRouter>
}

export default App
