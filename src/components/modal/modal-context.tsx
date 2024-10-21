import { createContext, ReactNode, useContext, useState } from 'react';

export type modalConfig = {
  position: 'start' | 'end' | 'center';
  size: 'small' | 'medium' | 'large';
};

export const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('Component should be wrapped in ModalContextProvider');
  }
  return ctx;
}

export default function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflowY = '';
  };

  const ctxValue = { isOpen, openModal, closeModal };

  return <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>;
}
