export const changeBackgroundToPlayerTwo = ({ x, y }) => {
  // posiciones iniciales de jugadores uno y dos
  // ( mejor dicho posiciones posicion de jugar cliente y de jugadores online->siempre sera es la posicion incial de cualquier jugador que entre)
  const positionTwo = {
    x: -26,
    y: 1113,
  };
  const positionOne = {
    x: -100,
    y: -870,
  };

  let newX = positionOne.x - x;
  let newY = positionOne.y - y;

  x = positionTwo.x + newX;
  y = positionTwo.y + newY;
  return { x, y };
};
