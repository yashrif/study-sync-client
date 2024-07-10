"use client";

import { flexRender } from "@tanstack/react-table";
import { Suspense, useState } from "react";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints, dbEndpoints } from "@/assets/data/api";
import { search } from "@/assets/data/dashboard/qna";
import IconButton from "@/components/button/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTable } from "@/hooks/useTable";
import { useUploads } from "@/hooks/useUploads";
import { Status, TableControls } from "@/types";
import Spinner from "@components/Spinner";
import ControlBar from "@components/table/ControlBar";
import { IconArrowRight } from "@tabler/icons-react";
import { columns } from "./Columns";

const generateQna = async (data: string[]) => {
  return (await studySyncAI.post(aiEndpoints.qna, data)).data;
};

const FileLIst = () => {
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.IDLE);
  const { uploads, status } = useUploads([uploadStatus]).getUploads();
  const { table } = useTable({
    data: uploads,
    columns,
  });

  console.log(uploadStatus);

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="divide-y-2 w-full">
        <Suspense fallback={<Spinner />}>
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
                <Table>
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
                        <TableCell colSpan={columns.length} className="h-24">
                          <Spinner className="mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => {
                        const checkBox = row.getVisibleCells().slice(0, 1)[0];
                        const title = row
                          .getVisibleCells()
                          .slice(1)
                          .slice(0, 1)[0];
                        const cellGroup = row
                          .getVisibleCells()
                          .slice(1)
                          .slice(1);

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
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Suspense>
      </div>

      <IconButton
        title=""
        size="lg"
        className="size-12 p-0 rounded-full"
        Icon={IconArrowRight}
        iconClassName="!size-6"
        disabled={
          table && table.getFilteredSelectedRowModel().rows.length === 0
        }
        onClick={async () => {
          const data = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original.id);
          const qna = await generateQna(data);
          console.log(qna);
        }}
      />
    </div>
  );
};

export default FileLIst;
