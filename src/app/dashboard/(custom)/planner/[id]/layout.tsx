import { PlannerProvider } from "@/context/PlannerContext";

type Props = {
  children: React.ReactNode;
};

const PlannerDetailsLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <PlannerProvider>{children}</PlannerProvider>;
};

export default PlannerDetailsLayout;
