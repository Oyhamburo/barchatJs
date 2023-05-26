import { c } from "../animation/animationfuncion/index.js";
class Boundary {
  static width = 64.2;
  static height = 63.8;
  constructor({ position, symbol }) {
    this.position = position;
    this.width = 56;
    this.height = 56;
    this.symbol = symbol;
  }
  draw() {
    c.fillStyle = "rgba(255,0,0,0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Boundary };
