import { useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Status, UploadSimple } from "@allTypes";

export const useGetUploads = (
  dependencies: (string | number | boolean)[] = [],
  mode: "lazy" | "eager" = "eager"
) => {
  const [uploads, setUploads] = useState<UploadSimple[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    const getUploads = async () => {
      try {
        const { data } = await studySyncDB.get(dbEndpoints.uploads);
        setUploads(data);
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

    getUploads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const getUploads = () => {
    return { data: uploads, status, setUploads, setStatus };
  };

  return { getUploads };
};
