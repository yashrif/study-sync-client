import {
  IconInfoCircle,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";

import { IconList, InfoField } from "@/types";

export const home: IconList = {
  title: "Settings",
  Icon: IconSettings,
  description: "Personalize your settings here!",
};

export const profile: IconList & {
  info: IconList;
  fields: InfoField[];
} = {
  title: "Profile",
  Icon: IconUserCircle,
  description: "Manage your personal information here!",
  info: {
    title: "Personal Info",
    Icon: IconInfoCircle,
    description: "",
  },

  fields: [
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
};
