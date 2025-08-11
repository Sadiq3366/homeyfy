import React, { createContext, useContext, useState } from "react";
import http from "../http"; // your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUserId, setLoginUserId] = useState(null);
  const [loginUserType, setLoginUserType] = useState(null);

  const checkAuthStatus = async () => {
  try {
    const res = await http.get("/auth/check");
    if (res.data?.id && res.data?.type) {
      setLoginUserId(res.data.id);
      setLoginUserType(res.data.type);
      return true;
    }
    throw new Error("Invalid auth response");
  } catch (err) {
    // localStorage.removeItem("authToken");
    setLoginUserId(null);
    setLoginUserType(null);
    return false;
  }
};


  return (
    <AuthContext.Provider value={{ loginUserId, loginUserType, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
