export function filterProducts(products, searchTerm, selectedCategory) {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  return products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(normalizedSearch)
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })
}

export function getProductCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort()
}