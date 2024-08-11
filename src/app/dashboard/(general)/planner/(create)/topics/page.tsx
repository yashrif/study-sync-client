"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import studySyncServer from "@/api/studySyncServer";
import SectionHeading from "@/app/dashboard/_components/SectionHeading";
import { serverEndpoints } from "@/assets/data/api";
import { create, queryKeys } from "@/assets/data/dashboard/planner";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQueryString } from "@/hooks/useQueryString";
import { Status, TopicsResponseServer } from "@allTypes";
import TopicsForm from "./TopicsForm";

const Topics = () => {
  const { replace } = useRouter();
  const { getAllQueryString } = useQueryString();

  const selectedUploads = useMemo(() => {
    return getAllQueryString(queryKeys.uploads.key);
  }, [getAllQueryString]);

  const {
    state: { data, status },
    dispatch,
  } = useFetchState<TopicsResponseServer>();

  const { handler } = useApiHandler<string[], TopicsResponseServer>({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.topics, data),
      []
    ),
    dispatch,
  });

  if (!selectedUploads.length) {
    replace(create.steps[1].path);
  }

  useEffect(() => {
    if (selectedUploads.length) {
      handler({ data: selectedUploads });
    }
  }, [handler, selectedUploads]);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading {...create.steps[2]} />
      {status === Status.PENDING ? (
        <SpinnerContainer
          spinnerClassName="!size-10"
          containerClassName="min-h-80"
        />
      ) : (
        data && status === Status.SUCCESS && <TopicsForm data={data} />
      )}
    </div>
  );
};

export default Topics;
