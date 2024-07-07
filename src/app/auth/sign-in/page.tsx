"use client";

import { z } from "zod";

import { dbEndpoints } from "@/assets/data/api/";
import {
  actionButton,
  fields,
  noAccount,
  redirect,
  title,
} from "@/assets/data/auth/sign-in";
import AuthContainer from "../AuthContainer";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email!",
    })
    .min(1, {
      message: "Email is required.",
    }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  remember: z.boolean(),
});

const SignIn = () => {
  return (
    <AuthContainer
      formSchema={formSchema}
      altLink={noAccount}
      redirect={redirect}
      url={dbEndpoints.authenticate}
      title={title}
      fields={fields}
      actionButton={actionButton}
      showAdditionalFields
      defaultValues={{
        remember: false,
      }}
    />
  );
};

export default SignIn;
