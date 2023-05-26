import { Boundary } from "../../class/index.class.js";

/**
 * @description crea perimetro
 * @param {string} mapa
 * @param {number} x
 * @param {number} y
 * @param {object} offset
 * @returns {Array} boundaries
 */
const createBoundaries = async (mapa, x, y, offset) => {
  let collisions = mapa;
  let collisionsMap = [];
  let boundaries = [];
  for (let i = 0; i < collisions.length; i += x) {
    collisionsMap.push(collisions.slice(i, y + i));
  }

  await collisionsMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
      //numero que represente la colision
      if (Symbol === 1) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y,
            },
            symbol: Symbol,
          })
        );
      }
    });
  });
  return boundaries;
};

export { createBoundaries };
