"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import SectionHeading from "@/app/dashboard/_components/SectionHeading";
import { dbEndpoints } from "@/assets/data/api";
import { create, queryKeys } from "@/assets/data/dashboard/planner";
import { links } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import { useQueryString } from "@/hooks/useQueryString";
import { PlannerRequestDBPost, PlannerResponseDBPost } from "@/types";
import Title from "./Title";
import Topics from "./Topics";

const PlannerReview = () => {
  const { replace } = useRouter();
  const { getAllQueryString } = useQueryString();
  const [title, setTitle] = useState("");

  const selectedUploads = useMemo(() => {
    return getAllQueryString(queryKeys.uploads.key);
  }, [getAllQueryString]);

  const {
    state: { topics, uploads },
  } = usePlannerContext();
  const { state, dispatch } = useFetchState<PlannerResponseDBPost>();

  const { handler } = useApiHandler<
    PlannerRequestDBPost,
    PlannerResponseDBPost
  >({
    apiCall: useCallback(
      (data) => studySyncDB.post(dbEndpoints.planner, data),

      []
    ),
    dispatch,
  });

  if (!topics || !selectedUploads.length) {
    replace(create.steps[2].path);
    return null;
  }

  const onSubmit = async () => {
    try {
      const response = await handler({
        data: {
          title: title,
          topics: topics,
          uploads: uploads.filter((upload) =>
            selectedUploads.includes(upload.id)
          ),
        },
      });
      if (response)
        replace(links.dashboard.planner.plannerDetails(response.id).href);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <SectionHeading {...create.steps[3]} />
      <div className="flex flex-col gap-8 divide-y">
        <Title title={title} setTitle={setTitle} />
        <Topics />
      </div>
      <IconButton
        size="lg"
        className="size-12 p-0 rounded-full self-center"
        Icon={IconArrowRight}
        iconClassName="!size-6 stroke-text-300 text-text-300"
        contentType="icon-only"
        disabled={!title}
        status={state.status}
        onClick={onSubmit}
      />
    </div>
  );
};

export default PlannerReview;
