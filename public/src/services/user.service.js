import { API, userStore } from "../utils/index.util.js";

class Service {
  #URL = API + "/user";
  constructor() {}

  /**
   * @description Consulta a la api si el usuario se encuentra logeado
   * @returns {boolean}
   */
  isLogin = async () => {
    const URL = this.#URL + "/profile";
    const PARAMS = {
      method: "GET",
      credentials: "include",
    };
    let response = await fetch(URL, PARAMS);
    if (response.ok) {
      response = await response.json();
      this.setUser(response.username, response.email, response.userId);

      return true;
    } else {
      return false;
    }
  };

  /**
   * @description Inicia sesion
   * @param {string} email
   * @param {string} password
   * @returns {boolean}
   */
  signIn = async (email, password) => {
    const URL = this.#URL + "/signin";
    const PARAMS = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password }),
    };

    let response = await fetch(URL, PARAMS);

    if (response.ok) {
      response = await response.json();
      this.setUser(response.username, response.email, response.userId);

      return true;
    } else {
      return false;
    }
  };

  /**
   * @description Registra un nuevo usuario
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @returns {boolean}
   */
  signUp = async (email, username, password) => {
    const URL = this.#URL + "/signup";
    const PARAMS = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, username, password }),
    };

    let response = await fetch(URL, PARAMS);

    if (response.ok) return true;
    else return false;
  };

  /**
   * @description setear valores iniciales del usuario
   * @param {string} username Usuario
   * @param {string} email Email
   * @param {string} id idUser
   */
  setUser = (username, email, id) => {
    userStore.setUsername(username);
    userStore.setEmail(email);
    userStore.setId(id);
  };
}
export { Service as UserService };
