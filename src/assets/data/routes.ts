import { Link } from "@allTypes";

export const path = {
  home: "/",
  benefits: "benefits",
  features: "features",
  howItWorks: "how-it-works",
  auth: "auth",
  signUp: "sign-up",
  login: "login",
  resetPassword: "reset-password",
  initiate: "initiate",
  confirm: "confirm",
  verify: "verify",
  logout: "logout",
  changePassword: "change-password",
  profile: "profile",
  dashboard: "dashboard",
  overview: "overview",
  users: "users",
  new: "new",
  contact: "contact",
  faq: "faq",
  support: "support",
  terms: "terms",
  privacy: "privacy",
  cookies: "cookies",
};

export const pathTitles = {
  home: "Home",
  benefits: "Benefits",
  features: "Features",
  howItWorks: "How it Works",
  auth: "Auth",
  signUp: "Sign Up",
  login: "Login",
  resetPassword: "Reset Password",
  initiate: "Initiate",
  confirm: "Confirm",
  verify: "Verify",
  logout: "Logout",
  changePassword: "Change Password",
  profile: "Profile",
  dashboard: "Dashboard",
  overview: "Overview",
  users: "Users",
  const: "Contact",
  faq: "FAQ",
  support: "Support",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  cookies: "Cookies",
};

/* ---------------------------------- Paths --------------------------------- */

const authPath = `${path.home}${path.auth}`;
const resetPasswordPath = `${authPath}/${path.resetPassword}`;
const changePasswordPath = `${authPath}/${path.changePassword}`;
const dashboardPath = `${path.home}${path.dashboard}`;
const users = `${dashboardPath}/${path.users}`;

/* ----------------------------------- End ---------------------------------- */

export const routes = {
  home: path.home,
  benefits: `#${path.benefits}`,
  features: `#${path.features}`,
  howItWorks: `#${path.howItWorks}`,
  auth: authPath,
  signUp: `${authPath}/${path.signUp}`,
  login: `${authPath}/${path.login}`,
  resetPassword: resetPasswordPath,
  initiateReset: `${resetPasswordPath}/${path.initiate}`,
  confirmReset: `${resetPasswordPath}/${path.confirm}`,
  initiateChange: `${changePasswordPath}/${path.initiate}`,
  confirmChange: `${changePasswordPath}/${path.confirm}`,
  verify: `${resetPasswordPath}/${path.verify}`,
  logout: `${authPath}/${path.logout}`,
  profile: `${path.home}${path.profile}`,
  dashboard: dashboardPath,
  overview: dashboardPath,
  contact: `${path.home}/${path.contact}`,
  faq: `${path.home}/${path.faq}`,
  support: `${path.home}/${path.support}`,
  terms: `${path.home}/${path.terms}`,
  privacy: `${path.home}/${path.privacy}`,
  cookies: `${path.home}/${path.cookies}`,
};

export const links = {
  home: { title: pathTitles.home, href: routes.home },
  benefits: { title: pathTitles.benefits, href: routes.benefits },
  features: { title: pathTitles.features, href: routes.features },
  howItWorks: { title: pathTitles.howItWorks, href: routes.howItWorks },
  auth: { title: pathTitles.auth, href: routes.auth },
  signUp: { title: pathTitles.signUp, href: routes.signUp },
  login: { title: pathTitles.login, href: routes.login },
  resetPassword: {
    title: pathTitles.resetPassword,
    href: routes.resetPassword,
  },
  initiate: { title: pathTitles.initiate, href: routes.initiateReset },
  confirm: { title: pathTitles.confirm, href: routes.confirmReset },
  verify: { title: pathTitles.verify, href: routes.verify },
  logout: { title: pathTitles.logout, href: routes.logout },
  initiateChange: {
    title: pathTitles.changePassword,
    href: routes.initiateChange,
  },
  confirmChange: {
    title: pathTitles.changePassword,
    href: routes.confirmChange,
  },
  profile: { title: pathTitles.profile, href: routes.profile },
  dashboard: { title: pathTitles.dashboard, href: routes.dashboard },
  overview: { title: pathTitles.overview, href: routes.overview },
  contact: { title: pathTitles.const, href: routes.contact },
  faq: { title: pathTitles.faq, href: routes.faq },
  support: { title: pathTitles.support, href: routes.support },
  terms: { title: pathTitles.terms, href: routes.terms },
  privacy: { title: pathTitles.privacy, href: routes.privacy },
  cookies: { title: pathTitles.cookies, href: routes.cookies },
};
