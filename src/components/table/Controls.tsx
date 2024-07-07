"use client";

import { Table } from "@tanstack/react-table";
import { useState } from "react";

import { navbarButtons } from "@/assets/data/dashboard/documents";
import { DataTableViewOptions } from "@/components/table/ColumnToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import AddFile from "./AddFile";

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
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  return (
    <div className="flex gap-16 items-center justify-between">
      <AddFile
        uploadEndpointDb={url}
        isOpen={isDropzoneOpen}
        setIsOpen={setIsDropzoneOpen}
      />
      <div className="flex gap-3 items-center">
        {[
          {
            ...navbarButtons.upload,
            show: true,
            onClick: () => {
              setIsDropzoneOpen(!isDropzoneOpen);
            },
          },
          {
            ...navbarButtons.addFolder,
            show: true,
          },
          {
            ...navbarButtons.delete,
            show: table.getFilteredSelectedRowModel().rows.length > 0,
          },
        ].map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            size={button.size}
            className="flex items-center gap-1.5"
            style={{
              visibility: button.show ? "visible" : "hidden",
            }}
            onClick={button.onClick ? button.onClick : () => {}}
          >
            {button.Icon && <button.Icon className="h-4 w-auto" />}
            {button.title}
          </Button>
        ))}
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
