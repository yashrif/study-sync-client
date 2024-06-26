import Header from "@/components/Header";
import Benefits from "./_home/Benefits";
import Cta from "./_home/Cta";
import Features from "./_home/Features";
import Hero from "./_home/Hero";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <main className="bg-background w-full">
      <div className="w-full h-screen">
        <Header />
        <Hero />
      </div>
      <div className="container-body">
        <Benefits />
        <Features />
      </div>
      <Cta />
      <div className="container-body">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
