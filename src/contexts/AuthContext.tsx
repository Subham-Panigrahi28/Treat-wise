import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, getCurrentUser, loginUser, logoutUser, registerUser, toggleSavedProcedure } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  toggleSaved: (procedureId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const login = (email: string, password: string) => {
    const result = loginUser(email, password);
    if (result.success && result.user) setUser(result.user);
    return result;
  };

  const register = (name: string, email: string, password: string) => {
    const result = registerUser(name, email, password);
    if (result.success && result.user) setUser(result.user);
    return result;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const toggleSaved = (procedureId: string) => {
    const updated = toggleSavedProcedure(procedureId);
    if (updated) setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, toggleSaved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
