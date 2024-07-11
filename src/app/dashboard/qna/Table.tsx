import { flexRender, Table as TTable } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { search } from "@/assets/data/dashboard/qna";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { Status, TableControls, UploadSimple } from "@/types";
import Spinner from "@components/Spinner";
import ControlBar from "@components/table/ControlBar";
import { columns } from "./Columns";

type Props = {
  table: TTable<UploadSimple>;
  setUploadStatus: Dispatch<SetStateAction<Status>>;
  status: Status;
};

const Table: React.FC<Props> = ({ table, setUploadStatus, status }) => {
  return (
    <div className={`flex flex-col gap-8 pt-8`}>
      <ControlBar
        table={table}
        searchKey={search.key}
        uploadEndpointDb={dbEndpoints.uploads}
        controlsConfig={{
          [TableControls.Upload]: {
            show: true,
            order: 2,
            variant: "outline",
          },
          [TableControls.Search]: {
            show: true,
            order: 1,
            title: "Search Files",
          },
        }}
        setUploadStatus={setUploadStatus}
        className={`!justify-start gap-3`}
      />
      <div className="flex flex-col gap-4">
        <div className="rounded-md border">
          <UITable>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.slice(0, 2).map((header) => {
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
              {status === Status.PENDING ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-24">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const checkBox = row.getVisibleCells().slice(0, 1)[0];
                  const title = row.getVisibleCells().slice(1).slice(0, 1)[0];
                  const cellGroup = row.getVisibleCells().slice(1).slice(1);

                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      <TableCell className="align-top">
                        {flexRender(
                          checkBox.column.columnDef.cell,
                          checkBox.getContext()
                        )}
                      </TableCell>

                      <TableCell className="flex flex-col gap-2">
                        <p>
                          {flexRender(
                            title.column.columnDef.cell,
                            title.getContext()
                          )}
                        </p>

                        <div className="flex flex-col gap-1.5">
                          {cellGroup.map((cell) =>
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {status === Status.SUCCESS
                      ? "No results."
                      : "An error occurred."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </UITable>
        </div>
      </div>
    </div>
  );
};

export default Table;
