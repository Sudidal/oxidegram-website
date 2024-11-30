import fetchManager from "./utils/fetchManager.js";
import storageManager from "./utils/storageManager.js";

class Api {
  constructor() {}

  #url = import.meta.env.VITE_API_URL;

  async login(data) {
    const res = await fetchManager.postReq(this.#url + "/login", {
      email: data.email,
      password: data.password,
    });
    const json = await res.json();
    storageManager.setAuthToken(json.jwtToken);
    return res.ok;
  }

  async signup(data) {
    const res = await fetchManager.postReq(this.#url + "/register", {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      username: data.username,
    });
    return res.ok;
  }

  async logout() {
    storageManager.setAuthToken("");
    return true;
  }

  async getMyProfile() {
    const res = await fetchManager.authGetReq(this.#url + "/profiles/me");
    return await res.json();
  }
  async getTopProfiles() {
    const res = await fetchManager.getReq(this.#url + "/profiles/top?limit=10");
    return await res.json();
  }
  async getDetailsOfOneProfile(id) {
    const res = await fetchManager.getReq(
      this.#url +
        `/profiles/details/${id}?posts=true&savedPosts=true&follows=true&followers=true`
    );
    return await res.json();
  }
  async getContactsOfOneProfile(id) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/details/${id}?contacts=true`
    );
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
