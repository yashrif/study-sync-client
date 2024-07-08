"use client";

import { Table } from "@tanstack/react-table";

import { navbarButtons } from "@/assets/data/dashboard/uploads";
import { DataTableViewOptions } from "@/components/table/ColumnToggle";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import ControlButton from "./ControlButton";
import UploadController from "./UploadController";

interface Props<TData, TValue> {
  table: Table<TData>;
  uploadEndpointDb: string | undefined;
  search: {
    placeholder: string;
    key: string;
  };
}

const Controls = <TData, TValue>({
  table,
  uploadEndpointDb: url,
  search,
}: Props<TData, TValue>) => {
  return (
    <div className="flex gap-16 items-center justify-between">
      <div className="flex gap-3 items-center">
        <UploadController uploadEndpointDb={url} />
        <ControlButton
          title={navbarButtons.addFolder.title}
          Icon={navbarButtons.addFolder.Icon}
          variant={navbarButtons.addFolder.variant}
          size={navbarButtons.addFolder.size}
        />
        <ControlButton
          title={navbarButtons.delete.title}
          Icon={navbarButtons.delete.Icon}
          variant={navbarButtons.delete.variant}
          size={navbarButtons.delete.size}
          show={table.getFilteredSelectedRowModel().rows.length > 0}
        />
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex items-center">
          <Input
            dimension="sm"
            placeholder={search.placeholder}
            value={
              (table.getColumn(search.key)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(search.key)?.setFilterValue(event.target.value)
            }
            className="max-w-sm rounded-sm border-primary placeholder:text-muted-foreground/70"
            Icon={IconSearch}
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};

export default Controls;
