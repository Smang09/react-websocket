import styled from "styled-components";

interface Props {
  toggleTheme: () => void;
}

const ThemeToggle = ({ toggleTheme }: Props) => {
  return <Container type="button" onClick={toggleTheme}></Container>;
};

const Container = styled.button``;

export default ThemeToggle;
