import { z } from "zod";

import { FormField } from "@allTypes";

export type SignInField = FormField & {
  id: "email" | "password" | "remember";
};

export type SignUpField = FormField & {
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

export type FormHandle = {
  submit: () => void;
  clear: () => void;
};
