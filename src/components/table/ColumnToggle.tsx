"use client";

import { DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
  style?: React.CSSProperties;
};

export function DataTableViewOptions<TData>({
  table,
  style,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild style={{ ...style }}>
        <Button
          variant={controlBar.view.variant}
          size={controlBar.view.size}
        >
          {controlBar.view.Icon && (
            <controlBar.view.Icon className="mr-2 h-4 w-4" />
          )}
          {controlBar.view.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
