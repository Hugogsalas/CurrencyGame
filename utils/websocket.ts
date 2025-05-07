import {
  connect as storeConnect,
  disconnect as storeDisconnect,
  store,
  updateTicker,
} from '../redux/currency';
import {
  ChannelObject,
  OuputMessage,
  SubscribeMessage,
  UnsubscribeMessage,
} from '../types/messages';

class WebSocketController {
  private socket: WebSocket | null = null;

  constructor() {}

  connect(productIds: string[], channels: string[]): void {
    this.socket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    this.socket.onopen = () => {
      this.subscribe(productIds, channels);
      store.dispatch(storeConnect());
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    this.socket.onmessage = event => {
      console.log('Received message:', event.data);
      const parsedData = JSON.parse(event.data) as OuputMessage;
      store.dispatch(updateTicker(parsedData));
    };

    this.socket.onerror = error => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    } else {
      console.error('WebSocket is not connected.');
    }
    store.dispatch(storeDisconnect());
  }

  subscribe(productIds: string[], channels: (string | ChannelObject)[]): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const subscribeMessage: SubscribeMessage = {
        type: 'subscribe',
        product_ids: productIds,
        channels: channels,
      };
      this.socket.send(JSON.stringify(subscribeMessage));
      console.log('Sent subscribe message:', subscribeMessage);
    } else {
      console.error('WebSocket is not connected or not open.');
    }
  }

  unsubscribe(channels: string[]): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const unsubscribeMessage: UnsubscribeMessage = {
        type: 'unsubscribe',
        channels: channels,
      };
      this.socket.send(JSON.stringify(unsubscribeMessage));
      console.log('Sent unsubscribe message:', unsubscribeMessage);
    } else {
      console.error('WebSocket is not connected or not open.');
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

export default WebSocketController;
