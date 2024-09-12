import {
  IconBolt,
  IconBook,
  IconFileDelta,
  IconFileUpload,
  IconHome,
  IconLogout2,
  IconRoute,
  IconSettings,
  IconUserCircle,
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
      ...links.dashboard.uploads.home,
      Icon: IconFileUpload,
    },
    {
      ...links.dashboard.study.home,
      Icon: IconBook,
    },
    {
      ...links.dashboard.quiz.create,
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
      ...links.dashboard.flashcard.create,
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
      ...links.dashboard.planner.create,
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
    {
      ...links.dashboard.slides.create,
      Icon: IconFileDelta,
      subLinks: [
        {
          ...links.dashboard.slides.create,
          Icon: IconFileDelta,
        },
        {
          ...links.dashboard.slides.saved,
          Icon: IconFileDelta,
        },
      ],
    },
  ],
  [
    {
      ...links.dashboard.settings.profile,
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
