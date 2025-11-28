import { useEffect, useRef } from "react";
import useChatSocket, { type Message } from "../../hooks/useChatSocket";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import ChatRoomHeader from "./ChatRoomHeader";
import JoinChatRoom from "./JoinChatRoom";
import ChatBubble from "./ChatBubble";

const getType = (message: Message, username: string) => {
  if (message.isSystem) return "system";
  if (message.sender === username) return "outgoing";
  return "incoming";
};

const ChatRoom = () => {
  const chatListRef = useRef<HTMLUListElement>(null);
  const {
    username,
    messages,
    isConnected,
    connectSocket,
    disconnectSocket,
    sendMessage,
  } = useChatSocket();
  const MessageTypes = messages.map((m) => getType(m, username));

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      {isConnected ? (
        <ChatRoomHeader username={username} disconnect={disconnectSocket} />
      ) : (
        <JoinChatRoom connect={connectSocket} />
      )}
      <ChatList ref={chatListRef}>
        {messages.map((message, index) => {
          const type = MessageTypes[index];
          const prevType = index > 0 ? MessageTypes[index - 1] : null;
          const showSpacing = index !== 0 && prevType !== type;
          return (
            <ChatItem key={index} showSpacing={showSpacing}>
              <ChatBubble type={type}>{message.content}</ChatBubble>
            </ChatItem>
          );
        })}
      </ChatList>
      <ChatInput isConnected={isConnected} sendMessage={sendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const ChatItem = styled.li<{ showSpacing: boolean }>`
  margin-top: ${(props) => (props.showSpacing ? "20px" : "0")};
`;

export default ChatRoom;
