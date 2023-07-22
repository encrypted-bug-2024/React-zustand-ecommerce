import React, { useState } from "react";

import {
  AuthContext,
  authContextDefaults,
  AuthContextInterface
} from "./AuthContext";

export const AuthContextProvider: React.FC<React.ReactNode> = ({
  children
}: any) => {
  const [state, setState] = useState<AuthContextInterface>(authContextDefaults);

  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
