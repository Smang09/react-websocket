import { create } from "zustand";

type OpenModalParams = {
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
};

interface ModalStore {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  openModal: ({ title, children, onConfirm }: OpenModalParams) => void;
  closeModal: () => void;
  onConfirm?: () => void;
}

const initialState = {
  isOpen: false,
  title: "",
  children: null,
  onConfirm: undefined,
};

const useModalStore = create<ModalStore>((set) => ({
  ...initialState,
  openModal: ({ title, children, onConfirm }: OpenModalParams) =>
    set({ isOpen: true, title, children, onConfirm }),
  closeModal: () => set(initialState),
}));

export default useModalStore;
