import styled, { css, type DefaultTheme } from "styled-components";
import { colors } from "../../styles/colors";

interface Props {
  type: "system" | "incoming" | "outgoing";
  sender?: string | null;
  timestamp?: string | null;
  children: React.ReactNode;
}

const ChatBubble = ({ type, sender, timestamp, children }: Props) => {
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "numeric",
      })
    : null;

  return (
    <Container type={type}>
      {formattedTime && <TimeText>{formattedTime}</TimeText>}
      <Column type={type}>
        {sender && <SenderText>{sender}</SenderText>}
        <MessageBox type={type}>{children}</MessageBox>
      </Column>
    </Container>
  );
};

const containerStyles = () => ({
  outgoing: css`
    justify-content: flex-end;
  `,
  incoming: css`
    flex-direction: row-reverse;
    justify-content: flex-end;
  `,
  system: css`
    justify-content: center;
  `,
});

const columnStyles = () => ({
  outgoing: css`
    align-items: flex-end;
  `,
  incoming: css`
    align-items: flex-start;
  `,
  system: css`
    align-items: center;
  `,
});

const bubbleStyles = (theme: DefaultTheme) => ({
  outgoing: css`
    background: ${colors.primary};
    color: ${colors.white};
  `,
  incoming: css`
    background: ${theme.colors.gray};
    color: ${theme.colors.text};
  `,
  system: css`
    background: transparent;
    color: ${theme.colors.text};
    font-size: 12px;
    text-align: center;
  `,
});

const Container = styled.div<{ type: Props["type"] }>`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  ${({ type }) => containerStyles()[type]};
`;

const TimeText = styled.span`
  margin-bottom: 4px;
  font-size: 11px;
`;

const Column = styled.div<{ type: Props["type"] }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 60%;
  ${({ type }) => columnStyles()[type]};
`;

const SenderText = styled.span`
  margin: 0 4px;
  font-size: 12px;
`;

const MessageBox = styled.div<{ type: Props["type"] }>`
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  word-break: break-word;
  ${({ theme, type }) => bubbleStyles(theme)[type]}
`;

export default ChatBubble;
