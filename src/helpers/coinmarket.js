const baseUrl = 'https://api.coinmarketcap.com/v1'

const coinMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  LTC: 'litecoin',
  BCH: 'bitcoin-cash',
  BTG: 'bitcoin-gold',
  DSH: 'dash',
  ZEC: 'zcash',
  NVC: 'novacoin',
  NMC: 'namecoin',
  PPC: 'peercoin'
}

export default async (currency) => {
  const url = `${baseUrl}/ticker/${coinMap[currency]}`
  const response = await fetch(url)
  const data = await response.json()
  return parseFloat(data[0].price_usd)
}
