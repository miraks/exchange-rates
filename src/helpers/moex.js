const currencyToSecId = {
  USD: 'USD000000TOD',
  EUR: 'EUR_RUB__TOD'
}

const baseUrl = 'https://iss.moex.com/iss/engines/currency/markets/selt/boards/CETS/securities'
const query = 'iss.meta=off&iss.only=marketdata&marketdata.columns=LAST'

export default async (currency) => {
  const url = `${baseUrl}/${currencyToSecId[currency]}.json?${query}`
  const response = await fetch(url)
  const data = await response.json()
  return data.marketdata.data[0][0]
}
