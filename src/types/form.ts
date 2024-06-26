export type AuthField = {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
  className?: string;
};

export type SignUpField = AuthField & {
  id: "first_name" | "last_name" | "email" | "password" | "confirm_password";
};
