import Link from "next/link";
import { Suspense } from "react";

import { home, navLinks } from "@assets/data/header";
import Logo from "@components/Logo";
import Spinner from "../spinner/Spinner";
import ActionButton from "./ActionButton";

const Header: React.FC = () => {
  return (
    <header className="h-20 flex justify-between items-center px-12">
      <Link href={home.href}>
        <Logo className="h-9 w-auto" />
      </Link>
      <nav className="flex gap-12">
        {navLinks.map((link) => (
          <Link key={link.title} href={link.href} className="nav-links">
            {link.title}
          </Link>
        ))}
      </nav>
      <Suspense fallback={<Spinner />}>
        <ActionButton />
      </Suspense>
    </header>
  );
};

export default Header;
