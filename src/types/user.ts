export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  createDate: string;
};

/* --------------------------------- Request -------------------------------- */

export type PatchUser = {
  firstName: string;
  lastName: string;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
