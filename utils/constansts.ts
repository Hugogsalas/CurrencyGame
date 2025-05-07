import {Currency, CurrencySection} from '../types/currency';

export const CurrenciesFlags: Record<Currency, CurrencySection> = {
  [Currency.BTC]: {
    icon: require('../assets/bitcoin-btc-logo.png'),
    color: '#F7931A',
  },
  [Currency.ETH]: {
    icon: require('../assets/ethereum-eth-logo.png'),
    color: '#3C3C3D',
  },
  [Currency.USDT]: {
    icon: require('../assets/tether-usdt-logo.png'),
    color: '#26A17B',
  },
  [Currency.XRP]: {
    icon: require('../assets/xrp-xrp-logo.png'),
    color: '#4B5B8A',
  },
  [Currency.DOGE]: {
    icon: require('../assets/dogecoin-doge-logo.png'),
    color: '#F3BA2F',
  },
  [Currency.SOL]: {
    icon: require('../assets/solana-sol-logo.png'),
    color: '#FF8C00',
  },
};
