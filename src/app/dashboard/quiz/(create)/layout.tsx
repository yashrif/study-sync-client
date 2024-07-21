import { QuizUploadsProvider } from "@/context/QuizUploadsContext";

type Props = {
  children: React.ReactNode;
};

const CreateQuizLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <QuizUploadsProvider>{children}</QuizUploadsProvider>;
};

export default CreateQuizLayout;
