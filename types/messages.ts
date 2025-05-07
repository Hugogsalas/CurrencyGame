export type WebSocketMessage =
  | HeartbeatMessage
  | TickerMessage
  | SubscribeMessage
  | UnsubscribeMessage;

export type OuputMessage = HeartbeatMessage | TickerMessage;

export interface HeartbeatMessage {
  type: 'heartbeat';
  last_trade_id: number;
  product_id: string;
  sequence: number;
  time: string; // ISO 8601 timestamp
}

export interface TickerMessage {
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
  time: string; // ISO 8601 timestamp
  trade_id: number;
  last_size: string;
}

export interface SubscribeMessage {
  type: 'subscribe';
  product_ids: string[];
  channels: (string | ChannelObject)[];
}

export interface UnsubscribeMessage {
  type: 'unsubscribe';
  channels: string[];
}

export interface ChannelObject {
  name: string;
  product_ids: string[];
}
