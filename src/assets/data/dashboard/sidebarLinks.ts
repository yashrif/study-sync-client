import {
  IconFileUpload,
  IconHome,
  IconLogout2,
  IconSettings
} from "@tabler/icons-react";

import { Quiz } from "@/components/icons";
import { IconLink } from "@allTypes";
import { links, pathTitles } from "../routes";

export const sidebarLinks: IconLink[][] = [
  [
    {
      ...links.dashboard.home,
      Icon: IconHome,
    },
    {
      ...links.dashboard.uploads,
      Icon: IconFileUpload,
    },
    {
      ...links.dashboard.quiz,
      Icon: Quiz,
    },
  ],
  [
    {
      ...links.dashboard.settings,
      Icon: IconSettings,
    },
  ],
];

export const signOut: IconLink = {
  title: pathTitles.signOut,
  Icon: IconLogout2,
  href: "",
};
