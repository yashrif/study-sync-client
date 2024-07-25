import { Action, FetchAction, FormField, Status, User } from "@allTypes";

/* --------------------------------- Context -------------------------------- */
export enum SettingActionType {
  SET_USER = "SET_USER",
}

export type SettingAction =
  | FetchAction<User>
  | Action<SettingActionType.SET_USER, User>;

export type SettingState = {
  user: User;
  status: Status;
};

export type SettingContextProps = {
  state: SettingState;
  dispatch: React.Dispatch<SettingAction>;
};

/* --------------------------------- Profile -------------------------------- */

export type InfoField = FormField & {
  id: "firstName" | "lastName" | "email" | "role";
};

export type ChangePasswordField = FormField & {
  id: "currentPassword" | "newPassword" | "confirmPassword";
};
