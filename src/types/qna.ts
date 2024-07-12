import { MCQRequest } from "@allTypes";

export type QnaRequest = {
  title?: string;
  mcqs: MCQRequest[];
};
