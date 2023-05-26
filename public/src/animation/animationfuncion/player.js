import { Sprite } from "../../class/index.class.js";
import { canvas } from "./index.js";

const startPlayer = () => {
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

  const player = new Sprite({
    position: {
      x: canvas.width / 2.2 - 16,
      y: canvas.height / 2 - 64,
    },
    image: playerImageDown,
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

  return player;
};

export { startPlayer };
