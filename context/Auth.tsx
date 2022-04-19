import React, { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { Error } from "../types/Error";
import { User } from "../types/User";

type AuthContextType = {
  fetching: boolean;
  authenticated: boolean;
  user: User | null;
  token: string | null;
  message: string;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  fetching: false,
  authenticated: false,
  user: null,
  token: null,
  message: "",
  loginUser: async (username: string, password: string) => { return false },
  logoutUser: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  children: ReactNode;
};

export function AuthWrapper({ children }: Props) {
  const [fetching, setFetching] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  // Using useEffect since I can't use localStorage until window loads
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
    setToken(JSON.parse(localStorage.getItem("token") || ""));
    setFetching(false);
  }, []);

  // authenticated might be a useless variable, set here for simplicity.
  useEffect(() => {
    setAuthenticated(!!user);
  }, [user]);

  const loginUser = async (username: string, password: string) => {
    let success = false;
    setFetching(true);
    let login;
    try {
      const request = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      login = await request.json();
    } catch (e: any) { //to do finna rétt type
      setMessage(e.message);
    }
    if (!login.user || !login.token) {
      setMessage(login.error);
    }
    if (login.user && login.token) {
      setMessage("");
      setToken(login.token);
      localStorage.setItem("token", JSON.stringify(login.token));
      setUser(login.user);
      localStorage.setItem("user", JSON.stringify(login.user));
      success = true;
    }
    setFetching(false);
    return success;
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
    setUser(null);
  };



  return (
    <AuthContext.Provider
      value={{
        fetching,
        authenticated,
        user,
        message,
        token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
