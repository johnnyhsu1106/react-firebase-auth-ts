import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  UserCredential,
  getAuth, 
  createUserWithEmailAndPassword,
  updatePassword,
  signInWithEmailAndPassword,
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";

import app from '../firebase';

interface IAuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
};

const auth = getAuth(app);
const AuthContext = createContext<IAuthContext | undefined>(undefined);

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return auth;
}

const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email)
  };

  const changePassword = (password: string): Promise<void> => {
    if (user === null) {
      return new Promise((_, reject) => {
        reject('User is not defined');
      })
    };
    
    if (password === '') {
      return new Promise((_, reject) => {
        reject('Please enter password');
      })
    }
    return updatePassword(user, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  
  const value: IAuthContext = {
    user,
    login,
    logout,
    signup, 
    resetPassword,
    changePassword,
  };


  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider };