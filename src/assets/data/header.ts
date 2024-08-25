import { links, routes } from "./routes";

export const button = {
  login: {
    href: routes.signIn,
    title: "Login",
  },
  dashboard: {
    href: routes.dashboard.home,
    title: "Dashboard",
  },
};

export const home = links.home.home;

export const navLinks = [
  {
    ...links.home.benefits,
  },
  {
    ...links.home.features,
  },
  { ...links.home.howItWorks },
];
