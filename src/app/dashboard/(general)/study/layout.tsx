import { StudyProvider } from '@/context/StudyContext';

type Props = {
  children: React.ReactNode;
};

const StudyLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <StudyProvider>{children}</StudyProvider>;
};

export default StudyLayout;
