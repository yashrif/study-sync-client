import {
  IconBolt,
  IconFileUpload,
  IconHome,
  IconLogout2,
  IconRoute,
  IconSettings,
  IconUserCircle,
  IconBook
} from "@tabler/icons-react";

import { Quiz } from "@/components/icons";
import { IconLink } from "@allTypes";
import { links, pathTitles, routes } from "../routes";

type SidebarLink = IconLink & {
  subLinks?: (IconLink & { altHref?: string })[];
  altHref?: string;
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
      ...links.dashboard.study,
      Icon: IconBook,
    },
    {
      ...links.dashboard.quiz.home,
      Icon: Quiz,
      subLinks: [
        {
          ...links.dashboard.quiz.create,
          Icon: Quiz,
        },
        {
          ...links.dashboard.quiz.saved,
          Icon: Quiz,
        },
      ],
    },
    {
      ...links.dashboard.flashcard.home,
      Icon: IconBolt,
      subLinks: [
        {
          ...links.dashboard.flashcard.create,
          Icon: IconBolt,
        },
        {
          ...links.dashboard.flashcard.review,
          Icon: IconBolt,
        },
      ],
    },
    {
      ...links.dashboard.planner.home,
      Icon: IconRoute,
      subLinks: [
        {
          ...links.dashboard.planner.create,
          Icon: IconRoute,
        },
        {
          ...links.dashboard.planner.saved,
          Icon: IconRoute,
        },
      ],
    },
  ],
  [
    {
      ...links.dashboard.settings.home,
      Icon: IconSettings,
      subLinks: [
        {
          ...links.dashboard.settings.profile,
          Icon: IconUserCircle,
          altHref: routes.dashboard.settings.home,
        },
      ],
    },
  ],
];

export const signOut: IconLink = {
  title: pathTitles.signOut,
  Icon: IconLogout2,
  href: "",
};
