import { useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Status, UploadSimple } from "@allTypes";

export const useUploads = (
  dependencies: (string | number | boolean)[] = []
) => {
  const [uploads, setUploads] = useState<UploadSimple[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    try {
      studySyncDB.get(dbEndpoints.uploads).then(({ data }) => {
        setUploads(data);
        setStatus(Status.SUCCESS);
      });
    } catch (e) {
      setUploads([]);
      setStatus(Status.ERROR);
    } finally {
      setStatus(Status.IDLE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStatus, setUploads, ...dependencies]);

  const getUploads = () => {
    return { uploads, status };
  };

  return { getUploads };
};
