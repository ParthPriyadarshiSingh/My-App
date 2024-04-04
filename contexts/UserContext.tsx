import React, { Children, createContext, useContext, useState } from "react";

interface UserProps {
  mobileNumber?: string;
  updateMobileNumber?: (newMobileNumber: string) => void;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  } 
  return context;
};

export const UserProvider = ({ children }: any) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const updateMobileNumber = (newMobileNumber: string) => {
    setMobileNumber(newMobileNumber);
  };

  return (
    <UserContext.Provider value={{ mobileNumber, updateMobileNumber }}>
      {children}
    </UserContext.Provider>
  );
};
