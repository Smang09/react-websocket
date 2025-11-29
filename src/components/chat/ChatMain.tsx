import { useRef, useState } from "react";
import styled from "styled-components";
import ThemeToggle from "../ThemeToggle";
import {
  MdAddHome,
  MdOutlineArrowForward,
  MdOutlineLogin,
} from "react-icons/md";
import IconButton from "../common/IconButton";
import ChatRoom from "./ChatRoom";
import useChatStore from "../../store/chat";
import useModalStore from "../../store/modal";
import { ROOM_CODE_SIZE } from "../../constants/chat";

const ChatMain = () => {
  const { isConnected, username, room, connectSocket, createRoom, joinRoom } =
    useChatStore();
  const { openModal, closeModal } = useModalStore();

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputCodeRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState("");

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      inputNameRef.current?.focus();
      return;
    }

    connectSocket(trimmed);
  };

  const handleJoinRoom = () => {
    openModal({
      title: `방 코드 ${ROOM_CODE_SIZE}자리를 입력해 주세요.`,
      children: (
        <RoomCodeInput
          ref={inputCodeRef}
          type="text"
          maxLength={ROOM_CODE_SIZE}
        />
      ),
      onConfirm: () => {
        const trimmed = inputCodeRef.current?.value.trim();
        if (trimmed?.length === ROOM_CODE_SIZE) {
          closeModal();
          joinRoom(trimmed);
        } else {
          inputCodeRef.current?.focus();
        }
      },
    });
  };

  if (!isConnected) {
    return (
      <Container>
        <ThemeToggle />
        <InputForm onSubmit={handleConnect}>
          <UserNameInput
            ref={inputNameRef}
            type="text"
            value={inputName}
            placeholder="이름을 입력해 주세요."
            onChange={(e) => setInputName(e.target.value)}
          />
          <IconButton icon={MdOutlineLogin} label="확인" type="submit" />
        </InputForm>
      </Container>
    );
  }

  if (room) {
    return <ChatRoom />;
  }

  return (
    <Container>
      <ThemeToggle />
      <GreetingText>안녕하세요. {username}님</GreetingText>
      <RoomButton type="button" onClick={createRoom}>
        <MdAddHome size={20} />
        <span>방 만들기</span>
      </RoomButton>
      <RoomButton type="button" onClick={handleJoinRoom}>
        <MdOutlineArrowForward size={20} />
        <span>방 들어가기</span>
      </RoomButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const UserNameInput = styled.input`
  width: 250px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.inputBackground};
`;

const RoomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 250px;
  height: 45px;
  padding: 0 10px;
  margin-top: 15px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
`;

const GreetingText = styled.span`
  margin-top: 15px;
`;

const RoomCodeInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.inputBackground};
`;

export default ChatMain;
