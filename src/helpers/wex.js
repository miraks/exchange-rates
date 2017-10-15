const baseUrl = 'https://wex.nz/api/3'

export default async (from) => {
  const pair = [from, 'USD'].map((part) => part.toLowerCase()).join('_')
  const url = `${baseUrl}/ticker/${pair}`
  const response = await fetch(url)
  const data = await response.json()
  return data[pair].last
}
