"use client";

import { ColumnDef, flexRender, Table as TTable } from "@tanstack/react-table";

import { DataTablePagination } from "@/components/table/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableControlTypes, TTableControl } from "@/types";
import Spinner from "../spinner/Spinner";
import ControlBar from "./ControlBar";

type DataTableProps<TData, TValue> = {
  className?: string;
  classNameControls?: string;
  columns: ColumnDef<TData, TValue>[];
  controlsConfig?: { [key in TableControlTypes]?: TTableControl };
  loading?: boolean;
  searchKey: string;
  showPagination?: boolean;
  table: TTable<TData>;
  uploadEndpointDb: string | undefined;
};

const DataTable = <TData, TValue>({
  className,
  classNameControls,
  columns,
  controlsConfig,
  loading = false,
  searchKey,
  showPagination = true,
  table,
  uploadEndpointDb,
}: DataTableProps<TData, TValue>) => {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <ControlBar
        table={table}
        searchKey={searchKey}
        uploadEndpointDb={uploadEndpointDb}
        controlsConfig={controlsConfig}
        className={classNameControls}
      />
      <div className="flex flex-col gap-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group border-none"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="pb-0 pt-2.5 group-last:pb-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {showPagination && <DataTablePagination table={table} />}
      </div>
    </div>
  );
};

export default DataTable;
