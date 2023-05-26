// let lastKey = "";

// // Teclas a utilizar
// const keys = {
//   w: {
//     pressed: false,
//   },
//   s: {
//     pressed: false,
//   },
//   a: {
//     pressed: false,
//   },
//   d: {
//     pressed: false,
//   },
//   e: {
//     pressed: false,
//   },
//   space: {
//     pressed: false,
//   },
// };

// function startKeyDetection() {
//   window.addEventListener("keydown", handleKeyDown);
//   window.addEventListener("keyup", handleKeyUp);
// }

// // Función para detener la lógica de detección de teclas
// function stopKeyDetection() {
//   window.removeEventListener("keydown", handleKeyDown);
//   window.removeEventListener("keyup", handleKeyUp);
// }
// function handleKeyDown(e) {
//   switch (e.key) {
//     case "w":
//       keys.w.pressed = true;
//       lastKey = "w";
//       break;
//     case "s":
//       keys.s.pressed = true;
//       lastKey = "s";
//       break;
//     case "a":
//       keys.a.pressed = true;
//       lastKey = "a";
//       break;
//     case "d":
//       keys.d.pressed = true;
//       lastKey = "d";
//       break;
//   }
// }

// function handleKeyUp(e) {
//   switch (e.key) {
//     case "w":
//       keys.w.pressed = false;
//       lastKey = "w";
//       break;
//     case "s":
//       keys.s.pressed = false;
//       lastKey = "s";
//       break;
//     case "a":
//       keys.a.pressed = false;
//       lastKey = "a";
//       break;
//     case "d":
//       keys.d.pressed = false;
//       lastKey = "d";
//       break;
//   }
// }

// export { keys, lastKey, startKeyDetection, stopKeyDetection };

let lastKey = "";

// Teclas a utilizar
const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  e: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

export { keys, lastKey };
