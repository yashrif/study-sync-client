import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { IndexStatus, UploadSimple } from "@/types";
import { Status } from "@allTypes";
import _ from "lodash";

type Props = Omit<IndexStatus, "indexStatus"> & {
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
    await studySyncServer.post(serverEndpoints.index, data);

    // await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
    //   isIndexed: true,
    // });

    setUploads((prevState) => {
      const newUploads = _.cloneDeep(prevState);
      const index = newUploads.findIndex((upload) => upload.id === data.id);
      newUploads[index].isIndexed = true;
      return newUploads;
    });

    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.SUCCESS,
    }));
  } catch (error) {
    console.error(error);
    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.ERROR,
    }));
  }
};
