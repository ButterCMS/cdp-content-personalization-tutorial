import { createContext, useContext, useState } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserDispatchContext.Provider value={setUserData}>
      <UserStateContext.Provider value={userData}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
