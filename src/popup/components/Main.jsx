import { h, Component } from 'preact'
import zip from '@/helpers/zip'
import toObject from '@/helpers/to-object'
import mapValues from '@/helpers/map-values'
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

const getRates = {
  moex() {
    return Promise.all(providers.moex.currencies.map((currency) => getMoexRate(currency)))
  },
  coinbase() {
    return getCoinbaseRates().then((rates) => providers.coinbase.currencies.map((currency) => rates[currency]))
  },
  wex() {
    return Promise.all(providers.wex.currencies.map((currency) => getWexRate(currency)))
  }
}

export default class Main extends Component {
  constructor() {
    super()

    this.state = mapValues(providers, () => ({
      loading: false,
      rates: {}
    }))
  }

  async componentWillMount() {
    this.refreshRates()
  }

  async refreshRates() {
    providerIds.forEach((id) => {
      this.setState((state) => ({ ...state, [id]: { ...state[id], loading: true } }))
      getRates[id]().then((rates) => {
        this.setState((state) => ({
          ...state,
          [id]: { ...state[id], loading: false, rates: toObject(zip(providers[id].currencies, rates)) }
        }))
      })
    })
  }

  dataFor(id) {
    const { loading, rates } = this.state[id]
    const { title, currencies } = providers[id]

    const data = loading
      ? []
      : currencies.map((currency) => ({
        id: currency,
        values: [currency, rates[currency].toFixed(2)]
      }))

    return {
      title,
      loading,
      data
    }
  }

  render() {
    return <div className="rates">{providerIds.map((id) => <Table key={id} {...this.dataFor(id)}/>)}</div>
  }
}
