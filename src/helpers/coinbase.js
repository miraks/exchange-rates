import mapValues from '@/helpers/map-values'

const url = 'https://api.coinbase.com/v2/exchange-rates?currency=USD'

export default async () => {
  const response = await fetch(url)
  const { data } = await response.json()
  return mapValues(data.rates, (rate) => 1 / rate)
}
