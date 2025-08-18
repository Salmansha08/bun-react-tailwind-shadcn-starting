import type { LoginFormValues, LoginResponse } from "./";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: ({ value }: { value: LoginFormValues }) => Promise<LoginResponse>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}