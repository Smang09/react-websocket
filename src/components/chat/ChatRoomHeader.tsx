import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../ThemeToggle";
import IconButton from "../common/IconButton";
import useChatStore from "../../store/chat";
import useClipboardCopy from "../../hooks/useClipboardCopy";

const ChatRoomHeader = () => {
  const { username, room, leaveRoom } = useChatStore();
  const { isCopied, copy } = useClipboardCopy();
  return (
    <Container>
      <UserNameText>{username}</UserNameText>
      <Row>
        <RoomCodeButton type="button" onClick={() => copy(room)}>
          Room Code: {isCopied ? "Copied" : room}
        </RoomCodeButton>
        <IconButton
          type="submit"
          icon={MdLogout}
          label="채팅방 나가기"
          onClick={leaveRoom}
        />
        <ThemeToggle />
      </Row>
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

const UserNameText = styled.div`
  max-width: 300px;
  font-weight: bold;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`;

const RoomCodeButton = styled.button`
  margin-right: 10px;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default ChatRoomHeader;
