import storageManager from "./storageManager.js";

class ThemeManager {
  #DARK = "dark";
  #LIGHT = "light";

  constructor() {}

  get() {
    return storageManager.getTheme();
  }

  switch() {
    if (storageManager.getTheme() === this.#DARK) {
      storageManager.setTheme(this.#LIGHT);
    } else {
      storageManager.setTheme(this.#DARK);
    }

    this.updateBody();
  }

  updateBody() {
    if (storageManager.getTheme() === this.#DARK) {
      document.body.classList.remove(this.#LIGHT);
    } else {
      document.body.classList.add(this.#LIGHT);
    }
  }
}

const themeManager = new ThemeManager();
export default themeManager;
