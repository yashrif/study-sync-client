"use client";

import Link from "next/link";

import { usePath } from "@/hooks/usePath";
import { IconLink } from "@/types";

type Props = IconLink & {
  links?: IconLink[];
};

const SubNavLink: React.FC<Props> = ({ href, title, Icon, links }) => {
  const currentPath = usePath().path;
  let isActive = usePath().isCurrentPath(href);

  if (!isActive && links) {
    const check = links?.some((link) => currentPath === link.href);

    if (!check) {
      const paths = currentPath.split("/");
      for (let i = 1; i < paths.length; i++) {
        const slicedPath = paths.slice(0, paths.length - i).join("/");
        if (href === slicedPath) {
          isActive = true;
          break;
        } else if (links.some((link) => slicedPath === link.href)) {
          break;
        }
      }
    }
  }

  return (
    <Link
      href={href}
      className={`group w-full rounded-sm transition-all duration-300`}
      scroll={false}
    >
      <span
        className={`text-nav-link-medium group-hover:text-primary transition-colors duration-300 ${
          isActive ? "text-primary" : ""
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default SubNavLink;
