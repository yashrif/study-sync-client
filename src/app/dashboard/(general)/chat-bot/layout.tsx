import { ChatBotProvider } from "@context/ChatBotContext";

type Props = {
  children: React.ReactNode;
};

const ChatBotLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <ChatBotProvider>{children}</ChatBotProvider>;
};

export default ChatBotLayout;
