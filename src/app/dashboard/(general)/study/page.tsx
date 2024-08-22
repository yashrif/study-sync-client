"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { home } from "@/assets/data/dashboard/study";
import { routes } from "@/assets/data/routes";
import Spinner from "@/components/spinner/Spinner";
import { useFetchData, useFetchDataState } from "@/hooks/fetchData";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { Preference, UploadShallow } from "@/types";
import PageHeading from "../../_components/PageHeading";

const Study: React.FC = () => {
  const { replace } = useRouter();

  const { state: uploads, dispatch } = useUploadsContext();

  const { state } = useFetchDataState<null, Preference>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.preferences), []),
  });

  useFetchData<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  useEffect(() => {
    if (state.data?.studyId && uploads.uploads.length) {
      setTimeout(() => {
        if (
          state.data?.studyId &&
          _.chain(uploads.uploads)
            .map("id")
            .includes(state.data?.studyId || "")
            .value()
        )
          replace(routes.dashboard.study.details(state.data?.studyId));
        else replace(routes.dashboard.uploads.home);
      }, 1000);
    }
  }, [replace, state.data?.studyId, uploads.uploads]);

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="w-full h-full flex gap-4 items-center justify-center">
        <Spinner className="w-9 h-9 stroke-[2.5px]" />
        <h2 className="text-primary">Fetching Data</h2>
      </div>
    </div>
  );
};

export default Study;
