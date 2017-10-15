import { h, Component } from 'preact'
import zip from '@/helpers/zip'
import toObject from '@/helpers/to-object'
import getMoexRate from '@/helpers/moex'
import getCoinbaseRates from '@/helpers/coinbase'
import getWexRate from '@/helpers/wex'
import Table from '@/popup/components/Table'

const providerIds = ['moex', 'coinbase', 'wex']
const providers = {
  moex: {
    title: 'MOEX',
    currencies: ['USD', 'EUR']
  },
  coinbase: {
    title: 'Coinbase',
    currencies: ['BTC', 'ETH', 'LTC']
  },
  wex: {
    title: 'Wex',
    currencies: ['BTC', 'ETH', 'LTC', 'BCH']
  }
}

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      coinbase: {},
      wex: {}
    }
  }

  async componentWillMount() {
    this.refreshRates()
  }

  async refreshRates() {
    this.setState((state) => ({ ...state, loading: true }))

    const moexPromises = Promise.all(providers.moex.currencies.map((currency) => getMoexRate(currency)))
    const wexPromises = Promise.all(providers.wex.currencies.map((currency) => getWexRate(currency)))
    const promises = Promise.all([moexPromises, getCoinbaseRates(), wexPromises])
    const [moex, coinbase, wex] = await promises

    this.setState((state) => ({
      ...state,
      loading: false,
      moex: toObject(zip(providers.moex.currencies, moex)),
      coinbase,
      wex: toObject(zip(providers.wex.currencies, wex))
    }))
  }

  dataFor(id) {
    const prices = this.state[id]
    const { title, currencies } = providers[id]

    return {
      title,
      data: currencies.map((currency) => ({
        id: currency,
        values: [currency, prices[currency].toFixed(2)]
      }))
    }
  }

  render() {
    const { loading } = this.state

    return (
      <div className="rates">
        {loading && <div className="rates_loading">Loading</div>}
        {!loading && (
          <div className="rates_data">{providerIds.map((id) => <Table key={id} {...this.dataFor(id)}/>)}</div>
        )}
      </div>
    )
  }
}
