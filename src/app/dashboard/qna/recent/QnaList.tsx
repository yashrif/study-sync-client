"use client";

import { IconNotes } from "@tabler/icons-react";
import Link from "next/link";

import { recent } from "@/assets/data/dashboard/qna";
import { links } from "@/assets/data/routes";
import Dropdown from "@/components/Dropdown";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { useGetQnas } from "@/hooks/useQna";
import { Status } from "@/types";
import { dateTimeFormatter } from "@/utils/dateFormatter";

const QnaList = () => {
  const { data, status } = useGetQnas({ mode: "lazy" }).getQnas();

  return (
    <div className="max-h-400px overflow-scroll">
      {status === Status.PENDING ? (
        <SpinnerContainer className="size-10" height={250} />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.slice(0, 10).map((qna) => (
            <div
              key={qna.id}
              className="flex justify-between gap-16 items-center"
            >
              <Link
                href={links.dashboard.qnaDetails(qna.id).href}
                className="anchor text-text-400 flex gap-2 items-center"
              >
                <IconNotes className="size-4 text-text-200 stroke-2" />
                <span className="max-w-[45ch] text-ellipsis overflow-hidden">
                  {qna.title}
                </span>
              </Link>
              <div className="flex items-center gap-8">
                <span className="text-small text-text-200">
                  {dateTimeFormatter(qna.createDate)}
                </span>
                <Dropdown actions={recent.actions} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QnaList;
