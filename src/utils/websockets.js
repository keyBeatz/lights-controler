import {wsUrl} from "Utils/settings";

/**
 * Websocket connection auto-with reconnect
 */
class WebsocketConnection {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.onmessages = [];
    this.connect();
    this.onopen = () => {};
  }

  getWS = () => this.ws;
  isConnected = () => this.ws.readyState === this.ws.OPEN;
  isConnecting = () => this.ws.readyState === this.ws.CONNECTING;

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onClose;
    this.ws.onmessage = this.dispatcher;
    this.ws.onopen = this.onopen;
  }

  dispatcher = (message) => {
    this.onmessages.forEach(callback => {
      callback(message);
    })
  };

  subscribeForMessages(callback) {
    if (typeof callback !== 'function') {
      throw new Error(`The callback must be typeof function. Typeof ${typeof callback} provided instead.`);
    }

    this.onmessages.push(callback);
  }

  onClose = () => {
    clearTimeout(this.reconnect);
    setTimeout(this.reconnect, 1000);
  };

  reconnect = () => {
    if (this.isConnecting() || this.isConnected()) {
      return;
    }
    this.connect();
  };
}

const ws = new WebsocketConnection(wsUrl + "/notifications");

export default ws;