import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when not logged in

  const login = (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser = {
            id: 'U-1',
            name: 'Alex Recruiter',
            email: email,
            role: email.includes('admin') ? 'Admin' : 'Recruiter',
            avatar: 'https://i.pravatar.cc/150?u=alex'
          };
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Invalid email or password (min 6 chars)'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
