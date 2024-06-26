import Link from "next/link";

import { button, description, title } from "@/assets/data/home/cta";
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="px-5">
      <div className="py-24 bg-accent rounded-lg">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-6 items-center">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <Link href={button.href}>
            <Button size={"xl"}>{button.title}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
