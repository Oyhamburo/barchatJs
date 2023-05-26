import { SpritePlayerOnline } from "../class/spritePlayerOnline.js";
import { changeBackgroundToPlayerTwo } from "./changeBackgroundToPlayerTwo.js";

export const createPlayerOnline = (player) => {
  const URLPLAYER = "../../images/assets/player/default/";

  //Defino Image del player
  const playerImageDown = new Image();
  playerImageDown.src = `${URLPLAYER}playerDown.png`;
  const playerImageUp = new Image();
  playerImageUp.src = `${URLPLAYER}playerUp.png`;
  const playerImageLeft = new Image();
  playerImageLeft.src = `${URLPLAYER}playerLeft.png`;
  const playerImageRigth = new Image();
  playerImageRigth.src = `${URLPLAYER}playerRigth.png`;

  let position = changeBackgroundToPlayerTwo(player.position);
  let id = player.id;
  let username = player.username;
  let socketId = player.socketId;

  const newPlayer = new SpritePlayerOnline({
    position: position,
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
    id,
    username,
    state: true,
    socketId,
  });
  console.log(newPlayer);
  return newPlayer;
};
