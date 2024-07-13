import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getQna, getQnas } from "@/utils/qnaRequest";
import { Qna, QnaShallow, Status } from "@allTypes";

type GetQnasWithStates = (
  | {
      type: "single";
      id: string;
      setQna: Dispatch<SetStateAction<Qna | undefined>>;
    }
  | {
      type: "multiple";
      setQna: Dispatch<SetStateAction<QnaShallow[]>>;
    }
) & { setStatus: Dispatch<SetStateAction<Status>>; mode: "lazy" | "eager" };

export const getQnasWithStates = async (props: GetQnasWithStates) => {
  const { type, setQna, setStatus, mode } = props;

  try {
    setStatus(Status.PENDING);

    if (type === "single") {
      const data = await getQna(props.id);
      data && setQna(data);
    } else {
      const data = await getQnas();
      data && setQna(data);
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

type UseGetQnas = {
  dependencies?: (string | number | boolean)[];
  mode?: "lazy" | "eager";
};

export const useGetQnas = ({
  dependencies = [],
  mode = "eager",
}: UseGetQnas) => {
  const [qnas, setQnas] = useState<QnaShallow[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getQnasWithStates({
      type: "multiple",
      setQna: setQnas,
      setStatus,
      mode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getQnas = () => {
    return { data: qnas, status, setQnas, setStatus };
  };

  return { getQnas };
};

type UseGetQna = UseGetQnas & {
  id: string;
};

export const useGetQna = ({
  id,
  dependencies = [],
  mode = "eager",
}: UseGetQna) => {
  const [qna, setQna] = useState<Qna | undefined>();
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getQnasWithStates({
      type: "single",
      setQna,
      setStatus,
      mode,
      id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getQna = () => {
    return { data: qna, status, setQna, setStatus };
  };

  return { getQna };
};
