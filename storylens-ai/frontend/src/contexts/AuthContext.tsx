/**
 * Authentication context — provides the current user, loading state,
 * login/signup/logout actions, and session restoration from storage.
 */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { tokenStorage } from "@/services/api";
import { login as loginRequest, signup as signupRequest } from "@/services/auth";
import type { TokenResponse, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, fullName: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Persist the user object to localStorage. */
function persistUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("storylens_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("storylens_user");
  }
}

/** Read the cached user from localStorage. */
function readCachedUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("storylens_user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readCachedUser());
  const [isLoading, setIsLoading] = useState(false);

  // Restore session on mount (if a token exists)
  useEffect(() => {
    const accessToken = tokenStorage.getAccess();
    if (!accessToken) return;

    // If we have a cached user, keep it; otherwise fetch /auth/me
    if (!readCachedUser()) {
      setIsLoading(true);
      import("@/services/auth")
        .then(({ fetchMe }) =>
          fetchMe().then((me) => {
            setUser(me);
            persistUser(me);
          })
        )
        .catch(() => {
          tokenStorage.clear();
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const applyTokens = useCallback((tokens: TokenResponse) => {
    tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
    setUser(tokens.user);
    persistUser(tokens.user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const tokens = await loginRequest(email, password);
      applyTokens(tokens);
    },
    [applyTokens]
  );

  const signup = useCallback(
    async (email: string, fullName: string, password: string) => {
      const tokens = await signupRequest(email, fullName, password);
      applyTokens(tokens);
    },
    [applyTokens]
  );

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    persistUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
      setUser,
    }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook to access the auth context. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return ctx;
}

