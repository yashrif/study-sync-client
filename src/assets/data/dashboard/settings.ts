import {
  IconDeviceFloppy,
  IconInfoCircle,
  IconPasswordUser,
  IconReload,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";

import { Button, ChangePasswordField, IconList, InfoField } from "@/types";

export const home: IconList = {
  title: "Settings",
  Icon: IconSettings,
  description: "Personalize your settings here!",
};

export const profile: IconList & {
  info: IconList & {
    fields: InfoField[];
  };
  changePassword: IconList & {
    fields: ChangePasswordField[];
  };
} = {
  title: "Profile",
  Icon: IconUserCircle,
  description: "Manage your personal information here!",
  info: {
    title: "Personal Info",
    Icon: IconInfoCircle,
    description: "",
    fields: [
      {
        label: "Email Address",
        type: "email",
        placeholder: "user@mail.com",
        id: "email",
        required: false,
        disabled: true,
      },
      {
        label: "User Type",
        type: "text",
        placeholder: "UNSET",
        id: "role",
        required: false,
        disabled: true,
      },
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
    ],
  },
  changePassword: {
    title: "Change Password",
    Icon: IconPasswordUser,
    description: "",
    fields: [
      {
        label: "Current Password",
        type: "password",
        placeholder: "********",
        id: "currentPassword",
        required: true,
      },
      {
        label: "New Password",
        type: "password",
        placeholder: "********",
        id: "newPassword",
        required: true,
      },
      {
        label: "Confirm Password",
        type: "password",
        placeholder: "********",
        id: "confirmPassword",
        required: true,
      },
    ],
  },
};

export const actionButton: {
  submit: Button;
  reset: Button;
} = {
  submit: {
    title: "Submit",
    Icon: IconDeviceFloppy,
    type: "submit",
  },
  reset: {
    title: "Reset",
    Icon: IconReload,
    type: "reset",
    variant: "outline",
    className: "text-destructive ring-destructive hover:bg-destructive/20",
    iconClassName: "text-destructive",
  },
};
