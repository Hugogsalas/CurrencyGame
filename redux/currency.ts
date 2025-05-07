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

/**
 * @file currency.ts
 * @description This file defines a Redux slice for managing currency-related state in the application.
 * It includes state management for connection status and messages related to currency updates.
 * The slice is created using Redux Toolkit's `createSlice` function.
 *
 * @module currencySlice
 */

/**
 * @typedef {Object} CurrencyState
 * @property {boolean} connected - Indicates whether the currency connection is active.
 * @property {Partial<Record<CurrencyUSDEquivalent, CurrencyMessage>>} messages - Stores messages for each currency pair (e.g., currency-USD).
 */

/**
 * @typedef {Object} CurrencyMessage
 * @property {TickerMessage | undefined} ticker - The latest ticker message for the currency pair.
 * @property {HeartbeatMessage | undefined} heartbeat - The latest heartbeat message for the currency pair.
 */

/**
 * @typedef {Object} CurrencyAction
 * @property {CurrencyMessagePayload} payload - The payload containing the message data.
 */

/**
 * @description The `currencySlice` manages the state for currency-related operations.
 * It includes the following reducers:
 * - `connect`: Sets the `connected` state to `true`.
 * - `disconnect`: Sets the `connected` state to `false`.
 * - `updateTicker`: Updates the ticker or heartbeat message for a specific currency pair based on the message type.
 *
 */
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
