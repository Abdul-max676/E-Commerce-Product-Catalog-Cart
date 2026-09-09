export function addToCart(items, product) {
  const existingItem = items.find((item) => item.product.id === product.id)
  if (existingItem) {
    return items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  return [...items, { product, quantity: 1 }]
}

export function updateCartQuantity(items, productId, quantity) {
  if (quantity < 1) return removeFromCart(items, productId)
  return items.map((item) => item.product.id === productId ? { ...item, quantity } : item)
}

export function removeFromCart(items, productId) {
  return items.filter((item) => item.product.id !== productId)
}

export function getCartItemCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartSubtotal(items) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}
