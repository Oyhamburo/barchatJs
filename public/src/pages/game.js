import { UserService } from "../services/index.service.js";
import { urlSignIn } from "../utils/index.util.js";
import { startAnimation } from "../animation/animation.js";
import { startMultiplayer } from "../multiplayer/socket.js";

const start = async () => {
  const userService = new UserService();
  let response = await userService.isLogin();
  if (!response) {
    window.location.assign(urlSignIn);
  } else {
    await startAnimation();
    startMultiplayer();
  }
};

start();
