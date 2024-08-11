import { AxiosResponse } from "axios";
import { Dispatch } from "react";

import { FetchAction } from "@allTypes";

export enum RequestType {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export type ApiCall<T> = (
  data: T | null,
  pathVariable?: string | null
) => Promise<AxiosResponse<any, any>>;

export type ApiHandler<T, R> = {
  apiCall: ApiCall<T>;
  dispatch: Dispatch<FetchAction<R>>;
};

export type Handler<T> = {
  data?: T | null;
  pathVariable?: string;
  isUpdateStatus?: boolean;
  fetchType?: "lazy" | "eager";
  isReset?: boolean;
};
