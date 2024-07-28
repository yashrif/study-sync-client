import { flexRender, Table as TTable } from "@tanstack/react-table";

import { dbEndpoints } from "@/assets/data/api";
import { search } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import {
  Status,
  TableControlTypes,
  TTableControl,
  UploadShallow,
} from "@/types";
import ControlBar from "@components/table/ControlBar";
import { columns } from "./Columns";

type Props = {
  table: TTable<UploadShallow>;

  controlsConfig?: { [key in TableControlTypes]?: TTableControl };
};

const UploadsTable: React.FC<Props> = ({ table, controlsConfig }) => {
  const {
    state: { status },
  } = useQuizUploadsContext();

  return (
    <>
      <ControlBar
        table={table}
        searchKey={search.key}
        uploadEndpointDb={dbEndpoints.uploads}
        controlsConfig={controlsConfig}
        className={`!justify-start gap-3`}
      />
      <div className="flex flex-col rounded-md overflow-hidden row-start-2 col-start-1">
        <UITable>
          <TableHeader className="bg-accent-300 !hover:bg-accent-300 [&_tr]:border-none">
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
        </UITable>
        <div className="rounded-b-md border h-[420px] overflow-y-scroll overflow-x-clip">
          <UITable className="">
            <TableBody>
              {status === Status.PENDING || status === Status.IDLE ? (
                <TableRow className="h-[418px]">
                  <TableCell colSpan={2} className="h-full">
                    <Spinner className="m-auto size-10" />
                  </TableCell>
                </TableRow>
              ) : status === Status.SUCCESS ? (
                table.getRowModel().rows?.length ? (
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
                            checkBox.getContext(),
                          )}
                        </TableCell>

                        <TableCell className="flex flex-col gap-2">
                          <span>
                            {flexRender(
                              title.column.columnDef.cell,
                              title.getContext(),
                            )}
                          </span>

                          <div className="flex flex-col gap-1.5">
                            {cellGroup.map((cell) => (
                              <span key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </span>
                            ))}
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
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Error fetching data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </UITable>
        </div>
      </div>
    </>
  );
};

export default UploadsTable;
