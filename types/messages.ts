export type WebSocketMessage =
  | HeartbeatMessage
  | TickerMessage
  | SubscribeMessage
  | UnsubscribeMessage;

export type OuputMessage = HeartbeatMessage | TickerMessage;

/**
 * Represents a heartbeat message used to maintain WebSocket connection.
 *
 * @property type - The type of the message, always 'heartbeat'.
 * @property last_trade_id - The ID of the last trade.
 * @property product_id - The identifier of the trading product (e.g., currency pair).
 * @property sequence - A unique sequence number for the message.
 * @property time - The timestamp of the message in ISO 8601 format.
 */
export type HeartbeatMessage = {
  type: 'heartbeat';
  last_trade_id: number;
  product_id: string;
  sequence: number;
  time: string;
};

/**
 * Represents a ticker message containing real-time market data.
 *
 * @property type - The type of the message, always 'ticker'.
 * @property sequence - A unique sequence number for the message.
 * @property product_id - The identifier of the trading product (e.g., currency pair).
 * @property price - The current price of the product.
 * @property open_24h - The opening price of the product in the last 24 hours.
 * @property volume_24h - The trading volume of the product in the last 24 hours.
 * @property low_24h - The lowest price of the product in the last 24 hours.
 * @property high_24h - The highest price of the product in the last 24 hours.
 * @property volume_30d - The trading volume of the product in the last 30 days.
 * @property best_bid - The current best bid price.
 * @property best_bid_size - The size of the current best bid.
 * @property best_ask - The current best ask price.
 * @property best_ask_size - The size of the current best ask.
 * @property side - Indicates whether the last trade was a 'buy' or 'sell'.
 * @property time - The timestamp of the message in ISO 8601 format.
 * @property trade_id - A unique identifier for the last trade.
 * @property last_size - The size of the last trade.
 */
export type TickerMessage = {
  type: 'ticker';
  sequence: number;
  product_id: string;
  price: string;
  open_24h: string;
  volume_24h: string;
  low_24h: string;
  high_24h: string;
  volume_30d: string;
  best_bid: string;
  best_bid_size: string;
  best_ask: string;
  best_ask_size: string;
  side: 'buy' | 'sell';
  time: string;
  trade_id: number;
  last_size: string;
};

/**
 * Represents a subscription message to subscribe to specific channels.
 *
 * @property type - The type of the message, always 'subscribe'.
 * @property product_ids - An array of product IDs to subscribe to.
 * @property channels - An array of channels or channel objects to subscribe to.
 */
export type SubscribeMessage = {
  type: 'subscribe';
  product_ids: string[];
  channels: (string | ChannelObject)[];
};

/**
 * Represents an unsubscription message to unsubscribe from specific channels.
 *
 * @property type - The type of the message, always 'unsubscribe'.
 * @property channels - An array of channels to unsubscribe from.
 */
export type UnsubscribeMessage = {
  type: 'unsubscribe';
  channels: string[];
};

/**
 * Represents a channel object used in subscription messages.
 *
 * @property name - The name of the channel.
 * @property product_ids - An array of product IDs associated with the channel.
 */
export type ChannelObject = {
  name: string;
  product_ids: string[];
};
