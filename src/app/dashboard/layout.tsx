import { ChatBotProvider } from "@/context/ChatBotContext";
import ChatBot from "./_components/chat-bot";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <ChatBotProvider>
      {children}
      <ChatBot />
    </ChatBotProvider>
  );
};

export default DashboardLayout;
