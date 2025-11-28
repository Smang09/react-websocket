import { createServer } from "http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";
import app from "./app.js";
import { socketHandler } from "./socket.js";
import { PORT } from "./constants.js";

const server = createServer(app);
const io = new Server(server, {
  /* options */
});

socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

ViteExpress.bind(app, server);
