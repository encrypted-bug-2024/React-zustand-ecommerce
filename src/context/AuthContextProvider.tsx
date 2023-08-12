import React, { useState } from "react";

import {
  AuthContext,
  authContextDefaults,
  AuthContextInterface,
} from "./AuthContext";

interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [state, setState] = useState<AuthContextInterface>(authContextDefaults);

  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
