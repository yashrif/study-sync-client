import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { UploadSimple, Status } from "@allTypes";
import { getUpload, getUploads } from "@/utils/uploadRequest";

type GetUploadsWithStates = (
  | {
      type: "single";
      id: string;
      setUpload: Dispatch<SetStateAction<UploadSimple | undefined>>;
    }
  | {
      type: "multiple";
      setUpload: Dispatch<SetStateAction<UploadSimple[]>>;
    }
) & { setStatus: Dispatch<SetStateAction<Status>>; mode: "lazy" | "eager" };

export const getUploadsWithStates = async (props: GetUploadsWithStates) => {
  const { type, setUpload: setUpload, setStatus, mode } = props;

  try {
    setStatus(Status.PENDING);

    if (type === "single") {
      const data = await getUpload(props.id);
      data && setUpload(data);
    } else {
      const data = await getUploads();
      data && setUpload(data);
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

type UseGetUploads = {
  dependencies?: (string | number | boolean)[];
  mode?: "lazy" | "eager";
};

export const useGetUploads = ({
  dependencies = [],
  mode = "eager",
}: UseGetUploads) => {
  const [uploads, setUploads] = useState<UploadSimple[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getUploadsWithStates({
      type: "multiple",
      setUpload: setUploads,
      setStatus,
      mode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getUploads = () => {
    return { data: uploads, status, setUploads, setStatus };
  };

  return { getUploads };
};

type UseGetUpload = UseGetUploads & {
  id: string;
};

export const useGetUpload = ({
  id,
  dependencies = [],
  mode = "eager",
}: UseGetUpload) => {
  const [upload, setUpload] = useState<UploadSimple | undefined>();
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    getUploadsWithStates({
      type: "single",
      setUpload,
      setStatus,
      mode,
      id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getUpload = () => {
    return { data: upload, status, setUpload, setStatus };
  };

  return { getUpload };
};
