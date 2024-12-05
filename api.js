import fetchManager from "./src/utils/fetchManager.js";
import storageManager from "./src/utils/storageManager.js";
import wsClient from "./src/utils/wsClient.js";

class Api {
  constructor() {
    wsClient.subscribe("chat msg", (msg) => {
      this.#callback(msg);
    });
  }

  #url = import.meta.env.VITE_API_URL;
  #callback = null;

  onMessageReceive = (callback) => {
    this.#callback = callback;
  };

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
  async getProfile(id) {
    const res = await fetchManager.authGetReq(this.#url + "/profiles/" + id);
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

  async sendMessage(msg, chatId, recieverId) {
    wsClient.send("chat msg", msg, [chatId, recieverId]);
  }
}

const api = new Api();
export default api;
