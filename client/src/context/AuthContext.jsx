import { createContext, useState, useMemo } from "react";

const AuthContext = createContext(undefined);

const getInitialAuthState = () => {
  if (typeof window === "undefined") {

    return {
      isAuthenticated: false,
      role: null,
      username: null,
    
    };
  }

  try {

    const storedAuth = localStorage.getItem("auth");

    if (!storedAuth) {
      return {
        isAuthenticated: false,
        role: null,
        username: null,
      };
    }

    const parsedAuth = JSON.parse(storedAuth);

    return {
      isAuthenticated: parsedAuth?.isAuthenticated || false,
      role: parsedAuth?.role || null,
      username: parsedAuth?.username || null,
    };
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
    localStorage.removeItem("auth");
    return {
      isAuthenticated: false,
      role: null,
      username: null,
    };
  }
};


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuthState);


  const login = (username , role) => {

    const authData = {
      isAuthenticated: true,
      username,
      role,
    };
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
      username: null,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };


  const value = useMemo(
    () => ({ ...auth, login, logout}),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;