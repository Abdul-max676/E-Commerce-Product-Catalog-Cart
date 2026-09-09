export const USD_TO_NGN = 1400

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export function convertUsdToNgn(amount) {
  return amount * USD_TO_NGN
}

export function formatCurrency(amount) {
  return nairaFormatter.format(convertUsdToNgn(amount))
}