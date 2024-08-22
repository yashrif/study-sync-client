import { IconCircleFilled } from "@tabler/icons-react";

import RadialProgress from "@/components/RadialProgress";
import { Color } from "../type";

type Props = {
  color: Color;
  progress: number;
};

const OverallProgress: React.FC<Props> = ({ color, progress }) => {
  return (
    <div className="min-w-[200px] flex flex-col gap-4 self-end flex-grow">
      <p
        className="text-center font-medium text-3xl"
        style={{
          color: color.text,
        }}
      >
        Overall
      </p>
      <RadialProgress
        className="mx-auto"
        stroke={color.text}
        value={progress}
        pathColor={color.path}
        radius={40}
      />
      <div className="flex gap-4 justify-between items-center">
        {[
          {
            value: progress,
            label: "Completed",
            color: color.text,
          },
          {
            value: 100 - progress,
            label: "In Progress",
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
                {data.value.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground capitalize tracking-wide">
                {data.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallProgress;
