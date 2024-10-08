"use client";

import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { useQueryString } from "@/hooks/useQueryString";
import { Difficulty as TDifficulty } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useQueryParams } from "@hooks/useQueryParams";
import { IconChevronDown } from "@tabler/icons-react";
import Property from "../../_components/Property";

const Difficulty: React.FC = () => {
  const { setQueryParams } = useQueryParams();
  const difficulty =
    useQueryString().getQueryString(queryParams.difficulty.name) ||
    queryParams.difficulty.value;

  return (
    <div className="flex gap-16 justify-between items-center text-medium">
      <Property
        title={quizDetails.preferences.fields.difficulty.title}
        Icon={quizDetails.preferences.fields.difficulty.Icon}
      />
      <Select
        value={difficulty || ""}
        onValueChange={(value) => {
          setQueryParams(queryParams.difficulty.name, value);
        }}
      >
        <SelectTrigger className="group size-auto border-none p-0 flex items-center gap-4 [&>*:last-child]:hidden text-base text-text-200">
          <IconChevronDown className="size-5 text-primary opacity-0 invisible group-hover:visible group-hover:opacity-100 transform transition-all duration-300" />
          <SelectValue
            placeholder={TDifficulty.MEDIUM.toLowerCase()}
            className="placeholder:capitalize"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(TDifficulty).map((value) => (
              <SelectItem
                key={value}
                value={value}
                className="text-text-200 cursor-pointer"
              >
                {value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Difficulty;
