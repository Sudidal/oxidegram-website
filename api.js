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

  async login(input) {
    const res = await fetchManager.postReq(this.#url + "/login", {
      email: input.email,
      password: input.password,
    });
    const data = await this.#result(res);
    storageManager.setAuthToken(data.jwtToken);
    return data;
  }

  async signup(data) {
    const res = await fetchManager.postReq(this.#url + "/register", {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      username: data.username,
    });
    return await this.#result(res);
  }

  async logout() {
    storageManager.setAuthToken("");
    return true;
  }

  async getMyProfile() {
    const res = await fetchManager.authGetReq(this.#url + "/profiles/me");
    return await this.#result(res);
  }
  async getProfile(id) {
    const res = await fetchManager.authGetReq(this.#url + "/profiles/" + id);
    return await this.#result(res);
  }
  async getTopProfiles() {
    const res = await fetchManager.getReq(this.#url + "/profiles/top?limit=10");
    return await this.#result(res);
  }
  async getDetailsOfOneProfile(id) {
    const res = await fetchManager.getReq(
      this.#url +
        `/profiles/details/${id}?posts=true&savedPosts=true&follows=true&followers=true`
    );
    return await this.#result(res);
  }
  async getContacts(id) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/details/${id}?contacts=true`
    );
    return await this.#result(res);
  }
  async searchProfiles(query) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/search?query=${query}`
    );
    return await this.#result(res);
  }

  async getTopPosts() {
    const res = await fetchManager.getReq(this.#url + "/posts/top");
    return await this.#result(res);
  }
  async getOnePost(postId) {
    const res = await fetchManager.getReq(this.#url + "/posts/" + postId);
    return await this.#result(res);
  }
  async getTopVideos() {
    const res = await fetchManager.getReq(this.#url + "/posts/top?videos=true");
    return await this.#result(res);
  }
  async getCommentsOfPost(postId) {
    const res = await fetchManager.getReq(
      this.#url + `/posts/${postId}/comments`
    );
    return await this.#result(res);
  }
  async makePost(data) {
    const res = await fetchManager.authPostReqMultipart(this.#url + "/posts", {
      content: data.content,
      file: data.file,
    });
    return await this.#result(res);
  }
  async makeComment(comment, postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/comments`,
      {
        content: comment,
      }
    );
    return await this.#result(res);
  }
  async deletePost(postId) {
    const res = await fetchManager.authDeleteReq(
      this.#url + `/posts/${postId}`
    );
    return await this.#result(res);
  }
  async likePost(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/like`
    );
    return await this.#result(res);
  }
  async unlikePost(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/unlike`
    );
    return await this.#result(res);
  }
  async save(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/save`
    );
    return await this.#result(res);
  }
  async unsave(postId) {
    const res = await fetchManager.authPostReq(
      this.#url + `/posts/${postId}/unsave`
    );
    return await this.#result(res);
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

  async #result(res) {
    const data = await res.json();
    data.ok = res.ok;
    data.msg = this.#extractMsg(data);
    return data;
  }

  #extractMsg(input) {
    if (typeof input === "string") {
      return input;
    }
    if (Array.isArray(input)) {
      return this.#extractMsg(input[0]);
    }

    const possibleFields = [
      "message",
      "msg",
      "error",
      "messages",
      "msgs",
      "errors",
    ];

    for (let i = 0; i < possibleFields.length; i++) {
      const field = possibleFields[i];
      if (input[field] !== null && input[field] !== undefined) {
        return this.#extractMsg(input[field]);
      }
    }
    return "";
  }
}

const api = new Api();
export default api;
