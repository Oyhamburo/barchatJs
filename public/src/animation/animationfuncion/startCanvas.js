const startCanvas = () => {
  canvas = document.querySelector("canvas");
  c = canvas.getContext("2d");

  const resolution = { width: 1280, height: 720 };

  canvas.width = resolution.width;
  canvas.height = resolution.height;
};

let canvas = null;
let c = null;

export { startCanvas, canvas, c };
