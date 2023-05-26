class UserClass {
  #usename;
  #email;
  #id;
  #socketId;
  constructor() {}
  setUsername = (username) => {
    if (username) {
      this.#usename = username;
      localStorage.setItem("username", JSON.stringify(username));
    }
  };
  getUsername = () => this.#usename;

  setEmail = (email) => {
    if (email) {
      this.#email = email;
      localStorage.setItem("email", JSON.stringify(email));
    }
  };

  getEmail = () => this.#email;

  setId = (id) => {
    if (id) {
      this.#id = id;
      localStorage.setItem("id", JSON.stringify(id));
    }
  };

  getId = () => this.#id;

  setSocketId = (id) => {
    this.setSocketId = id;
  };
  getSocketId = () => this.#socketId;
}

export { UserClass };
