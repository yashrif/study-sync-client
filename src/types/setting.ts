import { FetchAction, FormField, Status, User } from "@allTypes";

/* --------------------------------- Context -------------------------------- */
export enum SettingActionType {}

export type SettingAction = FetchAction<User>;

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
  id: "firstName" | "lastName";
};
