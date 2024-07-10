import { IconDots } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { Column, UploadSimple } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "./Header";

export const Checkbox = (): ColumnDef<UploadSimple> => ({
  id: "select",
  header: ({ table }) => (
    <CheckboxComponent
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <CheckboxComponent
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
});

type ActionProps = {
  title: string;
  onClick?: () => void;
};

export const Actions = ({
  actions,
  copyId = false,
}: {
  actions: ActionProps[];
  copyId?: boolean;
}): ColumnDef<UploadSimple> => ({
  id: "actions",
  cell: ({ row }) => {
    const data = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {copyId && "id" in data && (
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(data.id))}
            >
              Copy ID
            </DropdownMenuItem>
          )}
          {actions.map((action) => (
            <DropdownMenuItem key={action.title} onClick={action.onClick}>
              {action.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});

export const ColumnHeader = ({
  column: columnInfo,
}: {
  column: Column;
}): ColumnDef<UploadSimple> => ({
  accessorKey: columnInfo.accessorKey,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={columnInfo.title} />
  ),
  cell: ({ row }) => {
    const cell = columnInfo.formatter
      ? columnInfo.formatter(
          (row.original as Record<string, any>)[columnInfo.accessorKey]
        )
      : (row.original as Record<string, any>)[columnInfo.accessorKey];

    const linkCell = columnInfo.linkKey ? (
      <Link
        href={(row.original as Record<string, any>)[columnInfo.linkKey]}
        className={`anchor-sm ${columnInfo.className}`}
      >
        {cell}
      </Link>
    ) : (
      <span className={columnInfo.className}>{cell}</span>
    );

    if (!columnInfo.Icon) return linkCell;

    const Icon = columnInfo.Icon({
      key: columnInfo.accessorKey,
      value: row.original,
    });

    return (
      <div className="flex items-center space-x-1">
        <Icon className={`h-4 w-auto text-text-200 ${columnInfo.className}`} />
        {linkCell}
      </div>
    );
  },
});
