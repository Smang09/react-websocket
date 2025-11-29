import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../ThemeToggle";
import IconButton from "../common/IconButton";
import useChatStore from "../../store/chat";

const ChatRoomHeader = () => {
  const { username, leaveRoom } = useChatStore();
  return (
    <Container>
      <UserNameBox>{username}</UserNameBox>
      <ButtonRow>
        <IconButton
          type="submit"
          icon={MdLogout}
          label="채팅방 나가기"
          onClick={leaveRoom}
        />
        <ThemeToggle />
      </ButtonRow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const UserNameBox = styled.div`
  max-width: 300px;
  font-weight: bold;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default ChatRoomHeader;
