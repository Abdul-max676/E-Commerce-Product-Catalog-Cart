export function readStoredCart(storage, key) {
  try {
    const storedCart = JSON.parse(storage.getItem(key))
    return Array.isArray(storedCart) ? storedCart : []
  } catch {
    return []
  }
}

export function writeStoredCart(storage, key, cartItems) {
  storage.setItem(key, JSON.stringify(cartItems))
}