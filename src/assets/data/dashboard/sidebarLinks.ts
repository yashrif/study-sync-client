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
  home: string;
};

export const sidebarLinks: SidebarLink[][] = [
  [
    {
      ...links.dashboard.default,
      home: routes.dashboard.home,
      Icon: IconHome,
    },
    {
      ...links.dashboard.uploads.default,
      home: routes.dashboard.uploads.home,
      Icon: IconFileUpload,
    },
    {
      ...links.dashboard.study.default,
      home: routes.dashboard.study.home,
      Icon: IconBook,
    },
    {
      ...links.dashboard.quiz.default,
      home: routes.dashboard.quiz.home,
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
      ...links.dashboard.flashcard.default,
      home: routes.dashboard.flashcard.home,
      Icon: IconBolt,
      subLinks: [
        {
          ...links.dashboard.flashcard.review,
          Icon: IconBolt,
        },
        {
          ...links.dashboard.flashcard.create,
          Icon: IconBolt,
        },
      ],
    },
    {
      ...links.dashboard.planner.default,
      home: routes.dashboard.planner.home,
      Icon: IconRoute,
      subLinks: [
        {
          ...links.dashboard.planner.saved,
          Icon: IconRoute,
        },
        {
          ...links.dashboard.planner.create,
          Icon: IconRoute,
        },
      ],
    },
    {
      ...links.dashboard.slides.default,
      home: routes.dashboard.slides.home,
      Icon: IconFileDelta,
      subLinks: [
        {
          ...links.dashboard.slides.saved,
          Icon: IconFileDelta,
        },
        {
          ...links.dashboard.slides.create,
          Icon: IconFileDelta,
        },
      ],
    },
  ],
  [
    {
      ...links.dashboard.settings.default,
      home: routes.dashboard.settings.home,
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
