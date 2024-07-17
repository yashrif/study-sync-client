import { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";

import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizContext } from "@/hooks/useQuizContext";

export const useFetchQuiz = async () => {
  const { id } = useParams();

  const { dispatch } = useQuizContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(
      async () => await studySyncDB.get(`${serverEndpoints.quizzes}/${id}`),
      [id]
    ),
    dispatch,
  });

  useEffect(() => {
    handler();
  }, [handler]);
};
