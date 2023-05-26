import { SpritePlayerOnline } from "../class/index.class.js";

const CANTPRESLOTS = 15;

/**
 * @description Crea los sprite para futuros jugadores
 * @returns {Array}
 */
const setSpritesOnline = () => {
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
    state: false,
  });

  return playerThree;
};

const preSlots = () => {
  // let sloteOne = setSpritesOnline();
  // spriteSlots.push(sloteOne);
  // let sloteTwo = setSpritesOnline();
  // spriteSlots.push(sloteTwo);
  // let sloteThree = setSpritesOnline();

  for (let index = 0; index < CANTPRESLOTS; index++) {
    let sloteOne = setSpritesOnline();
    spriteSlots.push(sloteOne);
  }
  return spriteSlots;
};

const connectPlayer = (user) => {
  let condition = true;
  let count = 0;
  while (condition && count !== CANTPRESLOTS) {
    // Tomo si este sprite se encuentra en uso o no
    let stateSlot = spriteSlots[count].getState();
    if (!stateSlot) {
      // Incio datos basicos del player
      spriteSlots[count].initPlayer({ id: user.id, username: user.username });

      onlinePlayers.push(spriteSlots[count]);
      // spriteSlots[count].moveSprite("up", 300);

      condition = false;
    }
    count++;
  }
};

let spriteSlots = [];
let onlinePlayers = [];

const changeOnlinePlayer = (id) => {
  onlinePlayers = onlinePlayers.filter((p) => p.getId() !== id);
};

export {
  setSpritesOnline,
  changeOnlinePlayer,
  preSlots,
  onlinePlayers,
  connectPlayer,
};
