import styled from "styled-components";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

const ChatRoom = () => {
  return (
    <Container>
      <ChatRoomHeader />
      <ChatList />
      <ChatInput />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ChatRoom;
