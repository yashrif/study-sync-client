import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Qna, QnaRequestDb, QnaShallow } from "@/types";

export const postQna = async (data: QnaRequestDb): Promise<QnaShallow> => {
  const response = await studySyncDB.post(dbEndpoints.qnas, data);
  return response.data;
};

export const getQna = async (id: string): Promise<Qna | undefined> => {
  try {
    const response = await studySyncDB.get(`${dbEndpoints.qnas}/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getQnas = async (): Promise<QnaShallow[] | undefined> => {
  try {
    const response = await studySyncDB.get(dbEndpoints.qnas);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
