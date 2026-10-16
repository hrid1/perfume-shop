'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('noire_perfumes_user');
      if (savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse user session', e);
    }
  }, []);

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: 'usr-1',
      name: email.split('@')[0] || 'Connoisseur',
      email,
      role: 'customer',
    };
    setUser(newUser);
    localStorage.setItem('noire_perfumes_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('noire_perfumes_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return a safe fallback rather than crashing if rendered outside provider
    return {
      user: null,
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
