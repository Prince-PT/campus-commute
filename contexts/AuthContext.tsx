'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'passenger' | 'driver' | null;

interface AuthContextType {
  userRole: UserRole;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'passenger' || savedRole === 'driver') {
      setUserRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (role: UserRole) => {
    localStorage.setItem('userRole', role as string);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    setIsLoggedIn(false);
  };

  const switchRole = () => {
    // Switch between passenger and driver roles
    const newRole: UserRole = userRole === 'passenger' ? 'driver' : 'passenger';
    localStorage.setItem('userRole', newRole as string);
    setUserRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ userRole, isLoggedIn, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
