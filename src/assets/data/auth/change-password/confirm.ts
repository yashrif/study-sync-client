import { routes } from "../../routes";

export const name = "reset-password";
export const title = "Reset Password";
export const description =
  "Enter your new password twice. The new password can not be the same as the old password";

export const fields = [
  {
    id: "password",
    title: "Password",
    placeholder: "Enter your new password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "",
      wrong: "Wrong password",
    },
  },
  {
    id: "confirm-password",
    title: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "Passwords do not match",
      wrong: "Wrong password",
    },
  },
];

export const errors = {
  400: "Password couldn't be changed",
  500: "Server Error",
  empty: "This is required",
  default: "Something went wrong",
  "no-match": "Passwords do not match",
  identical: "New password matches the old password",
};

export const button = { title: "Reset Password", href: routes.login };
