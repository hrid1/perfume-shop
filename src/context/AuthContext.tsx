'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';

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
const isUserProfile = (value: unknown): value is UserProfile =>
  typeof value === 'object' && value !== null && typeof (value as UserProfile).email === 'string';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser, isLoaded] = usePersistentState<UserProfile | null>(
    'user',
    null,
    isUserProfile
  );

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      // Derive the id from the email so different accounts on one browser don't share order history.
      id: `usr-${email.trim().toLowerCase()}`,
      name: name?.trim() || email.split('@')[0] || 'Connoisseur',
      email: email.trim(),
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
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
  };

  const logout = () => {
    setUser(null);
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
