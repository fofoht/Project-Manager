"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login true/false
  const login = (userData) => {
    if (!userData) return false;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}



