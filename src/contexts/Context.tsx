import React, { createContext, ReactNode, useState } from "react";

interface ContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

export const Contexto = createContext<ContextType>({
  state: 0,
  setState: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextoProvider = ({ children }: Props) => {
  const [state, setState] = useState(0);

  const value: ContextType = {
    state,
    setState,
  };

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
};
