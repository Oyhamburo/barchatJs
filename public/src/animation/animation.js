import { onlinePlayers, preSlots } from "../multiplayer/playerList.js";
import { userStore } from "../utils/index.util.js";
import socket from "../multiplayer/socket.js";
import {
  createBackground,
  createBoundaries,
  createMovables,
  collisions,
  rectangularCollision,
  startCanvas,
  startPlayer,
  keys,
  lastKey,
} from "./animationfuncion/index.js";
import { createPlayerOnline } from "../multiplayer/createPlayerOnline.js";

const boundaryX = 30;
const boundaryY = 30;
let foreground;
let background;
let boundaries;
let movables;
let player;
let username;
let id;

export let playerThree;
export const offset = {
  x: -700,
  y: -50,
};

export const startAnimation = async () => {
  // Incio canvas
  startCanvas();
  player = await startPlayer();

  let players = preSlots();

  // capo hacemos una consulta aca que nos trae todos los que ya se encuentre jugando
  const URL = "http://localhost:1870/players";
  let response = await fetch(URL);
  response = await response.json();
  response.forEach((p) => {
    console.log({ p });
    if (id !== p.id) {
      // no utilizamos slots predefinidos los creamos
      let newPlayer = createPlayerOnline(p);
      players.push(newPlayer);
      onlinePlayers.push(players[players.length - 1]);
    }
  });

  // defino mapas
  const backgroundImage = "shop";
  const foregroundImage = "shopForeground";
  foreground = createBackground(foregroundImage);
  background = createBackground(backgroundImage);

  // defino perimetro

  boundaries = await createBoundaries(collisions, boundaryX, boundaryY, offset);
  // armo movables
  movables = createMovables(background, boundaries, players, foreground);

  // Acomodar la posicion en la que aparece
  const position = { x: 600, y: -820 };

  movables.forEach((movable) => {
    movable.position.y += position.y;
    movable.position.x += position.x;
  });

  // // sockets
  id = await userStore.getId();

  socket.on("position", (position) => {
    console.log(position);
    // console.log("Position =>", position);
    if (position.id !== id) {
      let playerToMove = onlinePlayers.find((p) => p.getId() === position.id);
      playerToMove ? playerToMove.move(position.direction) : "";
    }
  });
  console.log("jere");
  animate();
};
let positionBackground;

let animate = () => {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  player.draw();

  onlinePlayers.forEach((p) => {
    p.draw();
  });

  // boundaries.forEach((boundary) => {
  //   boundary.draw();
  //   if (
  //     rectangularCollision({
  //       rectangle1: player,
  //       rectangle2: boundary,
  //     })
  //   ) {
  //     console.log("CollisionBoundary");
  //   }
  // });

  let moving = true;
  player.moving = false;
  if (keys.w.pressed && lastKey == "w") {
    console.log(onlinePlayers);
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log(boundary.symbol);
        moving = false;
        break;
      }
    }
    if (moving) {
      positionBackground = background.position;
      socket.emit("position", { direction: "up", id, positionBackground });
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  } else if (keys.a.pressed && lastKey == "a") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log(boundary.symbol);
        moving = false;
        break;
      }
    }
    if (moving) {
      positionBackground = background.position;
      socket.emit("position", { direction: "left", id, positionBackground });
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  } else if (keys.s.pressed && lastKey == "s") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log(boundary.symbol);
        moving = false;
        break;
      }
    }
    if (moving) {
      positionBackground = background.position;
      socket.emit("position", { direction: "down", id, positionBackground });
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  } else if (keys.d.pressed && lastKey == "d") {
    player.moving = true;
    player.image = player.sprites.rigth;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log(boundary.symbol);
        moving = false;
        break;
      }
    }
    if (moving) {
      positionBackground = background.position;
      socket.emit("position", { direction: "rigth", id, positionBackground });
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  }
};
export { animate };
