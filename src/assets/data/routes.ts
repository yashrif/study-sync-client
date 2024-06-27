export const paths = {
  home: "/",
  benefits: "benefits",
  features: "features",
  howItWorks: "how-it-works",
  auth: "auth",
  signUp: "sign-up",
  signIn: "sign-in",
  resetPassword: "reset-password",
  initiate: "initiate",
  confirm: "confirm",
  verify: "verify",
  signOut: "Sign out",
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
  signIn: "Sign in",
  resetPassword: "Reset Password",
  initiate: "Initiate",
  confirm: "Confirm",
  verify: "Verify",
  signOut: "Sign out",
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

const authPath = `${paths.home}${paths.auth}`;
const resetPasswordPath = `${authPath}/${paths.resetPassword}`;
const changePasswordPath = `${authPath}/${paths.changePassword}`;
const dashboardPath = `${paths.home}${paths.dashboard}`;
const users = `${dashboardPath}/${paths.users}`;

/* ----------------------------------- End ---------------------------------- */

export const routes = {
  home: paths.home,
  benefits: `#${paths.benefits}`,
  features: `#${paths.features}`,
  howItWorks: `#${paths.howItWorks}`,
  auth: authPath,
  signUp: `${authPath}/${paths.signUp}`,
  signIn: `${authPath}/${paths.signIn}`,
  resetPassword: resetPasswordPath,
  initiateReset: `${resetPasswordPath}/${paths.initiate}`,
  confirmReset: `${resetPasswordPath}/${paths.confirm}`,
  initiateChange: `${changePasswordPath}/${paths.initiate}`,
  confirmChange: `${changePasswordPath}/${paths.confirm}`,
  verify: `${resetPasswordPath}/${paths.verify}`,
  signOut: `${authPath}/${paths.signOut}`,
  profile: `${paths.home}${paths.profile}`,
  dashboard: dashboardPath,
  overview: dashboardPath,
  contact: `${paths.home}/${paths.contact}`,
  faq: `${paths.home}/${paths.faq}`,
  support: `${paths.home}/${paths.support}`,
  terms: `${paths.home}/${paths.terms}`,
  privacy: `${paths.home}/${paths.privacy}`,
  cookies: `${paths.home}/${paths.cookies}`,
};

export const links = {
  home: { title: pathTitles.home, href: routes.home },
  benefits: { title: pathTitles.benefits, href: routes.benefits },
  features: { title: pathTitles.features, href: routes.features },
  howItWorks: { title: pathTitles.howItWorks, href: routes.howItWorks },
  auth: { title: pathTitles.auth, href: routes.auth },
  signUp: { title: pathTitles.signUp, href: routes.signUp },
  signIn: { title: pathTitles.signIn, href: routes.signIn },
  resetPassword: {
    title: pathTitles.resetPassword,
    href: routes.resetPassword,
  },
  initiate: { title: pathTitles.initiate, href: routes.initiateReset },
  confirm: { title: pathTitles.confirm, href: routes.confirmReset },
  verify: { title: pathTitles.verify, href: routes.verify },
  signOut: { title: pathTitles.signOut, href: routes.signOut },
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
