import { UploadsProvider } from "@/context/UploadsContext";

type Props = {
  children: React.ReactNode;
};

const UploadsLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <UploadsProvider>{children}</UploadsProvider>;
};

export default UploadsLayout;
