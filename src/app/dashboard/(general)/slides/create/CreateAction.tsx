"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useCallback } from "react";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import {
  FetchActionType,
  SlideRequestServer,
  SlideResponseServer,
  Status,
} from "@/types";

const CreateAction = () => {
  const {
    state: { status, data },
  } = useCreateSlideContext();

  const { state, dispatch } = useFetchState<SlideResponseServer>();
  const { handler } = useApiHandler<SlideRequestServer, SlideResponseServer>({
    apiCall: useCallback(
      async (data) => studySyncServer.post(serverEndpoints.slides, data),
      []
    ),
    dispatch,
  });

  const onClickHandler = useCallback(async () => {
    try {
      dispatch({
        type: FetchActionType.FETCH_START,
      });

      const response = await handler({
        data: {
          topicList: data?.topics,
          fileId: data?.uploads,
        },
        fetchType: "lazy",
        isReset: true,
      });

      if (response) {
        dispatch({
          type: FetchActionType.FETCH_SUCCESS,
          payload: response,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: FetchActionType.FETCH_ERROR,
      });
    }
  }, [data?.topics, data?.uploads, dispatch, handler]);

  return (
    <IconButton
      size="lg"
      className="size-12 p-0 rounded-full"
      Icon={IconArrowRight}
      iconClassName="!size-6 stroke-text-300 text-text-300"
      contentType="icon-only"
      disabled={
        state.status === Status.PENDING ||
        status === Status.PENDING ||
        data?.topics?.length <= 0
      }
      status={status === Status.PENDING ? Status.PENDING : state.status}
      onClick={onClickHandler}
    />
  );
};

export default CreateAction;
