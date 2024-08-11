import { motion } from "framer-motion";

import { shadeGenerator } from "@/utils/shadeGenerator";

type Props = {
  value: number;
  strokeWidth?: number;
  radius?: number;
  stroke?: string;
  isShowPercentage?: boolean;
};

const RadialProgress: React.FC<Props> = ({
  value,
  strokeWidth = 10,
  radius = 50,
  stroke = "#8B5FBF",
  isShowPercentage = true,
}) => {
  const percentage = Math.min(Math.max(value, 0.1), 100);
  const width = radius * 2 + 20;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative">
      <svg
        width={width}
        height={width}
        xmlns="http://www.w3.org/2000/svg"
        className="-rotate-90"
      >
        <defs>
          <radialGradient
            id="circle-progress"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(53.1659 -18.1884) rotate(51.1683) scale(267.012 282.957)"
          >
            <stop stopColor={stroke} />
            <stop offset="1" stopColor={shadeGenerator(stroke, 75, "shade")} />
          </radialGradient>
        </defs>
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeLinecap="round"
          className="fill-none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
            strokeWidth: `${strokeWidth}px`,
          }}
        />

        <motion.circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          strokeLinecap="round"
          className="fill-none stroke-[url('#circle-progress')]"
          initial={{
            strokeDashoffset: circumference,
            strokeDasharray: circumference,
          }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            stiffness: 260,
            damping: 20,
            delay: 0.5,
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            strokeWidth: `${strokeWidth}px`,
          }}
        />
      </svg>
      {isShowPercentage && (
        <span
          className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 font-semibold"
          style={{
            color: stroke,
            fontSize: `${radius / 2}px`,
          }}
        >
          {value.toPrecision(3)}%
        </span>
      )}
    </div>
  );
};

export default RadialProgress;
