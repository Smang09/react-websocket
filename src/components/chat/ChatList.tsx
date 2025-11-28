import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import type { Message } from "../../hooks/useChatSocket";
import { useEffect, useRef } from "react";

interface Props {
  username: string;
  messages: Message[];
}

const ChatList = ({ username, messages }: Props) => {
  const chatListRef = useRef<HTMLUListElement>(null);

  const getType = (message: Message) =>
    message.isSystem
      ? "system"
      : message.sender === username
      ? "outgoing"
      : "incoming";

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container ref={chatListRef}>
      {messages.map((message, index) => {
        const type = getType(message);
        const prevType = messages[index - 1] && getType(messages[index - 1]);
        const showSpacing = index > 0 && prevType !== type;

        let showTimestamp = true;
        const nextMessage = messages[index + 1];

        if (message.timestamp && nextMessage?.timestamp) {
          const isSameType = getType(nextMessage) === type;
          const curTime = new Date(message.timestamp);
          const nextTime = new Date(nextMessage.timestamp);
          const isSameMinute =
            Math.floor(curTime.getTime() / 60000) ===
            Math.floor(nextTime.getTime() / 60000);

          showTimestamp = !isSameType || !isSameMinute;
        }

        return (
          <ChatItem key={index} showSpacing={showSpacing}>
            <ChatBubble
              type={type}
              timestamp={showTimestamp ? message.timestamp : null}
            >
              {message.content}
            </ChatBubble>
          </ChatItem>
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
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

export default ChatList;
