import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    localStorage.setItem("user_name", name);
  }, [name]);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
