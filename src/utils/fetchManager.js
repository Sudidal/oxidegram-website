import storageManager from "./storageManager.js";

class FetchManager {
  #AUTH_HEADER = "authorization";

  constructor() {}

  fetchReq = (url, method, headers, body) => {
    return fetch(url, { method, headers, body: body });
  };

  getReq = (url) => {
    return this.fetchReq(url, "GET");
  };
  postReq = (url, body = {}) => {
    return this.fetchReq(
      url,
      "POST",
      { "content-type": "application/json" },
      JSON.stringify(body)
    );
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
      JSON.stringify(body)
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
      JSON.stringify(body)
    );
  };

  authPostReqMultipart = (url, body = {}) => {
    const formData = new FormData();
    for (const name in body) {
      formData.append(name, body[name]);
    }
    return this.fetchReq(
      url,
      "POST",
      {
        [this.#AUTH_HEADER]: this.#getAuthKey(),
      },
      formData
    );
  };
  authPutReqMultipart = (url, body = {}) => {
    const formData = new FormData();
    for (const name in body) {
      formData.append(name, body[name]);
    }
    return this.fetchReq(
      url,
      "PUT",
      {
        [this.#AUTH_HEADER]: this.#getAuthKey(),
      },
      formData
    );
  };

  #getAuthKey = () => storageManager.getAuthenticationKey();
}

const fetchManager = new FetchManager();
export default fetchManager;
