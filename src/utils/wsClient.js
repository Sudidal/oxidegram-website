import { io } from "socket.io-client";
import storageManager from "./storageManager.js";

class WSClient {
  #socket = io();
  #checkCooldown = 1000; //ms
  #intervalId = null;
  #AUTH_HEADER = "authorization";
  #subscriptions = [];

  constructor() {
    this.#connect();
  }

  subscribe(event, callback) {
    this.#subscriptions.push({ event, callback });
    this.setSubscriptions();
  }

  send(event, msg, args) {
    this.#socket.emit(event, msg, ...args);
  }

  #connect() {
    console.log("Connecting to WebSocket server");
    this.#socket.disconnect();
    this.#socket = io(import.meta.env.VITE_WS_URL, {
      path: "/direct",
      extraHeaders: {
        [this.#AUTH_HEADER]: storageManager.getAuthenticationKey(),
      },
    });

    this.setSubscriptions();

    clearInterval(this.#intervalId);
    this.#intervalId = setInterval(() => {
      this.checkForInfoUpdates();
    }, this.#checkCooldown);
  }

  setSubscriptions() {
    this.#socket.removeAllListeners();
    this.#subscriptions.forEach((sub) => {
      this.#socket.on(sub.event, sub.callback);
    });
  }

  checkForInfoUpdates() {
    const curAuthKey = storageManager.getAuthenticationKey();
    if (curAuthKey !== this.#socket.io.opts.extraHeaders[this.#AUTH_HEADER]) {
      this.#connect();
    }
  }
}

const wsClient = new WSClient();
export default wsClient;
