"use client";

import { Table } from "@tanstack/react-table";
import _ from "lodash";

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
};

const ControlBar = <TData, TValue>({
  table,
  uploadEndpointDb: url,
  searchKey,
  controlsConfig = {
    [TableControlTypes.UPLOAD]: {
      hidden: false,
      order: 1,
      variant: controlBar.upload.variant,
      title: controlBar.upload.title,
    },
    [TableControlTypes.ADD_FOLDER]: {
      hidden: false,
      order: 2,
      variant: controlBar.addFolder.variant,
      title: controlBar.addFolder.title,
    },
    [TableControlTypes.DELETE]: {
      hidden: false,
      order: 3,
      variant: controlBar.delete.variant,
      title: controlBar.delete.title,
    },
    [TableControlTypes.SEARCH]: {
      hidden: false,
      order: 4,
      variant: "outline",
      title: controlBar.search.title,
    },
    [TableControlTypes.VIEW]: {
      hidden: false,
      order: 5,
      variant: controlBar.view.variant,
      title: controlBar.view.title,
    },
    [TableControlTypes.STUDY]: {
      hidden: false,
      order: 5,
      variant: controlBar.study.variant,
      title: controlBar.study.title,
    },
  },
  className,
}: Props<TData, TValue>) => {
  return (
    <div className={`flex gap-16 items-center justify-between ${className}`}>
      <div className="w-full flex gap-3 items-center">
        {controlsConfig.UPLOAD && !controlsConfig?.UPLOAD?.hidden && (
          <UploadControl
            uploadEndpointDb={url}
            style={{
              order: controlsConfig[TableControlTypes.UPLOAD]?.order,
            }}
            {..._.omit(controlsConfig[TableControlTypes.UPLOAD], "onClick")}
            onUpload={controlsConfig.UPLOAD.onClick}
            status={controlsConfig.UPLOAD.status}
          />
        )}
        {controlsConfig.ADD_FOLDER && !controlsConfig?.ADD_FOLDER?.hidden && (
          <IconButton
            title={
              controlsConfig.ADD_FOLDER.title || controlBar.addFolder.title
            }
            Icon={controlsConfig.ADD_FOLDER.Icon || controlBar.addFolder.Icon}
            variant={
              controlsConfig.ADD_FOLDER.variant || controlBar.addFolder.variant
            }
            size={controlsConfig.ADD_FOLDER.size || controlBar.addFolder.size}
            style={{
              order: controlsConfig[TableControlTypes.ADD_FOLDER]?.order,
            }}
            iconClassName="stroke-[2.5]"
            {...controlsConfig[TableControlTypes.ADD_FOLDER]}
            status={controlsConfig.ADD_FOLDER.status}
          />
        )}
        {controlsConfig.DELETE && !controlsConfig?.DELETE?.hidden && (
          <IconButton
            title={controlsConfig.DELETE.title || controlBar.delete.title}
            Icon={controlsConfig.DELETE.Icon || controlBar.delete.Icon}
            variant={controlsConfig.DELETE.variant || controlBar.delete.variant}
            size={controlsConfig.DELETE.size || controlBar.delete.size}
            className={`mr-auto ${table.getFilteredSelectedRowModel().rows.length > 0 ? "visible" : "invisible"}`}
            iconClassName="stroke-[2.5]"
            style={{
              order: controlsConfig[TableControlTypes.DELETE]?.order,
            }}
            {...controlsConfig[TableControlTypes.DELETE]}
            onClick={controlsConfig.DELETE.onClick}
            status={controlsConfig.DELETE.status}
          />
        )}
        {controlsConfig.SEARCH && !controlsConfig.SEARCH?.hidden && (
          <div
            style={{
              order: controlsConfig[TableControlTypes.SEARCH]?.order,
            }}
          >
            {
              <SearchControl
                table={table}
                searchKey={searchKey}
                {...controlsConfig.SEARCH}
              />
            }
          </div>
        )}
        {controlsConfig.VIEW && !controlsConfig.VIEW?.hidden && (
          <ViewControl table={table} {...controlsConfig.VIEW} />
        )}
      </div>
    </div>
  );
};

export default ControlBar;
