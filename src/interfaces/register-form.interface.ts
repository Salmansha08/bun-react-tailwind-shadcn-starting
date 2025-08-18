import type { Gender, LearningPath } from "@/enums";

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  age: number;
  birthDate: Date;
  gender: Gender;
  learningPath: LearningPath;
  notes?: string;
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