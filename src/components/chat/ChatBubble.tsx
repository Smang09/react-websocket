import styled, { css, type DefaultTheme } from "styled-components";
import { colors } from "../../styles/colors";

interface Props {
  type: "system" | "incoming" | "outgoing";
  children: React.ReactNode;
}

const ChatBubble = ({ type, children }: Props) => {
  return <Container type={type}>{children}</Container>;
};

const bubbleStyles = (theme: DefaultTheme) => ({
  outgoing: css`
    margin: 0 0 0 auto;
    background: ${theme.colors.primary};
    color: ${colors.white};
  `,
  incoming: css`
    margin: 0 auto 0 0;
    background: ${theme.colors.gray};
    color: ${colors.black};
  `,
  system: css`
    margin: 0 auto;
    background: transparent;
    color: ${colors.black};
    font-size: 12px;
    text-align: center;
  `,
});

const Container = styled.div<{ type: Props["type"] }>`
  width: fit-content;
  max-width: 60%;
  padding: 10px;
  border-radius: 8px;
  word-break: break-word;
  ${({ theme, type }) => bubbleStyles(theme)[type]}
`;

export default ChatBubble;
