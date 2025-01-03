import fetchManager from "./src/utils/fetchManager.js";
import storageManager from "./src/utils/storageManager.js";
import wsClient from "./src/utils/wsClient.js";

class Api {
  constructor() {
    wsClient.subscribe("chat msg", (msg) => {
      if (this.#callback) this.#callback(msg);
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

  async updateProfile(data) {
    const res = await fetchManager.putReqMultipart(
      this.#url + "/profiles/update",
      {
        username: data.username,
        fullName: data.fullName,
        bio: data.bio,
        country: data.country,
        websiteUrl: data.websiteUrl,
        gender: data.gender,
        avatar: data.avatar,
      }
    );
    return await this.#result(res);
  }

  async logout() {
    storageManager.setAuthToken("");
    return true;
  }

  async getMyProfile() {
    const res = await fetchManager.getReq(this.#url + "/profiles/me");
    return await this.#result(res);
  }
  async getProfile(id) {
    const res = await fetchManager.getReq(this.#url + "/profiles/" + id);
    return await this.#result(res);
  }
  async getTopProfiles() {
    const res = await fetchManager.getReq(
      this.#url + "/profiles?sortByFollowers=true&limit=10"
    );
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
  async getNotifications(id) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/details/${id}?notifications=true`
    );
    return await this.#result(res);
  }
  async searchProfiles(query) {
    const res = await fetchManager.getReq(
      this.#url + `/profiles/search?searchQuery=${query}`
    );
    return await this.#result(res);
  }

  async getTopPosts(offset = 0) {
    if (offset > 0) offset++;
    const res = await fetchManager.getReq(
      this.#url + "/posts?sortByLikes=true&offset=" + offset
    );
    return await this.#result(res);
  }
  async getRandomPosts(offset = 0) {
    const res = await fetchManager.getReq(
      this.#url + "/posts?offset=" + offset
    );
    return await this.#result(res);
  }
  async getOnePost(postId) {
    const res = await fetchManager.getReq(this.#url + "/posts/" + postId);
    return await this.#result(res);
  }
  async getTopVideos(offset = 0) {
    const res = await fetchManager.getReq(
      this.#url + "/posts?sortByLikes=true&filter=videos&offset=" + offset
    );
    return await this.#result(res);
  }
  async getCommentsOfPost(postId) {
    const res = await fetchManager.getReq(
      this.#url + `/posts/${postId}/comments`
    );
    return await this.#result(res);
  }
  async makePost(data) {
    const res = await fetchManager.postReqMultipart(this.#url + "/posts", {
      content: data.content,
      file: data.file,
    });
    return await this.#result(res);
  }
  async makeComment(comment, postId) {
    const res = await fetchManager.postReq(
      this.#url + `/posts/${postId}/comments`,
      {
        content: comment,
      }
    );
    return await this.#result(res);
  }
  async deletePost(postId) {
    const res = await fetchManager.deleteReq(this.#url + `/posts/${postId}`);
    return await this.#result(res);
  }
  async likePost(postId) {
    const res = await fetchManager.postReq(this.#url + `/posts/${postId}/like`);
    return await this.#result(res);
  }
  async unlikePost(postId) {
    const res = await fetchManager.postReq(
      this.#url + `/posts/${postId}/unlike`
    );
    return await this.#result(res);
  }
  async save(postId) {
    const res = await fetchManager.postReq(
      this.#url + `/profiles/savepost/${postId}`
    );
    return await this.#result(res);
  }
  async unsave(postId) {
    const res = await fetchManager.postReq(
      this.#url + `/profiles/unsavepost/${postId}`
    );
    return await this.#result(res);
  }

  async follow(profileId) {
    const res = await fetchManager.postReq(
      this.#url + `/profiles/follow/${profileId}`
    );
    return await this.#result(res);
  }
  async unfollow(profileId) {
    const res = await fetchManager.postReq(
      this.#url + `/profiles/unfollow/${profileId}`
    );
    return await this.#result(res);
  }
  async addContact(profileId) {
    const res = await fetchManager.postReq(
      this.#url + `/contacts/${profileId}`
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
    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }
    data.ok = res.ok;
    data.status = res.status;
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

    if (input.status) {
      switch (input.status) {
        case 404:
          return "Not Found";
        case 401:
          return "Account required for this action";
        case 500:
          return "Internal server error";
        case 400:
          return "Incorrect input";
      }
    }

    return "";
  }
}

const api = new Api();
export default api;
