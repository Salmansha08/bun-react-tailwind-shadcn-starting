import type { RoleEnum } from "@/enums";
import type { LoginFormValues, LoginResponse } from "./";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
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

export interface AuthMe {
  message: string,
  statusCode: number,
  date: string,
  data: {
    id: string,
    name: string,
    email: string,
    role: RoleEnum
  }
}