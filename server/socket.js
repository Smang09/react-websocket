import { ADMIN_NAME } from "./constants.js";
import { nanoid } from "nanoid";

const rooms = {};

const generateUniqueRoomCode = (length) => {
  let roomCode;
  do {
    roomCode = nanoid(length);
  } while (rooms[roomCode]);
  return roomCode;
};

export const socketHandler = (io) => {
  io.on("connection", (client) => {
    const username = client.handshake.query.username || "익명";
    console.log(`${username}님이 접속했습니다.`);

    client.on("create_room", () => {
      const roomCode = generateUniqueRoomCode(4);
      rooms[roomCode] = { host: client.id, users: [client.id] };
      client.join(roomCode);
      client.emit("room_created", roomCode);
      console.log(`${username}님이 [${roomCode}] 방을 생성했습니다.`);
    });

    client.on("join_room", (roomCode) => {
      const room = rooms[roomCode];
      if (!room) {
        client.emit("room_not_found", "존재하지 않는 방입니다.");
        return;
      }

      room.users.push(client.id);
      client.join(roomCode);
      client.emit("joined_room", roomCode);
      client.broadcast.to(roomCode).emit("new_message", {
        sender: ADMIN_NAME,
        content: `${username}님이 들어왔습니다.`,
        isSystem: true,
      });
    });

    client.on("new_message", ({ roomCode, content }) => {
      const timestamp = new Date().toISOString();
      const room = rooms[roomCode];
      if (!room) {
        client.emit("room_not_found", "존재하지 않는 방입니다.");
        return;
      }

      io.to(roomCode).emit("new_message", {
        sender: username,
        content,
        timestamp,
      });
    });

    client.on("leave_room", (roomCode) => {
      const room = rooms[roomCode];
      if (!room) {
        client.emit("room_not_found", "존재하지 않는 방입니다.");
        return;
      }

      if (room.host === client.id) {
        client.broadcast.to(roomCode).emit("new_message", {
          sender: ADMIN_NAME,
          content: "방장이 나가서 방이 종료되었습니다.",
          isSystem: true,
        });
        delete rooms[roomCode];
        console.log(`[${roomCode}]방이 삭제되었습니다. (방장 퇴장)`);
      } else {
        const userIndex = room.users.indexOf(client.id);
        if (userIndex !== -1) {
          room.users.splice(userIndex, 1);
          client.broadcast.to(roomCode).emit("new_message", {
            sender: ADMIN_NAME,
            content: `${username}님이 나갔습니다.`,
            isSystem: true,
          });
        }
      }

      client.emit("left_room", roomCode);
      client.leave(roomCode);
    });

    client.on("disconnect", () => {
      for (const roomCode in rooms) {
        const room = rooms[roomCode];
        if (!room) continue;

        const userIndex = room.users.indexOf(client.id);
        if (userIndex === -1) continue;

        if (room.host === client.id) {
          client.broadcast.to(roomCode).emit("new_message", {
            sender: ADMIN_NAME,
            content: "방장이 나가서 방이 종료되었습니다.",
            isSystem: true,
          });
          delete rooms[roomCode];
          console.log(`[${roomCode}]방이 삭제되었습니다. (방장 퇴장)`);
        } else {
          room.users.splice(userIndex, 1);
          client.broadcast.to(roomCode).emit("new_message", {
            sender: ADMIN_NAME,
            content: `${username}님이 나갔습니다.`,
            isSystem: true,
          });
        }

        client.leave(roomCode);
      }

      console.log(`${username}님이 접속을 종료했습니다.`);
    });
  });
};
