const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export async function fetchProducts(fetcher, signal) {
  try {
    const response = await fetcher(`${API_BASE_URL}/products/`, { signal })
    if (!response.ok) throw new Error('Unable to load products')
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error
    const response = await fetcher('https://dummyjson.com/products?limit=0', { signal })
    if (!response.ok) throw new Error('Unable to load products')
    const data = await response.json()
    return data.products
  }
}

export async function createOrder(fetcher, orderData) {
  const response = await fetcher(`${API_BASE_URL}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Unable to create order')
  }
  return response.json()
}