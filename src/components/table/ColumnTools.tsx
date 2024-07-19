import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { Column, TableAction } from "@/types";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import Dropdown from "../Dropdown";
import { DataTableColumnHeader } from "./Header";

export const Checkbox = <T extends object>(): ColumnDef<T> => ({
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

export const Actions = <T extends object>({
  actions,
  copyId = false,
}: {
  actions: TableAction[];
  copyId?: boolean;
}): ColumnDef<T> => ({
  id: "actions",
  cell: ({ row }) => {
    const data = row.original;

    return (
      <Dropdown actions={actions}>
        {copyId && "id" in data && (
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(String(data.id))}
            className="cursor-pointer"
          >
            Copy ID
          </DropdownMenuItem>
        )}
      </Dropdown>
    );
  },
});

export const ColumnHeader = <T extends object>({
  column: columnInfo,
}: {
  column: Column;
}): ColumnDef<T> => ({
  accessorKey: columnInfo.accessorKey,
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title={columnInfo.title}
      className={columnInfo.headerClassName}
    />
  ),
  cell: ({ row }) => {
    const cell = columnInfo.formatter
      ? columnInfo.formatter(
          (row.original as Record<string, any>)[columnInfo.accessorKey]
        )
      : (row.original as Record<string, any>)[columnInfo.accessorKey];

    const linkCell =
      columnInfo.type === "link" ? (
        <Link
          href={`${columnInfo.path}/${(row.original as Record<string, any>)[columnInfo.linkKey]}`}
          className={`anchor-sm ${columnInfo.className}`}
        >
          {cell}
        </Link>
      ) : (
        <span
          className={
            (columnInfo.className &&
              columnInfo.className(
                (row.original as Record<string, any>)[columnInfo.accessorKey]
              )) ||
            "text-text-200"
          }
        >
          {cell}
        </span>
      );

    if (!columnInfo.Icon) return linkCell;

    const Icon = columnInfo.Icon({
      key: columnInfo.accessorKey,
      value: row.original as any,
    });

    return (
      <div className="flex items-center space-x-1">
        <Icon
          className={`h-4 w-auto ${
            (columnInfo.iconClassName &&
              columnInfo.iconClassName(
                (row.original as Record<string, any>)[columnInfo.accessorKey]
              )) ||
            "text-text-200"
          }`}
        />
        {linkCell}
        {columnInfo.additionalElement &&
          columnInfo.additionalElement(row.original as any)}
      </div>
    );
  },
});
