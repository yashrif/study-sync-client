import { z } from "zod";

export type AuthField = {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
  className?: string;
};

export type SignInField = AuthField & {
  id: "email" | "password" | "remember";
};

export type SignUpField = AuthField & {
  id: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
};

export type SignUpSchema = z.ZodEffects<
  z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
  }>
>;

export type SignInSchema = z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
  remember: z.ZodBoolean;
}>;
