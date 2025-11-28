import { ADMIN_NAME } from "./constants.js";

export const socketHandler = (io) => {
  io.on("connection", (client) => {
    const username = client.handshake.query.username || "익명";
    console.log(`${username}님이 접속했습니다.`);

    client.broadcast.emit("new message", {
      sender: ADMIN_NAME,
      content: `${username}님이 들어왔습니다.`,
      isSystem: true,
    });

    client.on("new message", (message) => {
      const timestamp = new Date().toISOString();
      io.emit("new message", { sender: username, content: message, timestamp });
    });

    client.on("disconnect", () => {
      console.log(`${username}님이 접속을 종료했습니다.`);
      io.emit("new message", {
        sender: ADMIN_NAME,
        content: `${username}님이 나갔습니다.`,
        isSystem: true,
      });
    });
  });
};
