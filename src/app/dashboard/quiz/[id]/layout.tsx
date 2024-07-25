import { QuizProvider } from "@/context/QuizContext";

type Props = {
  children: React.ReactNode;
};

const QuizDetailsLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <QuizProvider>{children}</QuizProvider>;
};

export default QuizDetailsLayout;
