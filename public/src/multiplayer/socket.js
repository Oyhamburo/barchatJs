import { userStore } from "../utils/index.util.js";
import {
  changeOnlinePlayer,
  connectPlayer,
  onlinePlayers,
} from "./playerList.js";
let socket = io(); // Conectarse al servidor Socket.io
export default socket;

export const startMultiplayer = async () => {
  sessionMultiplayer();
  disconnectPlayer();
};

const sessionMultiplayer = async () => {
  let username = await userStore.getUsername();
  let id = await userStore.getId();

  //   emite
  socket.emit("newSession", { username, id });
  // resive
  socket.on("newSession", (user) => {
    if (id !== user.id) {
      console.log("Se conecto:", user.username);
      // changeOnlinePlayer(user.id);
      connectPlayer(user);
    } else {
      userStore.setSocketId(user.socketId);
    }
  });
};
console.log("test Cambio");

const disconnectPlayer = async () => {
  // let username = await userStore.getUsername();
  socket.on("finishUser", (player) => {
    console.log("se fue:", player.username);
    changeOnlinePlayer(player.id);
  });
};
