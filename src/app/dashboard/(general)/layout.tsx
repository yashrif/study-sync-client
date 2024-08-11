import Layout from "../_components/Layout";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <Layout>
      <div className="relative w-full h-full bg-background px-12 pb-8 overflow-y-scroll">
        {children}
      </div>
    </Layout>
  );
};

export default DashboardLayout;
