import React, { createContext, ReactNode, useState } from "react";

interface ContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isOpenModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export const Contexto = createContext<ContextType>({
  state: 0,
  setState: () => {},
  isOpenModal: false,
  setOpenModal: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextoProvider = ({ children }: Props) => {
  const [state, setState] = useState(0);
  const [isOpenModal, setOpenModal] = useState(false);

  const value: ContextType = {
    state,
    setState,
    isOpenModal,
    setOpenModal,
  };

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
};
