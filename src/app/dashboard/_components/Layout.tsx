import SideBar from "./SideBar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="relative w-full h-full shadow-[8px_8px_24px_rgba(0,0,0,0.1)] flex overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-auth-bg"></div>
        <SideBar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
