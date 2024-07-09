"use client";

import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { DataTableViewOptions } from "@/components/table/ColumnToggle";
import { Input } from "@/components/ui/input";
import { TableControls, TTableControls } from "@allTypes";
import { IconSearch } from "@tabler/icons-react";
import ControlButton from "./ControlButton";
import UploadController from "./UploadController";

type Props<TData, TValue> = {
  table: Table<TData>;
  uploadEndpointDb: string | undefined;
  searchKey: string;
  controlsConfig?: TTableControls;
  className?: string;
};

const ControlBar = <TData, TValue>({
  table,
  uploadEndpointDb: url,
  searchKey,
  controlsConfig = {
    [TableControls.Upload]: {
      show: true,
      order: 1,
      variant: controlBar.upload.variant,
    },
    [TableControls.AddFolder]: {
      show: true,
      order: 2,
      variant: controlBar.addFolder.variant,
    },
    [TableControls.Delete]: {
      show: true,
      order: 3,
      variant: controlBar.delete.variant,
    },
    [TableControls.Search]: {
      show: true,
      order: 4,
      variant: "outline",
    },
    [TableControls.View]: {
      show: true,
      order: 5,
      variant: controlBar.view.variant,
    },
  },
  className,
}: Props<TData, TValue>) => {
  console.log("Controls -> controlsConfig", controlsConfig);

  return (
    <div className={`flex gap-16 items-center justify-between ${className}`}>
      <div className="w-full flex gap-3 items-center">
        {controlsConfig?.Upload?.show && (
          <UploadController
            uploadEndpointDb={url}
            style={{
              order: controlsConfig[TableControls.Upload]?.order,
            }}
          />
        )}
        {controlsConfig?.AddFolder?.show && (
          <ControlButton
            title={controlBar.addFolder.title}
            Icon={controlBar.addFolder.Icon}
            variant={controlsConfig.AddFolder.variant}
            size={controlBar.addFolder.size}
            style={{
              order: controlsConfig[TableControls.AddFolder]?.order,
            }}
          />
        )}
        {controlsConfig?.Delete?.show && (
          <ControlButton
            title={controlBar.delete.title}
            Icon={controlBar.delete.Icon}
            variant={controlBar.delete.variant}
            size={controlBar.delete.size}
            show={table.getFilteredSelectedRowModel().rows.length > 0}
            className="mr-auto"
            style={{
              order: controlsConfig[TableControls.Delete]?.order,
            }}
          />
        )}
        {controlsConfig.Search?.show && (
          <div
            style={{
              order: controlsConfig[TableControls.Search]?.order,
            }}
          >
            <Input
              dimension="sm"
              placeholder={controlBar.search.title}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="max-w-sm rounded-sm border-primary placeholder:text-muted-foreground/70"
              Icon={IconSearch}
            />
          </div>
        )}
        {controlsConfig.View?.show && (
          <DataTableViewOptions
            table={table}
            style={{
              order: controlsConfig[TableControls.View]?.order,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ControlBar;
