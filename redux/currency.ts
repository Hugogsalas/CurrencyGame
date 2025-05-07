import {createSlice, configureStore} from '@reduxjs/toolkit';
import {Currency} from '../types/currency';
import {HeartbeatMessage, OuputMessage, TickerMessage} from '../types/messages';

export type CurrencyUSDEquivalent = `${Currency}-USD`;

export type CurrencyState = {
  connected: boolean;
  messages: {
    [c in CurrencyUSDEquivalent]: {
      ticker?: TickerMessage;
      heartbeat?: HeartbeatMessage;
    };
  };
};

export type CurrencyAction = {
  type: string;
  payload: OuputMessage;
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    connected: false,
    messages: Object.values(Currency).reduce((acc, currency) => {
      acc[(currency + '-USD') as CurrencyUSDEquivalent] = {
        ticker: undefined,
        heartbeat: undefined,
      };
      return acc;
    }, {} as Partial<CurrencyState['messages']>),
  } as CurrencyState,
  reducers: {
    connect: state => {
      state.connected = true;
    },
    disconnect: state => {
      state.connected = false;
    },
    updateTicker: (state, action: CurrencyAction) => {
      const message = action.payload;

      const currency = message.product_id as CurrencyUSDEquivalent;

      switch (message.type) {
        case 'heartbeat':
          state.messages[currency].heartbeat = message as HeartbeatMessage;
          break;
        case 'ticker':
          state.messages[currency].ticker = message as TickerMessage;
          break;
        default:
          return state;
      }
    },
  },
});

export const {connect, disconnect, updateTicker} = currencySlice.actions;

export const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectConnected = (state: RootState) => state.currency.connected;

export const selectCurrencyMessages = (
  state: RootState,
  currency: CurrencyUSDEquivalent,
) => state.currency.messages[currency];
