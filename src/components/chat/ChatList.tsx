import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import type { Message } from "../../hooks/useChatSocket";
import { Virtuoso } from "react-virtuoso";

interface Props {
  username: string;
  messages: Message[];
}

const ChatList = ({ username, messages }: Props) => {
  const getType = (message: Message) =>
    message.isSystem
      ? "system"
      : message.sender === username
      ? "outgoing"
      : "incoming";

  return (
    <Virtuoso<Message>
      data={messages}
      followOutput={true}
      itemContent={(index, message) => {
        const type = getType(message);
        const prevType = messages[index - 1] && getType(messages[index - 1]);
        const paddingTop = index === 0 ? 6 : prevType !== type ? 30 : 0;

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
          <ChatItem $paddingTop={paddingTop}>
            <ChatBubble
              type={type}
              timestamp={showTimestamp ? message.timestamp : null}
            >
              {message.content}
            </ChatBubble>
          </ChatItem>
        );
      }}
    />
  );
};

const ChatItem = styled.div<{ $paddingTop: number }>`
  padding: 0 20px;
  padding-top: ${(props) => props.$paddingTop}px;
  padding-bottom: 6px;
`;

export default ChatList;
