import { useState, useEffect } from 'react';
import { User } from "../types/User";
import { getAuthUser } from "../utils/auth";
import { login, logout, register } from "../services/authApi";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getAuthUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    const loggedInUser = await login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  const handleRegister = async (credentials: { email: string; password: string; name: string; password_confirmation: string }) => {
    const registeredUser = await register(credentials);
    setUser(registeredUser);
    return registeredUser;
  };

  return {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
}; 