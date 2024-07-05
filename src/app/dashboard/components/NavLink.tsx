"use client";

import Link from "next/link";

import { usePath } from "@/hooks/usePath";
import { IconLink } from "@/types";

const NavLink: React.FC<IconLink> = ({ href, title, Icon }) => {
  const isActive = usePath().isCurrentPath(href);

  return (
    <Link
      href={href}
      className={`group w-full flex gap-3 items-center px-4 py-3 rounded-sm hover:bg-background hover:shadow-[inset_0_0_0_1.5px_rgba(139,95,191,0.1)] transition-all duration-300`}
    >
      <Icon
        className={`text-text-200 group-hover:text-text-400 h-5 w-auto transition-colors duration-300 ${
          isActive ? "!text-text-400" : ""
        }`}
      />
      <span
        className={`text-nav-link-medium group-hover:text-text-400 transition-colors duration-300 ${
          isActive ? "text-text-400" : ""
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default NavLink;
