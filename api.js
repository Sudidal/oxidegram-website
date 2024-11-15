import fetchManager from "./utils/fetchManager.js";

class Api {
  constructor() {}

  #url = import.meta.env.VITE_API_URL;

  async getTopPosts() {
    const res = await fetchManager.getReq(this.#url + "/posts/top");
    return await res.json();
  }
}

const api = new Api();
export default api;
