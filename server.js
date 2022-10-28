import express from "express";
import { Server } from "socket.io";
import path from "path";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));

const server = app.listen(PORT, console.log(PORT));

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("user-joined", (name) => {
    socket.broadcast.emit("new-user-joined", name);
  });

  socket.on("new-messege", (msg) => {
    socket.broadcast.emit("new-user-messege", msg);
  });

  socket.on("user-typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});
