import useChatSocket from "../../hooks/useChatSocket";
import styled from "styled-components";
import ChatRoomHeader from "./ChatRoomHeader";
import JoinChatRoomHeader from "./JoinChatRoomHeader";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

const ChatRoom = () => {
  const {
    username,
    messages,
    isConnected,
    connectSocket,
    disconnectSocket,
    sendMessage,
  } = useChatSocket();

  return (
    <Container>
      {isConnected ? (
        <ChatRoomHeader username={username} disconnect={disconnectSocket} />
      ) : (
        <JoinChatRoomHeader connect={connectSocket} />
      )}
      <ChatList username={username} messages={messages} />
      <ChatInput isConnected={isConnected} sendMessage={sendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ChatRoom;
