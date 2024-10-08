import { Fragment } from "react";

import {
  benefits,
  description,
  sectionName,
  title,
} from "@/assets/data/home/Benefits";
import BenefitsImage from "./BenefitsImage";

const Benefits: React.FC = () => {
  return (
    <section
      id="benefits"
      className="py-24 flex flex-col gap-24 items-center justify-center"
    >
      <div className="max-w-[800px] flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="heading-section">{sectionName}</p>
          <h1>{title}</h1>
        </div>
        <p className="text-center text-large">{description}</p>
      </div>

      <div className="w-full grid grid-cols-[max(558px),1fr] gap-24 justify-between items-center">
        <BenefitsImage />

        <div className="grid grid-cols-[auto,1fr] gap-x-6 items-start">
          {benefits.map(({ title, description, Icon }, index) => (
            <Fragment key={index}>
              <div className="h-full grid grid-cols-1 grid-rows-[max(44px),1fr]">
                <div className="h-[44px] w-[44px] rounded-full border-2 border-dotted border-primary flex justify-center items-center">
                  <Icon className="h-6 w-6 text-primary stroke-[3]" />
                </div>
                <div className="h-full flex justify-center">
                  <div className="w-1 h-full border-l-2 border-dotted border-primary"></div>
                </div>
              </div>
              <div className="mb-12 last:mb-0">
                <h2 className="mb-4">{title}</h2>
                <p className="text-large">{description}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
