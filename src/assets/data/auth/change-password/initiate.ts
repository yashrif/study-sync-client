import { routes } from "../../routes";

export const name = "Change Password";
export const title = "Change Password";
export const description =
  "Please provide your current password to initiate the password changing process.";

export const fields = [
  {
    id: "password",
    title: "Password",
    placeholder: "Enter the current password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "",
      wrong: "Wrong password",
    },
  },
];

export const errors = {
  400: "Wrong password",
  500: "Server Error",
  empty: "This is required",
  wrong: "Wrong password",
  default: "Something went wrong",
};
export const button = { title: "Next", href: routes.confirmReset };
