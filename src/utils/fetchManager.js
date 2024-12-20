import storageManager from "./storageManager.js";

class FetchManager {
  #AUTH_HEADER = "authorization";

  constructor() {}

  fetchReq = (url, method, headers, body) => {
    return fetch(url, { method, headers, body: body });
  };

  getReq = (url) => {
    return this.fetchReq(url, "GET", {
      [this.#AUTH_HEADER]: this.#getAuthKey(),
    });
  };
  deleteReq = (url) => {
    return this.fetchReq(url, "DELETE", {
      [this.#AUTH_HEADER]: this.#getAuthKey(),
    });
  };
  postReq = (url, body = {}) => {
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
  putReq = (url, body = {}) => {
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

  postReqMultipart = (url, body = {}) => {
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
  putReqMultipart = (url, body = {}) => {
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
