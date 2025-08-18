import type { RoleEnum } from "@/enums";

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  message: string,
  statusCode: number,
  date: string,
  data: {
    user: {
      id: string,
      name: string,
      email: string,
      role: RoleEnum
    },
    accessToken: string,
    expiresIn: string
  }
}