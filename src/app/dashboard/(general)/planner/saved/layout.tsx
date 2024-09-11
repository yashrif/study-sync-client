import { PlannersProvider } from "@/context/PlannersContext";

type Props = {
  children: React.ReactNode;
};

const PlannersLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <PlannersProvider>{children}</PlannersProvider>;
};

export default PlannersLayout;
