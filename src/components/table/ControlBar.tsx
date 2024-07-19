"use client";

import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { TableControlTypes, TTableControl } from "@allTypes";
import IconButton from "../button/IconButton";
import SearchControl from "./SearchControl";
import UploadControl from "./UploadControl";
import ViewControl from "./ViewControl";

type Props<TData, TValue> = {
  table: Table<TData>;
  uploadEndpointDb: string | undefined;
  searchKey: string;
  controlsConfig?: { [key in TableControlTypes]?: TTableControl };
  className?: string;
  onUpload?: () => void;
};

const ControlBar = <TData, TValue>({
  table,
  uploadEndpointDb: url,
  searchKey,
  controlsConfig = {
    [TableControlTypes.Upload]: {
      show: true,
      order: 1,
      variant: controlBar.upload.variant,
      title: controlBar.upload.title,
    },
    [TableControlTypes.AddFolder]: {
      show: true,
      order: 2,
      variant: controlBar.addFolder.variant,
      title: controlBar.addFolder.title,
    },
    [TableControlTypes.Delete]: {
      show: true,
      order: 3,
      variant: controlBar.delete.variant,
      title: controlBar.delete.title,
    },
    [TableControlTypes.Search]: {
      show: true,
      order: 4,
      variant: "outline",
      title: controlBar.search.title,
    },
    [TableControlTypes.View]: {
      show: true,
      order: 5,
      variant: controlBar.view.variant,
      title: controlBar.view.title,
    },
  },
  className,
  onUpload,
}: Props<TData, TValue>) => {
  return (
    <div className={`flex gap-16 items-center justify-between ${className}`}>
      <div className="w-full flex gap-3 items-center">
        {controlsConfig?.Upload?.show && (
          <UploadControl
            uploadEndpointDb={url}
            style={{
              order: controlsConfig[TableControlTypes.Upload]?.order,
            }}
            {...controlsConfig[TableControlTypes.Upload]}
            onUpload={onUpload}
          />
        )}
        {controlsConfig?.AddFolder?.show && (
          <IconButton
            title={controlsConfig.AddFolder.title || controlBar.addFolder.title}
            Icon={controlsConfig.AddFolder.Icon || controlBar.addFolder.Icon}
            variant={
              controlsConfig.AddFolder.variant ||
              controlsConfig.AddFolder.variant
            }
            size={controlsConfig.AddFolder.size || controlBar.addFolder.size}
            style={{
              order: controlsConfig[TableControlTypes.AddFolder]?.order,
            }}
            {...controlsConfig[TableControlTypes.AddFolder]}
          />
        )}
        {controlsConfig?.Delete?.show && (
          <IconButton
            title={controlsConfig.Delete.title || controlBar.delete.title}
            Icon={controlsConfig.Delete.Icon || controlBar.delete.Icon}
            variant={controlsConfig.Delete.variant || controlBar.delete.variant}
            size={controlsConfig.Delete.size || controlBar.delete.size}
            show={table.getFilteredSelectedRowModel().rows.length > 0}
            className="mr-auto"
            style={{
              order: controlsConfig[TableControlTypes.Delete]?.order,
            }}
            {...controlsConfig[TableControlTypes.Delete]}
          />
        )}
        {controlsConfig.Search?.show && (
          <div
            style={{
              order: controlsConfig[TableControlTypes.Search]?.order,
            }}
          >
            {
              <SearchControl
                table={table}
                searchKey={searchKey}
                {...controlsConfig.Search}
              />
            }
          </div>
        )}
        {controlsConfig.View?.show && (
          <ViewControl table={table} {...controlsConfig.View} />
        )}
      </div>
    </div>
  );
};

export default ControlBar;
