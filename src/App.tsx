import { useEffect, useState } from "react";
import useChatSocket from "./hooks/useChatSocket";

const App = () => {
  const [username, setUsername] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const {
    messages,
    isConnected,
    connectSocket,
    disconnectSocket,
    sendMessage,
  } = useChatSocket();

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage("");
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <>
      <h1>유저: {username}</h1>
      <h2>접속상태: {isConnected ? "접속중" : "미접속"}</h2>
      {!isConnected && (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button disabled={!username} onClick={() => connectSocket(username)}>
            접속
          </button>
        </>
      )}

      <button onClick={disconnectSocket}>접속종료</button>

      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button
        disabled={!isConnected || !inputMessage}
        onClick={handleSendMessage}
      >
        보내기
      </button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.sender} : {message.content}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
