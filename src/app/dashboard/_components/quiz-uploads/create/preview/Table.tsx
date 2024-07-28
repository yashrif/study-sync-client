"use client";

import { IconCircleLetterAFilled, IconHelp } from "@tabler/icons-react";
import {
  CellContext,
  flexRender,
  Renderable,
  Table as TTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import IconButton from "@/components/button/IconButton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { CqRequest, McqRequest, QuizUploadsActionType } from "@/types";
import _ from "lodash";
import { cqColumns } from "./cq/Columns";
import Title from "./Title";

type Props = {
  tableCqs: TTable<CqRequest>;
  tableMcqs: TTable<McqRequest>;
};

const PreviewTable: React.FC<Props> = ({ tableCqs, tableMcqs }) => {
  const {
    state: { quiz },
    dispatch,
  } = useQuizUploadsContext();

  const [title, setTitle] = useState(quiz?.title);

  const onDelete = () => {
    if (quiz) {
      const [selectedCqs, selectedMcqs] = [
        tableCqs.getFilteredSelectedRowModel().rows.map((row) => row.original),
        tableMcqs.getFilteredSelectedRowModel().rows.map((row) => row.original),
      ];

      dispatch({
        type: QuizUploadsActionType.SET_QUIZ,
        payload: {
          ...quiz,
          cqs: _.differenceWith(
            _.map(tableCqs.getRowModel().rows, (row) => row.original),
            selectedCqs,
            _.isEqual,
          ),
          mcqs: _.differenceWith(
            _.map(tableMcqs.getRowModel().rows, (row) => row.original),
            selectedMcqs,
            _.isEqual,
          ),
        },
      });
      tableCqs.resetRowSelection();
      tableMcqs.resetRowSelection();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Title title={title} setTitle={setTitle} />
        <IconButton
          title={controlBar.delete.title}
          Icon={controlBar.delete.Icon}
          variant={controlBar.delete.variant}
          size={controlBar.delete.size}
          className={
            tableCqs.getFilteredSelectedRowModel().rows.length > 0 ||
            tableMcqs.getFilteredSelectedRowModel().rows.length > 0
              ? "visible"
              : "invisible"
          }
          iconClassName="stroke-[2.5]"
          onClick={onDelete}
        />
      </div>
      <div className="flex flex-col rounded-md overflow-hidden">
        <UITable>
          <TableHeader className="bg-accent-300 !hover:bg-accent-300 [&_tr]:border-none">
            {tableCqs.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {tableMcqs.getRowModel().rows?.length ? (
                  <TableHead>
                    <div className="flex gap-2 items-center">
                      {flexRender(
                        tableMcqs.getHeaderGroups()[0].headers[0].column
                          .columnDef.header,
                        tableMcqs.getHeaderGroups()[0].headers[0].getContext(),
                      )}
                      <span>MCQs</span>
                    </div>
                  </TableHead>
                ) : null}
                {tableCqs.getRowModel().rows?.length ? (
                  <TableHead>
                    <div className="flex gap-2 items-center">
                      {flexRender(
                        tableCqs.getHeaderGroups()[0].headers[0].column
                          .columnDef.header,
                        tableCqs.getHeaderGroups()[0].headers[0].getContext(),
                      )}
                      <span>CQs</span>
                    </div>
                  </TableHead>
                ) : null}
                {headerGroup.headers.slice(1).map((header) => {
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
          {[
            { ...tableMcqs, heading: "MCQs", type: "mcq" },
            { ...tableCqs, heading: "CQs", type: "cq" },
          ].map((table, index) =>
            table.getRowModel().rows?.length ? (
              <>
                <h5 className="text-center text-primary font-semibold pt-4 pb-2 underline underline-offset-2">
                  {table.heading}
                </h5>

                <UITable key={index}>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
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
                            <TableCell className="align-top pt-5">
                              {flexRender(
                                checkBox.column.columnDef.cell as Renderable<
                                  | CellContext<CqRequest, unknown>
                                  | CellContext<McqRequest, unknown>
                                >,
                                checkBox.getContext(),
                              )}
                            </TableCell>

                            <TableCell className="flex flex-col gap-3 !pl-10">
                              <div>
                                <IconHelp className="float-left mr-2 size-[18px] mt-0.5 stroke-blue-500" />
                                <span className="text-medium">
                                  {flexRender(
                                    title.column.columnDef.cell as Renderable<
                                      | CellContext<CqRequest, unknown>
                                      | CellContext<McqRequest, unknown>
                                    >,
                                    title.getContext(),
                                  )}
                                </span>
                              </div>

                              <div>
                                {table.type === "cq" && (
                                  <IconCircleLetterAFilled className="float-left mr-2 size-[18px] mt-[1px] fill-success" />
                                )}
                                {cellGroup.map((cell) => (
                                  <div key={cell.id} className="text-small">
                                    {flexRender(
                                      cell.column.columnDef.cell as Renderable<
                                        | CellContext<McqRequest, unknown>
                                        | CellContext<CqRequest, unknown>
                                      >,
                                      cell.getContext(),
                                    )}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={cqColumns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </UITable>
              </>
            ) : null,
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewTable;
