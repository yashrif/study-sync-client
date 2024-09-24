"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { sidebarLinks, signOut } from "@/assets/data/dashboard/sidebarLinks";
import { routes } from "@/assets/data/routes";
import Logo from "@/components/logo/Logo";
import Spinner from "@/components/spinner/Spinner";
import { ScrollArea } from "@/components/ui/scroll-area-no-scrollbar";
import { removeTokens } from "@/lib/auth";
import NavLink from "./NavLink";

const SideBar: React.FC = () => {
  const { push } = useRouter();

  return (
    <div className="max-w-52 w-full h-full">
      <div className="w-full h-full bg-white bg-opacity-[0.85] backdrop-blur-xl backdrop-saturate-[180%]">
        <div className="h-full flex flex-col items-start gap-12 px-6 py-8">
          <Link href={routes.home.home}>
            <Logo className="h-8 w-auto" />
          </Link>
          <div className="w-full h-full grid grid-cols-1 grid-rows-[1fr,auto] items-between justify-center gap-12 overflow-hidden">
            {sidebarLinks.map((navLink, index, navLinks) => (
              <ScrollArea key={index} className="w-full h-full">
                <div className="w-full flex flex-col gap-2 items-start">
                  {navLink.map((item) => (
                    <Suspense fallback={<Spinner />} key={item.title}>
                      <NavLink {...item} links={navLink} />
                    </Suspense>
                  ))}

                  {index === navLinks.length - 1 && (
                    <Suspense fallback={<Spinner />}>
                      <NavLink
                        title={signOut.title}
                        href=""
                        home=""
                        Icon={signOut.Icon}
                        onClick={() => {
                          removeTokens();
                          push(routes.home.home);
                        }}
                      ></NavLink>
                    </Suspense>
                  )}
                </div>
              </ScrollArea>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
