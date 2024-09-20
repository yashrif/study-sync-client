export const paths = {
  home: "/",
  benefits: "#benefits",
  features: "#features",
  howItWorks: "#how-it-works",
  cta: "#cta",
  auth: "/auth",
  signUp: "/sign-up",
  signIn: "/sign-in",
  resetPassword: "/reset-password",
  initiate: "/initiate",
  confirm: "/confirm",
  verify: "/verify",
  changePassword: "/change-password",
  profile: "#profile",
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
  planner: "/planner",
  topics: "/topics",
  study: "/study",
  slides: "/slides",
  preview: "/preview",
};

export const pathTitles = {
  home: "Home",
  benefits: "Benefits",
  features: "Features",
  howItWorks: "How it Works",
  cta: "CTA",
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
  planner: "Planner",
  topics: "Topics",
  study: "Study",
  slides: "Slides",
  preview: "Preview",
};

/* ---------------------------------- Paths --------------------------------- */

const authPath = `${paths.auth}`;
const resetPasswordPath = `${authPath}${paths.resetPassword}`;
const changePasswordPath = `${authPath}${paths.changePassword}`;
const dashboardPath = `${paths.dashboard}`;
const users = `${dashboardPath}${paths.users}`;

/* --------------------------------- Routes --------------------------------- */

export const routes = {
  home: {
    default: paths.home,
    home: paths.home,
    benefits: `${paths.home}${paths.benefits}`,
    features: `${paths.home}${paths.features}`,
    howItWorks: `${paths.home}${paths.howItWorks}`,
    cta: `${paths.home}${paths.cta}`,
  },
  auth: authPath,
  signUp: `${authPath}${paths.signUp}`,
  signIn: `${authPath}${paths.signIn}`,
  resetPassword: resetPasswordPath,
  initiateReset: `${resetPasswordPath}${paths.initiate}`,
  confirmReset: `${resetPasswordPath}${paths.confirm}`,
  initiateChange: `${changePasswordPath}${paths.initiate}`,
  confirmChange: `${changePasswordPath}${paths.confirm}`,
  verify: `${resetPasswordPath}${paths.verify}`,
  contact: `${paths.contact}`,
  faq: `${paths.faq}`,
  support: `${paths.support}`,
  terms: `${paths.terms}`,
  privacy: `${paths.privacy}`,
  cookies: `${paths.cookies}`,
  dashboard: {
    default: dashboardPath,
    home: dashboardPath,
    study: {
      default: `${dashboardPath}${paths.study}`,
      home: `${dashboardPath}${paths.study}`,
      details(id: string) {
        return `${routes.dashboard.study.home}/${id}`;
      },
    },
    uploads: {
      default: `${dashboardPath}${paths.uploads}`,
      home: `${dashboardPath}${paths.uploads}`,
    },
    quiz: {
      default: `${dashboardPath}${paths.quiz}`,
      home: `${dashboardPath}${paths.quiz}`,
      create: `${dashboardPath}${paths.quiz}${paths.create}`,
      saved: `${dashboardPath}${paths.quiz}`,
      details(id: string) {
        return `${dashboardPath}${paths.quiz}/${id}`;
      },
    },
    flashcard: {
      default: `${dashboardPath}${paths.flashcard}`,
      home: `${dashboardPath}${paths.flashcard}`,
      create: `${dashboardPath}${paths.flashcard}${paths.create}`,
      review: `${dashboardPath}${paths.flashcard}`,
      details(id: string) {
        return `${dashboardPath}${paths.flashcard}/${id}`;
      },
    },
    planner: {
      default: `${dashboardPath}${paths.planner}`,
      home: `${dashboardPath}${paths.planner}`,
      create: `${dashboardPath}${paths.planner}${paths.create}`,
      saved: `${dashboardPath}${paths.planner}`,
      topics: `${dashboardPath}${paths.planner}${paths.create}${paths.topics}`,
      review: `${dashboardPath}${paths.planner}${paths.create}${paths.review}`,
      details(id: string) {
        return `${dashboardPath}${paths.planner}/${id}`;
      },
    },
    slides: {
      default: `${dashboardPath}${paths.slides}`,
      home: `${dashboardPath}${paths.slides}`,
      create: `${dashboardPath}${paths.slides}${paths.create}`,
      preview: `${dashboardPath}${paths.slides}${paths.preview}`,
      saved: `${dashboardPath}${paths.slides}`,
      details(id: string) {
        return `${dashboardPath}${paths.slides}/${id}`;
      },
    },
    settings: {
      default: `${dashboardPath}${paths.settings}${paths.profile}`,
      home: `${dashboardPath}${paths.settings}`,
      profile: `${dashboardPath}${paths.settings}${paths.profile}`,
    },
  },
};

