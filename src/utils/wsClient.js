import { io } from "socket.io-client";
import storageManager from "./storageManager.js";

class WSClient {
  #socket = io();
  #AUTH_HEADER = "authorization";
  #checkDuration = 2000; //ms
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
    this.#socket?.disconnect();
    this.#socket = io(import.meta.env.VITE_WS_URL, {
      path: "/direct",
      extraHeaders: {
        [this.#AUTH_HEADER]: storageManager.getAuthenticationKey(),
      },
    });

    this.#subscriptions.push({
      event: "connect_error",
      callback: (err) => {
        console.log(err.message);
      },
    });

    this.setSubscriptions();

    this.checkForInfoUpdatesLoop();
  }

  setSubscriptions() {
    this.#socket.removeAllListeners();
    this.#subscriptions.forEach((sub) => {
      this.#socket.on(sub.event, sub.callback);
    });
  }

  checkForInfoUpdatesLoop() {
    const curAuthKey = storageManager.getAuthenticationKey();
    if (curAuthKey !== this.#socket.io.opts.extraHeaders[this.#AUTH_HEADER]) {
      this.#connect();
    }

    setTimeout(() => {
      this.checkForInfoUpdatesLoop();
    }, this.#checkDuration);
  }
}

const wsClient = new WSClient();
export default wsClient;
