"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lista de emails autorizados para admin
const ALLOWED_ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si el usuario actual es admin
  const isAdmin = user?.email ? ALLOWED_ADMIN_EMAILS.includes(user.email.toLowerCase()) : false;

  useEffect(() => {
    console.log("AuthProvider: Initializing Firebase Auth...");
    console.log("Auth domain:", auth.app.options.authDomain);
    console.log("Allowed admin emails:", ALLOWED_ADMIN_EMAILS);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user?.email || "no user");
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Auth error:", error);
      setError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      console.log("Attempting Google sign-in...");
      await signInWithPopup(auth, googleProvider);
      console.log("Sign-in successful!");
    } catch (err: any) {
      console.error("Google sign-in error:", err.code, err.message);
      setError(err.message);
      throw err;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Sign-out error:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, isAdmin, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