export const links = {
  home: {
    home: { title: pathTitles.home, href: routes.home.default },
    default: { title: pathTitles.home, href: routes.home.default },
    benefits: { title: pathTitles.benefits, href: routes.home.benefits },
    features: { title: pathTitles.features, href: routes.home.features },
    howItWorks: { title: pathTitles.howItWorks, href: routes.home.howItWorks },
    cta: { title: pathTitles.cta, href: routes.home.cta },
  },
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
  contact: { title: pathTitles.const, href: routes.contact },
  faq: { title: pathTitles.faq, href: routes.faq },
  support: { title: pathTitles.support, href: routes.support },
  terms: { title: pathTitles.terms, href: routes.terms },
  privacy: { title: pathTitles.privacy, href: routes.privacy },
  cookies: { title: pathTitles.cookies, href: routes.cookies },
  dashboard: {
    default: { title: pathTitles.dashboard, href: routes.dashboard.default },
    home: { title: pathTitles.home, href: routes.dashboard.home },
    study: {
      default: {
        title: pathTitles.study,
        href: routes.dashboard.study.default,
      },
      home: { title: pathTitles.study, href: routes.dashboard.study.home },
      details(id: string) {
        return {
          title: pathTitles.study,
          href: routes.dashboard.study.details(id),
        };
      },
    },
    uploads: {
      default: {
        title: pathTitles.uploads,
        href: routes.dashboard.uploads.default,
      },
      home: {
        title: pathTitles.uploads,
        href: routes.dashboard.uploads.home,
      },
    },
    quiz: {
      default: { title: pathTitles.quiz, href: routes.dashboard.quiz.default },
      home: { title: pathTitles.quiz, href: routes.dashboard.quiz.home },
      create: { title: pathTitles.create, href: routes.dashboard.quiz.create },
      saved: { title: pathTitles.saved, href: routes.dashboard.quiz.saved },
      details(id: string) {
        return {
          title: pathTitles.quiz,
          href: routes.dashboard.quiz.details(id),
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
      details(id: string) {
        return {
          title: pathTitles.flashcard,
          href: routes.dashboard.flashcard.details(id),
        };
      },
    },
    planner: {
      default: {
        title: pathTitles.planner,
        href: routes.dashboard.planner.default,
      },
      home: {
        title: pathTitles.planner,
        href: routes.dashboard.planner.home,
      },
      create: {
        title: pathTitles.create,
        href: routes.dashboard.planner.create,
      },
      saved: {
        title: pathTitles.saved,
        href: routes.dashboard.planner.saved,
      },
      details(id: string) {
        return {
          title: pathTitles.planner,
          href: routes.dashboard.planner.details(id),
        };
      },
      topics: {
        title: pathTitles.topics,
        href: routes.dashboard.planner.topics,
      },
      review: {
        title: pathTitles.review,
        href: routes.dashboard.planner.review,
      },
    },
    slides: {
      default: {
        title: pathTitles.slides,
        href: routes.dashboard.slides.default,
      },
      home: {
        title: pathTitles.slides,
        href: routes.dashboard.slides.home,
      },
      create: {
        title: pathTitles.create,
        href: routes.dashboard.slides.create,
      },
      preview: {
        title: pathTitles.preview,
        href: routes.dashboard.slides.preview,
      },
      saved: {
        title: pathTitles.saved,
        href: routes.dashboard.slides.saved,
      },
      details(id: string) {
        return {
          title: pathTitles.slides,
          href: routes.dashboard.slides.details(id),
        };
      },
    },
    settings: {
      default: {
        title: pathTitles.settings,
        href: routes.dashboard.settings.default,
      },
      home: {
        title: pathTitles.settings,
        href: routes.dashboard.settings.home,
      },
      profile: {
        title: pathTitles.profile,
        href: routes.dashboard.settings.profile,
      },
    },
  },
};
