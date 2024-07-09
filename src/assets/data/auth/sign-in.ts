import { SignInField } from "@/types";
import { links, routes } from "../routes";

export const title = "Sign into Your Account";

export const fields: SignInField[] = [
  {
    label: "Email Address",
    type: "email",
    placeholder: "user@mail.com",
    id: "email",
    required: true,
    className: "col-span-2",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "********",
    id: "password",
    required: true,
    className: "col-span-2",
  },
];

export const additionalFields: {
  remember: SignInField;
} = {
  remember: {
    label: "Remember Me",
    id: "remember",
    type: "checkbox",
    placeholder: "",
    required: false,
  },
};

export const actions = {
  forgot: { title: "Forgot Password?", href: routes.resetPassword },
};

export const actionButton = "Sign In";

export const noAccount = {
  title: "Don't have an account?",
  link: links.signUp,
};

export const redirect = routes.dashboard.home;
