import {ImageSourcePropType} from 'react-native';

export enum Currency {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
  XRP = 'XRP',
  DOGE = 'DOGE',
  SOL = 'SOL',
}

export type CurrencyRates = {
  currency: Currency;
  rates: {
    [key: string]: string;
  };
};

export type CurrencySection = {
  icon: ImageSourcePropType;
  color: string;
};
