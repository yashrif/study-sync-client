"use client";

import Link from "next/link";

import { usePath } from "@/hooks/usePath";
import { IconLink } from "@/types";
import SubNavLink from "./SubNavLink";

type Props = IconLink & { links?: IconLink[]; subLinks?: IconLink[] };

const NavLink: React.FC<Props> = ({ href, title, Icon, links, subLinks }) => {
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
    <div className="w-full flex flex-col">
      <Link
        href={href}
        className={`group w-full flex gap-3 items-center px-4 py-3 rounded-sm hover:bg-background hover:shadow-[inset_0_0_0_1.5px_rgba(139,95,191,0.1)] transition-all duration-300`}
      >
        <Icon
          className={`text-text-200 group-hover:text-primary size-5 stroke-[1.75] transition-colors duration-300 ${
            isActive ? "!text-primary" : ""
          }`}
        />
        <span
          className={`text-nav-link-medium group-hover:text-primary transition-colors duration-300 ${
            isActive ? "text-primary" : ""
          }`}
        >
          {title}
        </span>
      </Link>
      {isActive && subLinks && subLinks?.length > 0 && (
        <div className="pl-8 grid grid-cols-[auto,1fr] items-start">
          <div
            className={`w-[1.5px] bg-text-200/50`}
            style={{
              height: `calc(100% - ${100 / (4 * subLinks.length)}% - 1.5px)`,
            }}
          />
          <div className="w-full flex flex-col gap-4 pt-3">
            {subLinks.map((subLink) => (
              <div
                key={subLink.title}
                className="grid grid-cols-[auto,1fr] items-center gap-3"
              >
                <hr className="w-4 border-[1.5px] border-text-200/50" />
                <SubNavLink {...subLink} links={subLinks} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLink;
