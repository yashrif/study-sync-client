"use client";

import { z } from "zod";

import { dbEndpoints } from "@/assets/data/api";
import {
  actionButton,
  fields,
  hasAccount,
  redirect,
  title,
} from "@/assets/data/auth/sign-up";
import AuthContainer from "../AuthContainer";

const formSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required.",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required.",
    }),
    email: z
      .string()
      .email({
        message: "Invalid email!",
      })
      .min(1, {
        message: "Email is required.",
      }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "Passwords do not match.",
      });
    }
  });

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.custom &&
    issue.path[0] === "confirm_password"
  ) {
    return { message: issue.message || `An error occurred.` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const SignUp = () => {
  return (
    <AuthContainer
      formSchema={formSchema}
      altLink={hasAccount}
      redirect={redirect}
      url={dbEndpoints.register}
      title={title}
      fields={fields}
      actionButton={actionButton}
    />
  );
};

export default SignUp;
