import React, { createContext, ReactNode, useState } from "react";

interface ContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isOpenModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  selectedProducts: any;
  setSelectedProducts: React.Dispatch<React.SetStateAction<[]>>;
}

export const Contexto = createContext<ContextType>({
  state: 0,
  setState: () => {},
  isOpenModal: false,
  setOpenModal: () => {},
  selectedProducts: [],
  setSelectedProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextoProvider = ({ children }: Props) => {
  const [state, setState] = useState(0);
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const value: ContextType = {
    state,
    setState,
    isOpenModal,
    setOpenModal,
    selectedProducts,
    setSelectedProducts,
  };

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
};
