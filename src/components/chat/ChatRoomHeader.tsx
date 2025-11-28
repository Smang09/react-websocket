import styled from "styled-components";
import { MdLogout } from "react-icons/md";

interface Props {
  username: string;
  disconnect: () => void;
}

const ChatRoomHeader = ({ username, disconnect }: Props) => {
  return (
    <Container>
      <UserNameBox>{username}</UserNameBox>
      <DisconnectButton
        onClick={disconnect}
        aria-label="채팅방 나가기"
        title="채팅방 나가기"
      >
        <MdLogout size={20} />
      </DisconnectButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserNameBox = styled.div`
  max-width: 300px;
  font-weight: bold;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`;

const DisconnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

export default ChatRoomHeader;
