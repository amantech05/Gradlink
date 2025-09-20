import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { currentUser, demoCredentials, studentUser, alumniUser, adminUser } from '../data/mockData';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('auth_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string, role: Role) => {
    await new Promise((r) => setTimeout(r, 400));
    if (email === demoCredentials.email && password === demoCredentials.password) {
      const base = role === 'alumni' ? alumniUser : role === 'admin' ? adminUser : studentUser;
      setUser({ ...base, role });
      return;
    }
    throw new Error('Invalid email or password');
  };

  const signup = async (name: string, email: string, password: string, role: Role) => {
    await new Promise((r) => setTimeout(r, 600));
    const base = role === 'alumni' ? alumniUser : role === 'admin' ? adminUser : studentUser;
    setUser({ ...base, name, email, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 