import { useCallback, useEffect } from "react";

import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "./useQuizUploadsContext";

export const useFetchUploads = async () => {
  const { dispatch } = useQuizUploadsContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(serverEndpoints.uploads), []),
    dispatch,
  });

  useEffect(() => {
    handler();
  }, [dispatch, handler]);
};
