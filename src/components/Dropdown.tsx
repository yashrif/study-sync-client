import { IconDots } from "@tabler/icons-react";

import { TableAction } from "@/types";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

type Props = {
  label?: string;
  actions?: TableAction[];
  triggerButton?: React.ReactNode;
  children?: React.ReactNode;
  size?: "md" | "auto";
};

const Dropdown: React.FC<Props> = ({
  label = "Actions",
  actions,
  triggerButton = (
    <Button
      variant="ghost"
      className="h-8 w-8 p-0 cursor-pointer text-text-200"
    >
      <span className="sr-only">Open menu</span>
      <IconDots className="h-4 w-4" />
    </Button>
  ),
  children,
  size = "auto",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {triggerButton}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${size === "md" ? "w-[150px]" : ""}`}
      >
        <DropdownMenuLabel className="text-primary">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
        {actions?.map((action) => (
          <DropdownMenuItem
            key={action.title}
            onClick={action.onClick}
            className={`flex items-center gap-1.5 cursor-pointer ${action.className}`}
          >
            {action.Icon && (
              <action.Icon className={`size-[14px] ${action.iconClassName}`} />
            )}
            <span className={action.titleClassName}>{action.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
