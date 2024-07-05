"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { greetings } from "@/assets/data/auth/auth";
import { routes } from "@/assets/data/routes";
import Logo from "@/components/Logo";

const AuthLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center p-12 bg-background">
      <div className="relative max-w-[1000px] w-full min-h-[600px] rounded-lg overflow-hidden bg-auth-bg bg-cover object-cover bg-center grid grid-cols-[1fr,4fr] shadow-[12px_12px_16px_rgba(0,0,0,0.25)]">
        <Link href={routes.home} className="absolute top-12 left-12 no-underline">
          <Logo className="h-auto w-40 z-10 fill-accent" />
        </Link>
        <p className="absolute top-2/4 left-12 -translate-y-2/4 text-4xl text-text-500 font-bold tracking-[5px] z-10 uppercase font-secondary">
          {greetings}
        </p>
        <div></div>
        <div className="bg-auth-curve bg-cover flex justify-end">
          <motion.div className="w-[75%] px-20 py-16 flex flex-col gap-16 justify-center">
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
