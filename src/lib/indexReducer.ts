import {
  IndexAction,
  IndexActionType,
  IndexState,
  IndexStatus,
  Status,
  UploadShallow,
} from "@/types";

export const generateIndexStatus = (uploads: UploadShallow[]) => {
  const newUploads: IndexStatus = {};

  uploads.forEach((upload) => {
    newUploads[upload.id] = upload.isIndexed ? Status.SUCCESS : Status.IDLE;
  });

  return newUploads;
};

export const indexReducer = (
  state: IndexState,
  action: IndexAction
): IndexState => {
  switch (action.type) {
    case IndexActionType.RESET_INDEX_STATUS:
      return {
        ...state,
        indexStatus:
          state.uploads.length > 0 ? generateIndexStatus(state.uploads) : {},
      };
    case IndexActionType.INDEX_STATUS_START:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.PENDING,
        },
      };
    case IndexActionType.INDEX_STATUS_SUCCESS:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.SUCCESS,
        },
      };
    case IndexActionType.INDEX_STATUS_ERROR:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.ERROR,
        },
      };
    case IndexActionType.SET_UPLOAD_INDEX_TRUE:
      return {
        ...state,
        uploads: state.uploads.map((upload) =>
          upload.id === action.payload ? { ...upload, isIndexed: true } : upload
        ),
      };
    case IndexActionType.SET_UPLOAD_INDEX_TRUE:
      return {
        ...state,
        uploads: state.uploads.map((upload) =>
          upload.id === action.payload ? { ...upload, isIndexed: true } : upload
        ),
      };
    default:
      return state;
  }
};
