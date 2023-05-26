/**
 * Recibe clases Sprite que posean posiciones para ser dibujadas
 * @param {object} background
 * @param {Array} boundaries
 * @param {Array} players
 * @param {object} foreground
 * @returns {Array}
 */
const createMovables = (background, boundaries, players, foreground) => {
  let movables = [];
  return (movables = [background, ...boundaries, ...players, foreground]);
};

export { createMovables };
