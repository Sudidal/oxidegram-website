import { io } from "socket.io-client";
import storageManager from "./storageManager.js";

class WSClient {
  #socket = io(import.meta.env.VITE_WS_URL, {
    autoConnect: false,
    path: "/direct",
    extraHeaders: { authorization: storageManager.getAuthenticationKey() },
  });

  constructor() {
    this.#socket.connect();
  }

  subscribe(event, callback) {
    this.#socket.on(event, callback);
  }

  send(event, msg, args) {
    this.#socket.emit(event, msg, ...args);
  }
}

const wsClient = new WSClient();
export default wsClient;
