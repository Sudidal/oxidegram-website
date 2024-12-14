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
  async getContacts(id) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/details/${id}?contacts=true`
    );
    return await res.json();
  }
  async searchProfiles(query) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/search?query=${query}`
    );
    return await res.json();
  }

  async getTopPosts() {
    const res = await fetchManager.getReq(this.#url + "/posts/top");
    return await res.json();
  }
  async getTopVideos() {
    const res = await fetchManager.getReq(this.#url + "/posts/top?videos=true");
    return await res.json();
  }
  async getCommentsOfPost(postId) {
    const res = await fetchManager.getReq(
      this.#url + `/posts/${postId}/comments`
    );
    return await res.json();
  }
  async makePost(data) {
    const res = await fetchManager.authPostReqMultipart(this.#url + "/posts", {
      content: data.content,
      file: data.file,
    });
    return await res.json();
  }
  async makeComment(comment, postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/comments`,
      {
        content: comment,
      }
    );
    return await res.json();
  }
  async deletePost(postId) {
    const res = await fetchManager.authDeleteReq(
      this.#url + `/posts/${postId}`
    );
    return await res.json();
  }
  async likePost(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/like`
    );
    return await res.json();
  }
  async unlikePost(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/unlike`
    );
    return await res.json();
  }
  async save(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/save`
    );
    return await res.json();
  }
  async unsave(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/unsave`
    );
    return await res.json();
  }

  async sendMessage(msg, chatId, recieverId) {
    wsClient.send("chat msg", msg, [chatId, recieverId]);
  }

  getUrlOfPost(postId) {
    return {
      relativeUrl: "/posts/" + postId,
      absoluteUrl: window.location + "posts/" + postId,
    };
  }
}

const api = new Api();
export default api;
