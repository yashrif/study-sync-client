import { QuizzesProvider } from "@/context/QuizzesContext";

type Props = {
  children: React.ReactNode;
};

const QuizzesLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <QuizzesProvider>{children}</QuizzesProvider>;
};

export default QuizzesLayout;
