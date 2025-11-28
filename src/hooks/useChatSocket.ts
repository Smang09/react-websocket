import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  content: string;
}

const SERVER_URL = "http://localhost:3000";

const useChatSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const connectSocket = useCallback((username: string) => {
    const _socket = io(SERVER_URL, {
      autoConnect: false,
      query: { username },
    });

    _socket.connect();
    setSocket(_socket);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  const onConnected = useCallback(() => {
    setIsConnected(true);
  }, []);

  const onDisconnected = useCallback(() => {
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      socket?.emit("new message", content);
    },
    [socket]
  );

  const onMessageReceived = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);
    socket.on("new message", onMessageReceived);

    return () => {
      socket.off("connect", onConnected);
      socket.off("disconnect", onDisconnected);
      socket.off("new message", onMessageReceived);
    };
  }, [onConnected, onDisconnected, onMessageReceived, socket]);

  return {
    messages,
    isConnected,
    connectSocket,
    disconnectSocket,
    sendMessage,
  };
};

export default useChatSocket;
