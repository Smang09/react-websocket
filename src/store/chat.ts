import { create } from "zustand";
import { io, Socket } from "socket.io-client";

export interface Message {
  sender: string;
  content: string;
  isSystem?: boolean;
  timestamp?: string;
}

interface ChatState {
  socket: Socket | null;
  isConnected: boolean;
  username: string;
  room: string;
  isHost: boolean;
  messages: Message[];

  connectSocket: (username: string) => void;
  disconnectSocket: () => void;
  createRoom: () => void;
  joinRoom: (roomCode: string) => void;
  leaveRoom: () => void;
  sendMessage: (content: string) => void;
  appendMessage: (message: Message) => void;
}

const SERVER_URL = "http://localhost:3000";

const initialState = {
  socket: null,
  isConnected: false,
  username: "",
  room: "",
  isHost: false,
  messages: [],
};

const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,

  connectSocket: (username: string) => {
    const { socket } = get();
    if (socket) return;

    const newSocket = io(SERVER_URL, {
      autoConnect: false,
      query: { username },
    });

    newSocket.on("connect", () => set({ isConnected: true }));
    newSocket.on("disconnect", () =>
      set({ isConnected: false, room: "", isHost: false })
    );
    newSocket.on("new_message", (msg) => get().appendMessage(msg));
    newSocket.on("room_created", (roomCode) =>
      set({ room: roomCode, isHost: true })
    );
    newSocket.on("joined_room", (roomCode) =>
      set({ room: roomCode, isHost: false })
    );
    newSocket.on("left_room", () =>
      set({ room: "", isHost: false, messages: [] })
    );
    newSocket.on("room_not_found", () => alert("방을 찾을 수 없습니다."));

    newSocket.connect();
    set({ socket: newSocket, username });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;

    socket.disconnect();
    set(initialState);
  },
  createRoom: () => {
    get().socket?.emit("create_room");
  },
  joinRoom: (roomCode) => {
    get().socket?.emit("join_room", roomCode);
  },
  leaveRoom: () => {
    const { socket, room } = get();
    socket?.emit("leave_room", room);
  },
  sendMessage: (content) => {
    const { socket, room } = get();
    socket?.emit("new_message", { roomCode: room, content });
  },
  appendMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

export default useChatStore;
