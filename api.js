import fetchManager from "./utils/fetchManager.js";

class Api {
  constructor() {}

  #url = import.meta.env.VITE_API_URL;

  async getMyProfile() {
    const res = await fetchManager.authGetReq(this.#url + "/profiles/me");
    return await res.json();
  }
  async getTopProfiles() {
    const res = await fetchManager.getReq(this.#url + "/profiles/top?limit=10");
    return await res.json();
  }
  async getTopPosts() {
    const res = await fetchManager.getReq(this.#url + "/posts/top");
    return await res.json();
  }

  async makePost(data) {
    const res = await fetchManager.authPostReqMultipart(this.#url + "/posts", {
      content: data.content,
      image: data.image,
    });
    return await res.json();
  }
}

const api = new Api();
export default api;
