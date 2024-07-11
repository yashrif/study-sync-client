import { useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Status, UploadSimple } from "@allTypes";

export const useGetUploads = (
  dependencies: (string | number | boolean)[] = []
) => {
  console.log("useGetUploads", dependencies);
  const [uploads, setUploads] = useState<UploadSimple[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    try {
      if (dependencies.at(-1) === true)
        studySyncDB.get(dbEndpoints.uploads).then(({ data }) => {
          setUploads(data);
          setStatus(Status.SUCCESS);
        });
    } catch (e) {
      setStatus(Status.ERROR);
    } finally {
      setStatus(Status.IDLE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStatus, setUploads, ...dependencies]);

  const getUploads = () => {
    return { data: uploads, status };
  };

  return { getUploads };
};
