"use client";

import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { TTableControl } from "@/types";
import { Button } from "@components/ui/button";
import { DropdownMenuCheckboxItem } from "@components/ui/dropdown-menu";
import Dropdown from "../Dropdown";

type Props<TData> = {
  table: Table<TData>;
  style?: React.CSSProperties;
} & TTableControl;

function ViewControl<TData>({
  table,
  style,
  order,
  title = controlBar.view.title,
  Icon = controlBar.view.Icon,
  variant = controlBar.view.variant,
  size = controlBar.view.size,
}: Props<TData>) {
  const triggerButton = (
    <Button
      className="flex gap-1.5 items-center"
      variant={variant}
      size={size}
      style={{
        ...style,
        order,
      }}
    >
      <span className="sr-only">Open menu</span>
      {Icon && <Icon className="h-4 w-auto stroke-[2.5px]" />}
      <span>{title}</span>
    </Button>
  );

  return (
    <Dropdown triggerButton={triggerButton} size="md">
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
    </Dropdown>
  );
}

export default ViewControl;
