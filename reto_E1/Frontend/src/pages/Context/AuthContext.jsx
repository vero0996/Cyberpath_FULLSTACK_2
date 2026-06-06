import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
  setUser(userData);

  localStorage.setItem("user", JSON.stringify(userData));

  localStorage.setItem("userId", userData.id);
  localStorage.setItem("userName", userData.username);
  localStorage.setItem("userEmail", userData.email);
  localStorage.setItem("userRole", userData.role);
};

  const logout = () => {
  setUser(null);

  localStorage.removeItem("user");

  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);