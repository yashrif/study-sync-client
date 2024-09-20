import { SlidesProvider } from "@/context/SlidesContext";

type Props = {
  children: React.ReactNode;
};

const SlidesLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <SlidesProvider>{children}</SlidesProvider>;
};

export default SlidesLayout;
