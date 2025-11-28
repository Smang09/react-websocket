import { useState } from "react";
import styled from "styled-components";
import { MdSend } from "react-icons/md";

interface Props {
  isConnected: boolean;
  sendMessage: (message: string) => void;
}

const ChatInput = ({ isConnected, sendMessage }: Props) => {
  const [inputMessage, setInputMessage] = useState("");
  const message = inputMessage.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !message) return;
    sendMessage(message);
    setInputMessage("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <MessageInput
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <SendButton
        type="submit"
        disabled={!isConnected || !message}
        aria-label="메시지 전송"
        title="메시지 전송"
      >
        <MdSend size={20} />
      </SendButton>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  gap: 20px;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ChatInput;
