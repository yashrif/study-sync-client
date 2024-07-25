import { Dispatch, SetStateAction } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Status, UploadShallow } from "@/types";

export const getUpload = async (
  id: string,
): Promise<UploadShallow | undefined> => {
  try {
    const response = await studySyncDB.get(`${dbEndpoints.uploads}/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUploads = async (): Promise<UploadShallow[]> => {
  const response = await studySyncDB.get(dbEndpoints.uploads);
  return response.data;
};
