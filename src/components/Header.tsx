import Link from "next/link";

import { button, home, navLinks } from "@assets/data/header";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";

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
      <Link href={button.login.href}>
        <Button size={"lg"}>
          <span className="text-nav-link">{button.login.title}</span>
        </Button>
      </Link>
    </header>
  );
};

export default Header;
