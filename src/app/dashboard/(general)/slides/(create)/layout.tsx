import { CreateSlideProvider } from "@/context/CreateSlideContext";

type Props = {
  children: React.ReactNode;
};

const CreateSlideLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <CreateSlideProvider>{children}</CreateSlideProvider>;
};

export default CreateSlideLayout;
