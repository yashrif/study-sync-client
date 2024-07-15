import React from "react";
import SideBar from "./_components/SideBar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="relative w-full h-full shadow-[8px_8px_24px_rgba(0,0,0,0.1)] flex overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-auth-bg"></div>
        <SideBar />
        <div className="relative w-full h-full bg-background px-12 pb-8 overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
