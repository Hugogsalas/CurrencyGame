import {ImageSourcePropType} from 'react-native';

/**
 * Enum representing various types of currencies.
 *
 * @enum {string}
 * @property {string} BTC - Bitcoin currency.
 * @property {string} ETH - Ethereum currency.
 * @property {string} USDT - Tether currency.
 * @property {string} XRP - Ripple currency.
 * @property {string} DOGE - Dogecoin currency.
 * @property {string} SOL - Solana currency.
 */
export enum Currency {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
  XRP = 'XRP',
  DOGE = 'DOGE',
  SOL = 'SOL',
}

/**
 * Represents the exchange rates for a specific currency.
 *
 * @typedef {CurrencyRates}
 * @property {Currency} currency - The base currency for which the rates are defined.
 * @property {Object.<string, string>} rates - A mapping of currency codes to their respective exchange rates as strings.
 */
export type CurrencyRates = {
  currency: Currency;
  rates: {
    [key: string]: string;
  };
};
/**
 * Represents the state of the currency messages.
 *
 * @typedef {CurrencySection}
 * @property {string} icon - The icon representing the currency.
 * @property {string} color - The color associated with the currency.
 *
 */
export type CurrencySection = {
  icon: ImageSourcePropType;
  color: string;
};
