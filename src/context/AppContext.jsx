import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    ///////////////////////////
    nav: () => {},
    seedState: false,
    ///////////////////////////
  });
  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};
