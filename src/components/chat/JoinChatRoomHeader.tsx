import { useState } from "react";
import styled from "styled-components";
import { MdLogin } from "react-icons/md";
import ThemeToggle from "../ThemeToggle";
import IconButton from "../common/IconButton";

interface Props {
  connect: (username: string) => void;
}

const JoinChatRoomHeader = ({ connect }: Props) => {
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
      <ButtonRow>
        <IconButton
          type="submit"
          icon={MdLogin}
          label="채팅방 들어가기"
          disabled={!trimmedUsername}
        />
        <ThemeToggle />
      </ButtonRow>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const UserNameInput = styled.input`
  flex: 1;
  max-width: 300px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default JoinChatRoomHeader;
