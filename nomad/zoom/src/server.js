import http from "http";
import { Server } from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import express from "express";


// import { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: {sids, rooms},
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  })
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);  // frontend에 알림
    done();
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));  // 방의 유저들에게 알림
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("connecting_change", (roomName, done) => {
    done(countRoom(roomName));
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomName) => socket.to(roomName).emit("bye", socket.nickname, countRoom(roomName) - 1));
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, roomName, done) => {
    socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`, countRoom(roomName));
    done();
  });

  socket.on("nickname", nickname => socket["nickname"] = nickname)
});

// const server = http.createServer(app);
// const wss = new WebSocketServer({ server });
// const sockets = [];
// let anon = 0;
// wss.on("connection", (socket) => {  // Browser와 연결되면 실행
//   sockets.push(socket); // 서로 다른 유저들끼리 연결해주기 위해 소켓 정보 저장
//   anon = (anon + 1) % 10;
//   if (anon === 0) anon += 1;
//   socket["nickname"] = `Anon${anon}`;

//   sockets.forEach((connectedSocket) => {
//     if (connectedSocket === socket) {
//       return
//     }
//     if (connectedSocket["nickname"] === socket["nickname"]) {
//       socket["nickname"] = `Anon${++anon}`;
//     }
//   });
//   console.log("Connected to Browser ✔"); // Browser와 연결되었음을 출력
//     // if (msg.toString("utf-8") === "Disconnected") {
//     //   anon--;
//     //   console.log(`${socket[nickname]} Disconnected`);
//     //   return
//     // }
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_chat": 
//         sockets.forEach((connectedSocket) => connectedSocket.send(`${socket.nickname}: ${message.payload}`));
//         break;
//       case "nickname": 
//         socket["nickname"] = message.payload;
//         anon--;
//         break;
//     // sockets.forEach((connectedSocket) => connectedSocket.send(message.toString("utf-8")));
//     }
//   });
//   socket.addEventListener("close", () => {
//     sockets.forEach((connectedSocket, index) => {
//       if (connectedSocket === socket) {
//         sockets.splice(index, 1);
//       }
//     })
//   })
// });


httpServer.listen(3000, handleListen);
