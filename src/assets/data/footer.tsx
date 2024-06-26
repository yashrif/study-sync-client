import { Link } from "@allTypes";
import { links } from "./routes";

export const copyright = `Copyright © ${new Date().getFullYear()} | StudySync, All rights reserved.`;

export const footerLinks: Link[] = [
  links.contact,
  links.faq,
  links.support,
  links.terms,
  links.privacy,
];

export const copyrightLinks = [links.contact, links.terms, links.cookies];
