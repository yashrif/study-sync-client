"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import { DataTablePagination } from "@/components/table/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTable } from "@/hooks/useTable";
import { TableControls, TTableControl } from "@/types";
import Spinner from "../Spinner";
import ControlBar from "./ControlBar";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  uploadEndpointDb: string | undefined;
  searchKey: string;
  showPagination?: boolean;
  controlsConfig?: { [key in TableControls]?: TTableControl };
  className?: string;
  classNameControls?: string;
};

const DataTable = <TData, TValue>({
  columns,
  data,
  uploadEndpointDb,
  loading = false,
  searchKey,
  showPagination = true,
  controlsConfig,
  className,
  classNameControls,
}: DataTableProps<TData, TValue>) => {
  const { table } = useTable({
    data,
    columns,
  });

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
                              header.getContext()
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
                          cell.getContext()
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
