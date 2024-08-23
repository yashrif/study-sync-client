import { IconCircleFilled } from "@tabler/icons-react";

import RadialProgress from "@/components/RadialProgress";
import { IconList } from "@/types";
import { Color } from "../type";
import StatsHeading from "./StatsHeading";

type Props = {
  heading: Omit<IconList, "description">;
  color: Color;
  totalCount: number;
  countLabel: string;
  percentage: number;
  percentageLabel: string;
  supplementaryLabel: string;
};

const Stat: React.FC<Props> = ({
  heading,
  color,
  totalCount,
  countLabel,
  percentage,
  percentageLabel,
  supplementaryLabel,
}) => {
  return (
    <div className="min-w-[200px] flex flex-col gap-4">
      <StatsHeading
        {...heading}
        style={{
          color: color.text,
        }}
      />
      <div className="flex flex-col gap-4">
        <p
          className={`text-center font-medium`}
          style={{
            color: color.text,
          }}
        >
          <span className="text-3xl">{totalCount}</span>{" "}
          <span className="text-lg">{countLabel}</span>
        </p>
        <RadialProgress
          className="mx-auto"
          stroke={color.text}
          value={percentage}
          pathColor={color.path}
          radius={40}
        />
        <div className="flex gap-4 justify-between items-center">
          {[
            {
              value: percentage,
              label: percentageLabel,
              color: color.text,
            },
            {
              value: 100 - percentage,
              label: supplementaryLabel,
              color: color.path,
            },
          ].map((data, index) => (
            <div key={index} className="flex gap-2 items-center">
              <IconCircleFilled
                className="size-5"
                style={{
                  fill: data.color,
                }}
              />
              <div className="flex flex-col">
                <span className="text-medium font-semibold -mb-0.5">
                  {Math.round((data.value * totalCount) / 100)
                    .toString()
                    .padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground capitalize tracking-wide">
                  {data.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stat;
