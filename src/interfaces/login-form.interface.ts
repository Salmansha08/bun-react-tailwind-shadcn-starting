export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  statusCode: number,
  message: string,
  timestamp: string,
  data: {
    user: {
      id: string,
      name: string,
      email: string,
      role: string
    },
    accessToken: string,
    expiresIn: string
  }
}