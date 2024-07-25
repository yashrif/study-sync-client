export enum ApiRequestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum FetchActionType {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_RESET = "FETCH_RESET",
}

export type FetchAction<T> =
  | { type: FetchActionType.FETCH_START }
  | { type: FetchActionType.FETCH_SUCCESS; payload: T }
  | { type: FetchActionType.FETCH_ERROR }
  | { type: FetchActionType.FETCH_RESET };
