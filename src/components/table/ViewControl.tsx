"use client";

import { DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { TTableControl } from "@/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";
import IconButton from "../button/IconButton";

type Props<TData> = {
  table: Table<TData>;
  style?: React.CSSProperties;
} & TTableControl;

function ViewControl<TData>({
  table,
  style,
  order,
  title,
  Icon,
  variant,
  size,
  ...rest
}: Props<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild style={{ ...style, order }} {...rest}>
        <IconButton
          title={title || controlBar.view.title}
          Icon={Icon || controlBar.view.Icon}
          variant={variant || controlBar.view.variant}
          size={size || controlBar.view.size}
          show={table.getFilteredSelectedRowModel().rows.length > 0}
          style={{ ...style, order }}
          {...rest}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ViewControl;
