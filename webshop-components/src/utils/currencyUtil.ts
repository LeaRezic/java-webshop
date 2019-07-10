export const getFormattedCurrency = (amount: number, currency: string = 'kn'): string => {
  return `${roundAmount(amount)} ${currency}`
}

export const roundAmount = (amount: number, decimals: number = 2): string => {
  return amount.toFixed(decimals);
}
