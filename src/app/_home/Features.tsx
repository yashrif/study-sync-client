import {
  description,
  features,
  sectionName,
  title,
} from "@/assets/data/home/Features";
import React from "react";

const Features: React.FC = () => {
  const MAX_FEATURES = 3;

  const newFeatures = [];

  for (let i = 0; i < Math.ceil(features.length / MAX_FEATURES); i++) {
    const icons = features
      .slice(i * MAX_FEATURES, (i + 1) * MAX_FEATURES)
      .map((feature) => feature.Icon);
    const titles = features
      .slice(i * MAX_FEATURES, (i + 1) * MAX_FEATURES)
      .map((feature) => feature.title);
    const descriptions = features
      .slice(i * MAX_FEATURES, (i + 1) * MAX_FEATURES)
      .map((feature) => feature.description);

    newFeatures.push({ icons, titles, descriptions });
  }

  return (
    <section
      id="features"
      className="py-24 flex flex-col gap-24 items-center justify-center"
    >
      <div className="max-w-[800px] flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h4>{sectionName}</h4>
          <h1>{title}</h1>
        </div>
        <p className="text-center text-large">{description}</p>
      </div>
      <div className="flex flex-col gap-24">
        {newFeatures.map((features, featureIndex) => (
          <div
            key={`features-${featureIndex}`}
            className="grid grid-cols-3 gap-x-16 justify-center items-start text-center"
          >
            {features.icons.map((Icon, index) => (
              <div
                key={`${featureIndex}-${index}-icon`}
                className="flex justify-center mb-8"
              >
                <div className="p-4 rounded-full bg-accent-300">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </div>
            ))}
            {features.titles.map((title, index) => (
              <h2 key={`${featureIndex}-${index}-title`} className="mb-4">
                {title}
              </h2>
            ))}
            {features.descriptions.map((description, index) => (
              <p
                key={`${featureIndex}-${index}-description`}
                className="text-large"
              >
                {description}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
