import { Status } from "@allTypes";
import _ from "lodash";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { IndexStates, UploadSimple } from "@/types";

type Props = Omit<IndexStates, "indexStatus"> & {
  data: UploadSimple;
};

export const fileIndexing = async ({
  setIndexStatus,
  data,
  setUploads,
}: Props) => {
  try {
    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.PENDING,
    }));
    await studySyncServer.post(serverEndpoints.index, data.name);

    await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
      isIndexed: true,
    });

    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.SUCCESS,
    }));

    setTimeout(() => {
      setUploads((prevState) => {
        const newUploads = _.cloneDeep(prevState);
        const index = newUploads.findIndex((upload) => upload.id === data.id);
        newUploads[index].isIndexed = true;
        return newUploads;
      });
    }, 2000);
  } catch (error) {
    console.error(error);
    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.ERROR,
    }));
  }
};
