import { describe, expect, it, vi } from 'vitest'
import { fetchProducts } from './api.js'

describe('product API utility', () => {
  it('returns products from a successful response', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ([{ id: 1 }]) })
    await expect(fetchProducts(fetcher, 'signal')).resolves.toEqual([{ id: 1 }])
    expect(fetcher).toHaveBeenCalledWith('http://127.0.0.1:8000/api/products/', { signal: 'signal' })
  })

  it('throws a useful error for failed responses', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false })
    await expect(fetchProducts(fetcher)).rejects.toThrow('Unable to load products')
  })

  it('preserves fetch errors such as aborts', async () => {
    const abortError = new DOMException('The operation was aborted.', 'AbortError')
    const fetcher = vi.fn().mockRejectedValue(abortError)
    await expect(fetchProducts(fetcher)).rejects.toThrow('The operation was aborted.')
  })
})