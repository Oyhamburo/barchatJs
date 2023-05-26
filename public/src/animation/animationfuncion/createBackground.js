import { Sprite } from "../../class/index.class.js";
import { offset } from "../animation.js";
export const createBackground = (map) => {
  let image = new Image();
  image.src = `../../../images/maps/${map}.png`;
  const background = new Sprite({
    position: {
      x: offset.x,
      y: offset.y,
    },
    image: image,
  });
  return background;
};
