import React, { useState } from "react";
import { createContext } from "react";

export const MyContext = createContext();

export function Provider({ children }) {
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filterByTitle, setFilterByTitle] = useState('');

  const providerValues = {
    user,
    setUser,
    isFetching,
    setIsFetching,
    filterByTitle,
    setFilterByTitle,
  }

  return (
    <MyContext.Provider value={ providerValues }>
      {children}
    </MyContext.Provider>
  );
}