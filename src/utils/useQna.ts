import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { QnaRequest } from "@/types";

export const postQna = async (data: QnaRequest) => {
  const response = await studySyncDB.post(dbEndpoints.qnas, data);
  return response.data;
};
