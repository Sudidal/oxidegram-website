import storageManager from "./storageManager.js";

class FetchManager {
  #AUTH_HEADER = "authorization";

  constructor() {}

  fetchReq = (url, method, headers, body) => {
    return fetch(url, { method, headers, body: JSON.stringify(body) });
  };

  getReq = (url) => {
    return this.fetchReq(url, "GET");
  };

  authGetReq = (url) => {
    return this.fetchReq(url, "GET", {
      [this.#AUTH_HEADER]: this.#getAuthKey(),
    });
  };
  authDeleteReq = (url) => {
    return this.fetchReq(url, "DELETE", {
      [this.#AUTH_HEADER]: this.#getAuthKey(),
    });
  };
  authPostReq = (url, body = {}) => {
    return this.fetchReq(
      url,
      "POST",
      {
        [this.#AUTH_HEADER]: this.#getAuthKey(),
        "Content-Type": "application/json",
      },
      body
    );
  };
  authPutReq = (url, body = {}) => {
    return this.fetchReq(
      url,
      "PUT",
      {
        [this.#AUTH_HEADER]: this.#getAuthKey(),
        "Content-Type": "application/json",
      },
      body
    );
  };

  #getAuthKey = () => storageManager.getAuthenticationKey();
}

const fetchManager = new FetchManager();
export default fetchManager;
