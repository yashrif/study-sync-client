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
};
