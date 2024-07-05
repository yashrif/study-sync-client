import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buttons, description, title } from "@assets/data/home/hero";
import HeroImage from "../_home/HeroImage";

const Hero: React.FC = () => {
  return (
    <section className="max-w-[1440px] w-full h-[calc(100vh-80px)] py-8 px-5 md:px-20 mx-auto grid md:grid-cols-[1fr_max(540px)] justify-center md:justify-between items-center gap-16 md:gap-24">
      <div className="flex flex-col justify-center gap-12">
        <div className="flex flex-col gap-8">
          <h1 className="text-[52px] font-bold font-secondary leading-[1.05] -tracking-[0.5px] text-left">
            {title}
          </h1>
          <p className="text-xl leading-[1.6]">{description}</p>
        </div>
        <div className="flex gap-4 items-center">
          {buttons.map((button) => (
            <Link key={button.href} href={button.href}>
              <Button variant={button.variant} size={"xl"}>
                {button.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-[500px] md:w-full h-full md:h-auto md:justify-self-end mx-auto md:mx-0">
        <HeroImage height={"full"} width={"full"} />
      </div>
    </section>
  );
};

export default Hero;
