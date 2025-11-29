import { useEffect, useRef } from "react";
import useModalStore from "../../store/modal";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";

const ModalProvider = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, title, children, closeModal, onConfirm } = useModalStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      closeModal();
    }
  };

  useClickOutside(modalRef, closeModal);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Container>
      <Overlay />
      <Modal ref={modalRef}>
        <TitleText>{title}</TitleText>
        <div>{children}</div>
        <ConfirmButton type="button" onClick={handleConfirm}>
          확인
        </ConfirmButton>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TitleText = styled.span`
  margin-bottom: 20px;
`;

const ConfirmButton = styled.button`
  height: 45px;
  margin-top: 10px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background};
`;

export default ModalProvider;
