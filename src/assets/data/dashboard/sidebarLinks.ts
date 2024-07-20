import {
  IconFileUpload,
  IconHome,
  IconLogout2,
  IconSettings,
  IconStack2,
} from "@tabler/icons-react";

import { Quiz } from "@/components/icons";
import { IconLink } from "@allTypes";
import { links, pathTitles } from "../routes";

type SidebarLink = IconLink & {
  subLinks?: IconLink[];
};

export const sidebarLinks: SidebarLink[][] = [
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
      ...links.dashboard.quiz.home,
      Icon: Quiz,
      subLinks: [
        {
          ...links.dashboard.quiz.saved,
          Icon: Quiz,
        },
        {
          ...links.dashboard.quiz.create,
          Icon: Quiz,
        },
      ],
    },
    {
      ...links.dashboard.flashcard.home,
      Icon: IconStack2,
      subLinks: [
        {
          ...links.dashboard.flashcard.review,
          Icon: Quiz,
        },
        {
          ...links.dashboard.flashcard.create,
          Icon: Quiz,
        },
      ],
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
