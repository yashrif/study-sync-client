"use client";

import { PlannerProvider } from "@/context/PlannerContext";

type Props = {
  children: React.ReactNode;
};

const PlannerLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <PlannerProvider>{children}</PlannerProvider>;
};

export default PlannerLayout;
