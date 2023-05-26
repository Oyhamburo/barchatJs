import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definir la ruta del directorio de archivos estáticos
const publicPath = join(__dirname, "public");

// Configurar el middleware para servir archivos estáticos
app.use(express.static(publicPath));

app.get("/login", (req, res) => {
  res.sendFile(join(publicPath, "views", "signin.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(join(publicPath, "views", "signup.html"));
});

app.get("/players", (req, res) => {
  res.json(players);
});

let players = [];
// posicion de player Uno si convertir
const defaultPosition = {
  x: -100,
  y: -870,
};

const addPlayer = (player) => {
  players.push(player);
};
const removePlayer = (playerId) => {
  const index = players.findIndex((player) => player.socketId === playerId);
  let disconnectedPlayer = {};
  if (index !== -1) {
    disconnectedPlayer = players[index];
    players.splice(index, 1);
    console.log(`Usuario ${disconnectedPlayer.username} desconectado`);
    io.emit("usuarioDesconectado", disconnectedPlayer);
  }
  return disconnectedPlayer;
};
// Manejar la conexión de Socket.io
io.on("connection", (socket) => {
  // socket.on("newSession", ({ username, id }) => {
  //   addPlayer({ username, id, position: defaultPosition });
  //   console.log(username, "conecto");
  //   // io.emit("newSession", { username, id });
  //   // io.emit("players", players);
  // });

  socket.on("newSession", ({ username, id }) => {
    addPlayer({ username, id, position: defaultPosition, socketId: socket.id });
    console.log(username, "conectado");

    // aviso que se conecto un nuevo usuario con posisicon inicial default
    io.emit("newSession", { username, id, socketId: socket.id });
  });

  socket.on("position", (position) => {
    let player = players.find((p) => p.id === position.id);
    if (player) {
      player["position"] = position.positionBackground;
    }
    position.socketId = socket.id;
    // Enviar un mensaje de respuesta al cliente
    io.emit("position", position);
  });

  // Manejar la desconexión del cliente
  socket.on("disconnect", () => {
    let disconnectedPlayer = removePlayer(socket.id);
    if (disconnectedPlayer) {
      io.emit("finishUser", disconnectedPlayer);
    }
  });
});

// Puerto en el que se ejecutará el servidor
const port = 1870;

// Iniciar el servidor
httpServer.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
