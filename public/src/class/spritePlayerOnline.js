import { c } from "../animation/animationfuncion/startCanvas.js";

export class SpritePlayerOnline {
  constructor({
    position,
    image,
    frames = { max: 1 },
    sprites,
    username,
    id,
    state,
    socketId,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height / this.frames.max;
    };
    this.moving = false;
    this.sprites = sprites;
    this.increment = 3;
    this.count = 0;
    this.moveAxis = "x";
    this.targetNumber = 0;
    this.username = username;
    this.id = id;
    this.state = state;
    this.socketId = socketId;
  }

  getPosition = () => {
    return this.position.x;
  };
  getSocketId = () => {
    return this.socketId;
  };
  getState = () => {
    return this.state;
  };
  getUsername = () => {
    return this.username;
  };
  getId = () => {
    return this.id;
  };

  setState = (state) => {
    this.state = state;
  };
  //funcion para imprimir una imagen en
  draw() {
    if (this.state) {
      c.drawImage(
        this.image,
        0,
        this.frames.val * this.width,
        this.image.width,
        this.image.height / this.frames.max,
        this.position.x,
        this.position.y,
        this.image.width,
        this.image.height / this.frames.max
      );
      if (!this.moving) return;

      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }
      if (this.frames.elapsed % 9 === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++;
        else this.frames.val = 0;
      }
    }
  }

  move = (direction) => {
    this.moving = true;
    switch (direction) {
      case "up":
        this.image = this.sprites.up;
        this.position.y -= 3;
        break;
      case "left":
        this.image = this.sprites.left;
        this.position.x -= 3;
        break;
      case "rigth":
        this.image = this.sprites.rigth;
        this.position.x += 3;
        break;
      case "down":
        this.image = this.sprites.down;
        this.position.y += 3;
        break;
    }
  };

  changeBackgroundToPlayerTwo = ({ x, y }) => {
    // posiciones iniciales de jugadores uno y dos
    // ( mejor dicho posiciones posicion de jugar cliente y de jugadores online->siempre sera es la posicion incial de cualquier jugador que entre)
    const positionTwo = {
      x: -26,
      y: 1113,
    };
    const positionOne = {
      x: -100,
      y: -870,
    };

    let newX = positionOne.x - x;
    let newY = positionOne.y - y;

    x = positionTwo.x + newX;
    y = positionTwo.y + newY;
    return { x, y };
  };

  /**
   * @description Funcion para mover al sprite
   * @param {string} direction  'up','left','rigth' or 'down'
   * @param {number} distance cuanta distancia va a recorrer
   */
  moveSprite = async (direction, distance) => {
    this.count = 0;
    this.targetNumber = distance;
    switch (direction) {
      case "up":
        this.increment = -3;
        this.moveAxis = "y";
        this.image = this.sprites.up;
        break;
      case "left":
        this.increment = -3;
        this.moveAxis = "x";
        this.image = this.sprites.left;
        break;
      case "rigth":
        this.increment = 3;
        this.moveAxis = "x";
        this.image = this.sprites.rigth;
        break;
      case "down":
        this.increment = 3;
        this.moveAxis = "y";
        this.image = this.sprites.down;
        break;

      default:
        console.error("error");
        break;
    }
    this.moving = true;

    await new Promise((resolve) => {
      this.updateCount(resolve);
    });

    this.moving = false;
  };

  updateCount(resolve) {
    if (this.increment < 1) {
      this.count -= this.increment;
    } else {
      this.count += this.increment;
    }
    if (this.moveAxis === "x") {
      this.position.x += this.increment;
    } else if (this.moveAxis === "y") {
      this.position.y += this.increment;
    }
    if (this.count < this.targetNumber) {
      setTimeout(() => this.updateCount(resolve), 20);
    } else {
      resolve(true);
    }
  }

  initPlayer = ({ username, id }) => {
    this.state = true;
    this.username = username;
    this.id = id;
  };
  // startPosition = (position) => {
  //   console.log({ position });
  //   let actPosition = changeBackgroundToPlayerTwo(position);
  //   console.log("antes", this.position);
  //   this.postion = { x: -131, y: 1113 };
  //   console.log("despues", this.position);
  // };

  removePlayer = () => {
    this.setState(false);
    c.drawImage(
      0,
      0,
      this.frames.val * this.width,
      this.image.width,
      this.image.height / this.frames.max,
      -26,
      1200,
      this.image.width,
      this.image.height / this.frames.max
    );
  };
}
