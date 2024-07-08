import { SignUpField } from "@/types";
import { links, routes } from "../routes";

export const title = "Create Account";

export const fields: SignUpField[] = [
  {
    label: "First Name",
    type: "text",
    placeholder: "John",
    id: "firstName",
    required: true,
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    id: "lastName",
    required: true,
  },
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
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "********",
    id: "confirmPassword",
    required: true,
    className: "col-span-2",
  },
];

export const actionButton = "Create Account";

export const hasAccount = {
  title: "Already have an account?",
  link: links.signIn,
};

export const redirect = routes.dashboard.home;
