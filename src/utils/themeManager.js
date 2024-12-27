import storageManager from "./storageManager.js";

class ThemeManager {
  #DARK = "dark";
  #LIGHT = "light";

  constructor() {}

  get() {
    return storageManager.getTheme();
  }

  switch() {
    if (storageManager.getTheme() === this.#LIGHT) {
      storageManager.setTheme(this.#DARK);
    } else {
      storageManager.setTheme(this.#LIGHT);
    }

    this.updateBody();
  }

  updateBody() {
    if (storageManager.getTheme() === this.#LIGHT) {
      document.body.classList.add(this.#LIGHT);
    } else {
      document.body.classList.remove(this.#LIGHT);
    }
  }
}

const themeManager = new ThemeManager();
export default themeManager;
