import { SignUpField } from "@/types";

export const titles = "Create Account";

export const fields: SignUpField[] = [
  {
    label: "First Name",
    type: "text",
    placeholder: "John",
    id: "first_name",
    required: true,
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    id: "last_name",
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
    id: "confirm_password",
    required: true,
    className: "col-span-2",
  },
];

export const actionButton = "Create Account";
