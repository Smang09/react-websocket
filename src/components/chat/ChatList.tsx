import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import { Virtuoso } from "react-virtuoso";
import { type Message } from "../../store/chat";
import useChatStore from "../../store/chat";
import { ADMIN_NAME } from "../../constants/chat";

const ChatList = () => {
  const { username, messages } = useChatStore();
  const getType = (message: Message) =>
    message.sender === ADMIN_NAME
      ? "system"
      : message.sender === username
      ? "outgoing"
      : "incoming";

  return (
    <Virtuoso<Message>
      data={messages}
      followOutput={true}
      itemContent={(index, message) => {
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        const isFirstItem =
          !prevMessage || prevMessage.sender !== message.sender;
        let isLastItem = true;

        if (nextMessage) {
          const curTime = new Date(message.timestamp);
          const nextTime = new Date(nextMessage.timestamp);
          const isSameMinute =
            Math.floor(curTime.getTime() / 60000) ===
            Math.floor(nextTime.getTime() / 60000);
          isLastItem = !isSameMinute || nextMessage.sender !== message.sender;
        }

        const showSender = message.sender !== ADMIN_NAME && isFirstItem;
        const showTimestamp = message.sender !== ADMIN_NAME && isLastItem;

        return (
          <ChatItem $paddingTop={isFirstItem ? 30 : 0}>
            <ChatBubble
              type={getType(message)}
              sender={showSender ? message.sender : null}
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
