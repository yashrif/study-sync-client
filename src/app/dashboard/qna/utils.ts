import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { IndexStatus, UploadSimple } from "@/types";
import { Status } from "@allTypes";
import _ from "lodash";

type Props = Omit<IndexStatus, "indexStatus"> & {
  data: UploadSimple;
};

export const fileIndexing = async ({ setIndexStatus, data }: Props) => {
  try {
    setIndexStatus((prevState) => ({
      ...prevState,
      [data.id]: Status.PENDING,
    }));
    await studySyncServer.post(serverEndpoints.index, data);

    // await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
    //   isIndexed: true,
    // });

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
  finally {
    setTimeout(() => {
      setIndexStatus((prevState) => ({ ..._.omit(prevState, data.id) }));
    }, 2500);
  }
};
