import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { addAlphaToHex } from "@/utils/colorGenerator";
import { dateFormatter } from "@/utils/dateFormatter";
import { IconCalendarFilled } from "@tabler/icons-react";
import { Color } from "../type";

type Data = { name: string; value: number; date: string };

type Props = {
  data: Data[];
  color: Color;
};

const PlannerChart: React.FC<Props> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="90%" className="self-end">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke={color.text} strokeWidth={2.5} />
        <YAxis stroke={color.text} strokeWidth={2.5} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color.text}
          strokeWidth={2.5}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlannerChart;

type CustomTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: {
    stroke: string;
    strokeWidth: number;
    fill: string;
    dataKey: string;
    name: string;
    color: string;
    value: number;
    payload: { name: string; value: number; date: string };
    hide: boolean;
  }[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  label,
  payload,
}) => {
  return active && label && payload ? (
    <div
      className="py-2 px-4 rounded-sm text-text-300 flex flex-col gap-2"
      style={{
        backgroundColor: addAlphaToHex(payload[0].color, 80),
      }}
    >
      <p className="text-xs font-medium">{label}</p>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <div className="flex gap-0.5 items-center">
            <IconCalendarFilled className="stroke-white size-[14px]" />
            <span className="text-small pt-[1px] font-medium">Date: </span>
          </div>
          <p className="text-small">{dateFormatter(payload[0].payload.date)}</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex gap-0.5 items-center">
            <IconCalendarFilled className="stroke-white size-[14px]" />
            <span className="text-small pt-[1px] font-medium">
              Topics covered:{" "}
            </span>
          </div>
          <p className="text-small">
            {payload[0].payload.value.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};
