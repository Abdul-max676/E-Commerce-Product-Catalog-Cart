export function validateCheckoutData(form) {
  const hasEmptyField = Object.values(form).some((value) => !value.trim())
  const hasInvalidEmail = !/^\S+@\S+\.\S+$/.test(form.email)
  const hasInvalidPostalCode = !/^\d{5}(-\d{4})?$/.test(form.postalCode)
  const cardDigits = form.cardNumber.replace(/\s|-/g, '')
  const hasInvalidCardNumber = !/^\d{12,19}$/.test(cardDigits)

  if (hasEmptyField || hasInvalidEmail || hasInvalidPostalCode || hasInvalidCardNumber) return 'Please complete every field with valid information.'
  return ''
}