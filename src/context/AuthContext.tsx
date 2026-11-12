'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  login: (email: string, name?: string) => void;
  updateProfile: (updates: Partial<Pick<UserProfile, 'name' | 'email'>>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'noire_perfumes_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse user session', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr-1',
      name: name?.trim() || email.split('@')[0] || 'Connoisseur',
      email: email.trim(),
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const updateProfile = (updates: Partial<Pick<UserProfile, 'name' | 'email'>>) => {
    if (!user) return;

    const updated: UserProfile = {
      ...user,
      ...updates,
      name: updates.name?.trim() || user.name,
      email: updates.email?.trim() || user.email,
    };

    setUser(updated);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoaded,
        login,
        updateProfile,
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
      isLoaded: true,
      login: () => {},
      updateProfile: () => {},
      logout: () => {},
    };
  }
  return context;
}
