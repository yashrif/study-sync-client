import { SettingProvider } from "@/context/SettingContext";

type Props = {
  children: React.ReactNode;
};

const SettingsLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return <SettingProvider>{children}</SettingProvider>;
};

export default SettingsLayout;
