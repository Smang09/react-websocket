import type { IconType } from "react-icons";
import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  label: string;
}

const IconButton = ({ icon: Icon, label, ...props }: Props) => {
  return (
    <Container {...props} aria-label={label} title={label}>
      <Icon size={20} />
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export default IconButton;
