import { SignInField } from "@/types";
import { links, routes } from "../routes";

export const titles = "Sign into Your Account";

export const fields: SignInField[] = [
  {
    label: "Email Address",
    type: "email",
    placeholder: "user@mail.com",
    id: "email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "********",
    id: "password",
    required: true,
  },
];

export const actions = {
  forgot: { title: "Forgot Password?", href: routes.resetPassword },
  remember: { title: "Remember Me", href: "#" },
};

export const actionButton = "Sign In";

export const redirect = {
  title: "Don't have an account?",
  link: links.signUp,
};
