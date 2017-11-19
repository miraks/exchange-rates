const baseUrl = 'https://api.coinmarketcap.com/v1'

const coinMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  LTC: 'litecoin',
  BCH: 'bitcoin-cash',
  BTG: 'bitcoin-gold',
  PPC: 'peercoin',
  NMC: 'namecoin'
}

export default async (currency) => {
  const url = `${baseUrl}/ticker/${coinMap[currency]}`
  const response = await fetch(url)
  const data = await response.json()
  return parseFloat(data[0].price_usd)
}
