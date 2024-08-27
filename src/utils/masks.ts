export function maskCurrency(value: string): string {
  const numericValue = value.replace(/[^\d]/g, '');
  const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formattedValue;
}

export function currencyToFloat(currency: string) {
  const numericValue = currency.replace(/[^\d,-]/g, '').replace(',', '.');
  return Number.parseFloat(numericValue);}