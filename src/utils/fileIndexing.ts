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
      [data.id]: {
        status: Status.PENDING,
        animation: true,
      },
    }));
    await studySyncServer.post(serverEndpoints.index, data);

    await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
      isIndexed: true,
    });

    setUploads((prevState) => {
      const newUploads = _.cloneDeep(prevState);
      const index = newUploads.findIndex((upload) => upload.id === data.id);
      newUploads[index].isIndexed = true;
      return newUploads;
    });

    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: {
        ...prevState[data.id],
        status: Status.SUCCESS,
      },
    }));
  } catch (error) {
    console.error(error);
    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: {
        ...prevState[data.id],
        status: Status.ERROR,
      },
    }));
  } finally {
    setTimeout(() => {
      setIndexStatus((prevState) => ({
        ...prevState,
        [data.id]: {
          ...prevState[data.id],
          animation: false,
        },
      }));
    }, 2500);
  }
};
