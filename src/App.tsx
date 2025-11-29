import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import useThemeStore from "./store/theme";
import GlobalStyle from "./styles/GlobalStyle";
import ChatMain from "./components/chat/ChatMain";
import ModalProvider from "./components/common/ModalProvider";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <ChatMain />
      </AppContainer>
      <ModalProvider />
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export default App;
