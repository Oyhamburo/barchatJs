import { Sprite } from "../../class/sprite.class.js";
import { SpritePlayerOnline } from "../../class/spritePlayerOnline.js";
import { c } from "./startCanvas.js";
// Visualizacion del mapa y del personaje
class SpriteTest {
  constructor({ position, image, frames = { max: 1 }, sprites }) {
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
  }

  getPosition = () => {
    return this.position.x;
  };

  //funcion para imprimir una imagen en
  draw() {
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

  test = (direction) => {
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
}

// Funcion que reciba la posicion del background y la convierta en la posicion del player dos
const changeBackgroundToPlayerTwo = ({ x, y }) => {
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

// posicion de background que nos envia el jugador online
let positionPlayerOnline = { x: 242, y: -909 };

positionPlayerOnline = changeBackgroundToPlayerTwo(positionPlayerOnline);

const startPlayerTwo = () => {
  const URLPLAYER = "../../../images/assets/player/default/";

  //Defino Image del player
  const playerImageDown = new Image();
  playerImageDown.src = `${URLPLAYER}playerDown.png`;
  const playerImageUp = new Image();
  playerImageUp.src = `${URLPLAYER}playerUp.png`;
  const playerImageLeft = new Image();
  playerImageLeft.src = `${URLPLAYER}playerLeft.png`;
  const playerImageRigth = new Image();
  playerImageRigth.src = `${URLPLAYER}playerRigth.png`;

  const positionTwo = {
    x: -26,
    y: 1113,
  };
  const playerTwo = new SpriteTest({
    position: positionTwo,
    image: playerImageRigth,
    frames: {
      max: 4,
    },
    sprites: {
      up: playerImageUp,
      left: playerImageLeft,
      rigth: playerImageRigth,
      down: playerImageDown,
    },
  });

  return playerTwo;
};

const startPlayerThree = () => {
  const URLPLAYER = "../../../images/assets/player/default/";

  //Defino Image del player
  const playerImageDown = new Image();
  playerImageDown.src = `${URLPLAYER}playerDown.png`;
  const playerImageUp = new Image();
  playerImageUp.src = `${URLPLAYER}playerUp.png`;
  const playerImageLeft = new Image();
  playerImageLeft.src = `${URLPLAYER}playerLeft.png`;
  const playerImageRigth = new Image();
  playerImageRigth.src = `${URLPLAYER}playerRigth.png`;

  const positionTwo = {
    x: -14,
    y: 1200,
  };
  const playerThree = new SpritePlayerOnline({
    position: positionTwo,
    image: playerImageRigth,
    frames: {
      max: 4,
    },
    sprites: {
      up: playerImageUp,
      left: playerImageLeft,
      rigth: playerImageRigth,
      down: playerImageDown,
    },
  });

  return playerThree;
};

export { startPlayerTwo, startPlayerThree };
