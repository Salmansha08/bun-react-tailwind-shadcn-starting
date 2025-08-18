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

