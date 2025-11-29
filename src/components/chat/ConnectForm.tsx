import { MdOutlineLogin } from "react-icons/md";
import IconButton from "../common/IconButton";
import useChatStore from "../../store/chat";
import { useRef, useState } from "react";
import styled from "styled-components";

const ConnectForm = () => {
  const { connectSocket } = useChatStore();
  const inputNameRef = useRef<HTMLInputElement>(null);
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

  return (
    <Container onSubmit={handleConnect}>
      <UserNameInput
        ref={inputNameRef}
        type="text"
        value={inputName}
        placeholder="이름을 입력해 주세요."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputName(e.target.value)
        }
      />
      <IconButton icon={MdOutlineLogin} label="확인" type="submit" />
    </Container>
  );
};

const Container = styled.form`
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

export default ConnectForm;
