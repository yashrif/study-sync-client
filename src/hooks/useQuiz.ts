import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getQuiz, getQuizzes } from "@/utils/quizRequest";
import { Quiz, QuizShallow, Status } from "@allTypes";

type GetQuizzesWithStates = (
  | {
      type: "single";
      id: string;
      setQuizzes: Dispatch<SetStateAction<Quiz | undefined>>;
    }
  | {
      type: "multiple";
      setQuizzes: Dispatch<SetStateAction<QuizShallow[]>>;
    }
) & { setStatus: Dispatch<SetStateAction<Status>>; mode: "lazy" | "eager" };

export const getQuizzesWithStates = async (props: GetQuizzesWithStates) => {
  const { type, setQuizzes: setQuiz, setStatus, mode } = props;

  try {
    setStatus(Status.PENDING);

    if (type === "single") {
      const data = await getQuiz(props.id);
      data && setQuiz(data);
    } else {
      const data = await getQuizzes();
      data && setQuiz(data);
    }
    if (mode === "lazy")
      setTimeout(() => {
        setStatus(Status.SUCCESS);
      }, 1);
    else setStatus(Status.SUCCESS);
  } catch (e) {
    setStatus(Status.ERROR);
  } finally {
    setStatus(Status.IDLE);
  }
};

type UseGetQuizzes = {
  dependencies?: (string | number | boolean)[];
  mode?: "lazy" | "eager";
};

export const useGetQuizzes = ({
  dependencies = [],
  mode = "eager",
}: UseGetQuizzes) => {
  const [quizzes, setQuizzes] = useState<QuizShallow[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getQuizzesWithStates({
      type: "multiple",
      setQuizzes: setQuizzes,
      setStatus,
      mode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getQuizzes = () => {
    return { data: quizzes, status, setQuizzes, setStatus };
  };

  return { getQuizzes };
};

type UseGetQuiz = UseGetQuizzes & {
  id: string;
};

export const useGetQuiz = ({
  id,
  dependencies = [],
  mode = "eager",
}: UseGetQuiz) => {
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getQuizzesWithStates({
      type: "single",
      setQuizzes: setQuiz,
      setStatus,
      mode,
      id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getQuiz = () => {
    return { data: quiz, status, setQuiz, setStatus };
  };

  return { getQuiz };
};
