import { useState } from "react";
import styled from "styled-components";
import { MdLogin } from "react-icons/md";

interface Props {
  connect: (username: string) => void;
}

const JoinChatRoom = ({ connect }: Props) => {
  const [username, setUsername] = useState("");
  const trimmedUsername = username.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedUsername) return;
    connect(trimmedUsername);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <UserNameInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ConnectButton
        type="submit"
        disabled={!trimmedUsername}
        aria-label="채팅방 들어가기"
        title="채팅방 들어가기"
      >
        <MdLogin size={20} />
      </ConnectButton>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserNameInput = styled.input`
  flex: 1;
  max-width: 300px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

export default JoinChatRoom;
