import { routes } from "../routes";

export const name = "Login";
export const title = "Welcome Back";

export const fields = [
  {
    id: "email",
    title: "Email Address",
    placeholder: "you@mail.com",
    type: "email",
    errors: {
      empty: "This is required",
      wrong: "Invalid Email or Password",
    },
  },
  {
    id: "password",
    title: "Password",
    placeholder: "Enter your password",
    type: "password",
    errors: {
      empty: "This is required",
      wrong: "Invalid Email or Password",
    },
  },
];

export const forgot = "Forgot Password?";
export const errors = {
  400: "Invalid Email or Password",
  500: "Server Error",
  empty: "This is required",
  default: "Something went wrong",
};
export const button = {
  login: { title: "Login", href: routes.login },
  reset: { title: "Reset", href: routes.initiateReset },
};
