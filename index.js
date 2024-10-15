const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  allowEIO3: true,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  setInterval(() => {
    io.emit("/market/summary", Math.floor(Math.random() * 100));
    console.log("emit market summary");
  }, 1000);
  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
});

server.listen(7123, () => {
  console.log("listening on *:3000");
});

// Add Line 1
// Add Line 2
// Add Line 3
