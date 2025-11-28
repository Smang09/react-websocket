import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import ChatRoom from "./components/chat/ChatRoom";
import useThemeStore from "./store/theme";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <ChatRoom />
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export default App;
