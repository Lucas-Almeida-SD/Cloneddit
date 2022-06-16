import React, { useState } from "react";
import { createContext } from "react";

const MyContext = createContext();

export function Provider({ children }) {
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const providerValues = {
    user,
    setUser,
    isFetching,
    setIsFetching,
  }

  return (
    <MyContext.Provider value={ providerValues }>
      {children}
    </MyContext.Provider>
  );
}