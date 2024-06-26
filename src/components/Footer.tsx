import React from "react";
import Logo from "./Logo";
import { copyright, copyrightLinks, footerLinks } from "@/assets/data/footer";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-24 flex flex-col justify-start items-center gap-20">
      <div className="w-full flex flex-col gap-8">
        <Logo className="h-9 w-auto" />
        <div className="flex gap-8 justify-center items-center">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link} className="anchor text-text font-normal">
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center">
          <hr className="w-full"/>
          <div className="w-full flex gap-16 justify-between items-center">
            <p className="text-footer">{copyright}</p>
            <div className="flex gap-8 justify-center items-between">
              {copyrightLinks.map((link) => (
                <Link key={link.href} href={link.href} className="anchor text-footer text-text font-normal">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
