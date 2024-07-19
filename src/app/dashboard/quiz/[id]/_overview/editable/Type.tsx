import { IconChevronDown } from "@tabler/icons-react";
import { useEffect } from "react";

import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useQueryString } from "@/hooks/useQueryString";
import { QuizTypes } from "@/types";
import Property from "../../_components/Property";

const Type: React.FC = () => {
  const { checkQueryString } = useQueryString();
  const { updateQueryParams, setParams } = useQueryParams();

  useEffect(() => {
    setParams(queryParams.types.key, queryParams.types.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-16 justify-between items-center">
      <Property
        title={quizDetails.preferences.fields.types.title}
        Icon={quizDetails.preferences.fields.types.Icon}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="group size-auto border-none p-0 flex items-center gap-4 text-base text-text-200 cursor-pointer">
            <IconChevronDown className="size-5 text-primary opacity-0 invisible group-hover:visible group-hover:opacity-100 transform transition-all duration-300" />
            <span>Types</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[120px]">
          <DropdownMenuCheckboxItem
            checked={checkQueryString(queryParams.types.key, QuizTypes.MCQ)}
            onCheckedChange={() => {
              updateQueryParams(queryParams.types.key, QuizTypes.MCQ);
            }}
          >
            MCQ
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checkQueryString(queryParams.types.key, QuizTypes.CQ)}
            onCheckedChange={() => {
              updateQueryParams(queryParams.types.key, QuizTypes.CQ);
            }}
          >
            CQ
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Type;