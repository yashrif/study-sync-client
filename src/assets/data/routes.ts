export const paths = {
  home: "/",
  benefits: "/benefits",
  features: "/features",
  howItWorks: "/how-it-works",
  auth: "/auth",
  signUp: "/sign-up",
  signIn: "/sign-in",
  resetPassword: "/reset-password",
  initiate: "/initiate",
  confirm: "/confirm",
  verify: "/verify",
  changePassword: "/change-password",
  profile: "/profile",
  dashboard: "/dashboard",
  overview: "/overview",
  users: "/users",
  new: "/new",
  contact: "/contact",
  faq: "/faq",
  support: "/support",
  terms: "/terms",
  privacy: "/privacy",
  cookies: "/cookies",
  settings: "/settings",
  uploads: "/uploads",
  quiz: "/quiz",
  create: "/create",
  saved: "/saved",
  flashcard: "/flashcard",
  review: "/review",
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
  settings: "Settings",
  uploads: "Uploads",
  quiz: "Quiz",
  create: "Create",
  saved: "Saved",
  flashcard: "Flashcard",
  review: "Review",
};

/* ---------------------------------- Paths --------------------------------- */

const authPath = `${paths.auth}`;
const resetPasswordPath = `${authPath}${paths.resetPassword}`;
const changePasswordPath = `${authPath}${paths.changePassword}`;
const dashboardPath = `${paths.dashboard}`;
const users = `${dashboardPath}${paths.users}`;

/* ----------------------------------- End ---------------------------------- */

export const routes = {
  home: paths.home,
  benefits: `#${paths.benefits}`,
  features: `#${paths.features}`,
  howItWorks: `#${paths.howItWorks}`,
  auth: authPath,
  signUp: `${authPath}${paths.signUp}`,
  signIn: `${authPath}${paths.signIn}`,
  resetPassword: resetPasswordPath,
  initiateReset: `${resetPasswordPath}${paths.initiate}`,
  confirmReset: `${resetPasswordPath}${paths.confirm}`,
  initiateChange: `${changePasswordPath}${paths.initiate}`,
  confirmChange: `${changePasswordPath}${paths.confirm}`,
  verify: `${resetPasswordPath}${paths.verify}`,
  profile: `${paths.profile}`,
  contact: `${paths.contact}`,
  faq: `${paths.faq}`,
  support: `${paths.support}`,
  terms: `${paths.terms}`,
  privacy: `${paths.privacy}`,
  cookies: `${paths.cookies}`,
  dashboard: {
    default: dashboardPath,
    home: dashboardPath,
    settings: `${dashboardPath}${paths.settings}`,
    uploads: `${dashboardPath}${paths.uploads}`,
    quiz: {
      default: `${dashboardPath}${paths.quiz}`,
      home: `${dashboardPath}${paths.quiz}`,
      saved: `${dashboardPath}${paths.quiz}`,
      create: `${dashboardPath}${paths.quiz}${paths.create}`,
    },
    flashcard: {
      default: `${dashboardPath}${paths.flashcard}`,
      home: `${dashboardPath}${paths.flashcard}`,
      review: `${dashboardPath}${paths.flashcard}`,
      create: `${dashboardPath}${paths.flashcard}${paths.create}`,
    },
  },
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
  initiateChange: {
    title: pathTitles.changePassword,
    href: routes.initiateChange,
  },
  confirmChange: {
    title: pathTitles.changePassword,
    href: routes.confirmChange,
  },
  profile: { title: pathTitles.profile, href: routes.profile },
  contact: { title: pathTitles.const, href: routes.contact },
  faq: { title: pathTitles.faq, href: routes.faq },
  support: { title: pathTitles.support, href: routes.support },
  terms: { title: pathTitles.terms, href: routes.terms },
  privacy: { title: pathTitles.privacy, href: routes.privacy },
  cookies: { title: pathTitles.cookies, href: routes.cookies },
  dashboard: {
    default: { title: pathTitles.dashboard, href: routes.dashboard.default },
    home: { title: pathTitles.home, href: routes.dashboard.home },
    settings: { title: pathTitles.settings, href: routes.dashboard.settings },
    uploads: {
      title: pathTitles.uploads,
      href: routes.dashboard.uploads,
    },
    quiz: {
      default: { title: pathTitles.quiz, href: routes.dashboard.quiz.default },
      home: { title: pathTitles.quiz, href: routes.dashboard.quiz.home },
      create: { title: pathTitles.create, href: routes.dashboard.quiz.create },
      saved: { title: pathTitles.saved, href: routes.dashboard.quiz.saved },
      quizDetails(id: string) {
        return {
          title: pathTitles.quiz,
          href: `${routes.dashboard.quiz.home}/${id}`,
        };
      },
    },
    flashcard: {
      default: {
        title: pathTitles.flashcard,
        href: routes.dashboard.flashcard.default,
      },
      home: {
        title: pathTitles.flashcard,
        href: routes.dashboard.flashcard.home,
      },
      create: {
        title: pathTitles.create,
        href: routes.dashboard.flashcard.create,
      },
      review: {
        title: pathTitles.review,
        href: routes.dashboard.flashcard.review,
      },
      flashcardDetails(id: string) {
        return {
          title: pathTitles.flashcard,
          href: `${routes.dashboard.flashcard.home}/${id}`,
        };
      },
    },
  },
};
