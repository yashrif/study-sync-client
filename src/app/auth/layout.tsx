"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { greetings } from "@/assets/data/auth/auth";
import { routes } from "@/assets/data/routes";
import Logo from "@/components/Logo";
import AuthCurve from "./AuthCurve";

const AuthLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center p-12 bg-background">
      <div className="relative max-w-[1000px] w-full rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-auth-bg bg-cover object-cover bg-center" />
        <>
          <Link
            href={routes.home.home}
            className="absolute z-10 top-12 left-12 no-underline"
          >
            <Logo className="h-auto w-40 z-10 fill-accent" />
          </Link>
          <p className="absolute z-10 top-2/4 left-12 -translate-y-2/4 text-4xl text-text-500 font-bold tracking-[5px] uppercase font-secondary">
            {greetings}
          </p>
        </>
        <div className="relative w-full min-h-[650px] max-h-[650px] h-full bg-transparent backdrop-blur-xl backdrop-saturate-[180%] grid grid-cols-[1fr,4fr] shadow-[12px_12px_16px_rgba(0,0,0,0.25)]">
          <div></div>
          <div className="relative h-full flex justify-end">
            <AuthCurve className="absolute w-full h-auto right-0 fill-white/50 backdrop-blur-xl backdrop-saturate-[180%]" />
            <motion.div className="relative w-[75%] px-20 py-16 flex flex-col gap-16 justify-center">
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
