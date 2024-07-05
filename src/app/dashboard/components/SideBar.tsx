'use client';

import { navLinks, signOut } from "@/assets/data/dashboard/navLinks";
import Logo from "@/components/Logo";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import NavLink from "./NavLink";

const SideBar: React.FC = () => {
  return (
    <div className=" max-w-52 w-full h-full">
      <div className=" w-full h-full bg-white bg-opacity-[0.85] backdrop-blur-xl backdrop-saturate-[180%]">
        <div className="h-full flex flex-col items-start gap-12 px-6 py-8">
          <Logo className="h-8 w-auto" />
          <div className="w-full h-full flex flex-col items-start justify-between gap-16">
            {navLinks.map((navLink, index, navLinks) => (
              <div
                key={index}
                className="w-full flex flex-col gap-2 items-start"
              >
                {navLink.map(({ href, title, Icon }) => (
                  <Suspense fallback={<Spinner />} key={title}>
                    <NavLink title={title} href={href} Icon={Icon}></NavLink>
                  </Suspense>
                ))}

                {index === navLinks.length - 1 && (
                  <Suspense fallback={<Spinner />}>
                    <NavLink
                      title={signOut.title}
                      href=""
                      Icon={signOut.Icon}
                    ></NavLink>
                  </Suspense>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
