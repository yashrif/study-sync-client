"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import { PreviewAction, QueryParams } from "@/assets/data/dashboard/slides";
import { routes } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
  CreateSlideActionType,
  FetchActionType,
  SlideRequestServer,
  SlideResponseServer,
  Status,
  UploadShallow,
} from "@/types";

type Props = {
  table: Table<UploadShallow>;
};

const CreateAction: React.FC<Props> = ({ table }) => {
  const { setMultipleParams } = useQueryParams();

  const {
    state: { data, status, indexStatus },
    dispatch: contextDispatch,
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
          fileId: table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original.id),
        },
        fetchType: "lazy",
      });

      dispatch({
        type: FetchActionType.FETCH_SUCCESS,
        payload: response || "",
      });

      if (response) {
        contextDispatch({
          type: CreateSlideActionType.SET_CONTENT,
          payload: response,
        });

        setMultipleParams(
          [
            {
              name: QueryParams.content,
              value: [response],
            },
            {
              name: QueryParams.uploads,
              value: data?.uploads,
            },
            {
              name: QueryParams.topics,
              value: data?.topics,
            },
            {
              name: QueryParams.name,
              value: [data?.topics ? data?.topics[0] : ""],
            },
            {
              name: QueryParams.action,
              value: [PreviewAction.post],
            },
          ],
          routes.dashboard.slides.preview
        );
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: FetchActionType.FETCH_ERROR,
      });
    }
  }, [
    contextDispatch,
    data?.topics,
    data?.uploads,
    dispatch,
    handler,
    setMultipleParams,
    table,
  ]);

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
        data?.topics?.length <= 0 ||
        Object.values(indexStatus).includes(Status.PENDING)
      }
      status={
        Object.values(indexStatus).includes(Status.PENDING) ||
        status === Status.PENDING
          ? Status.PENDING
          : state.status
      }
      onClick={onClickHandler}
    />
  );
};

export default CreateAction;
