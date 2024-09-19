"use client";

import MDEditor from "@uiw/react-md-editor";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home, preview, QueryParams } from "@/assets/data/dashboard/slides";
import { routes } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { useQueryString } from "@/hooks/useQueryString";
import { FetchActionType, SlideRequestDb, SlideResponseDb } from "@/types";

const Preview = () => {
  const { replace } = useRouter();
  const { getAllQueryString } = useQueryString();

  const {
    state: { uploads: uploadsState },
  } = useChatBotContext();

  const [content, uploads, topics] = [
    getAllQueryString(QueryParams.content),
    getAllQueryString(QueryParams.uploads),
    getAllQueryString(QueryParams.topics),
  ];

  const [value, setValue] = useState<string | undefined>(
    typeof content === "string" ? content : content[0]
  );

  if (!content) {
    replace(routes.dashboard.slides.create);
  }

  console.log(uploadsState, uploads);

  const { state, dispatch } = useFetchState<SlideResponseDb>();
  const { handler } = useApiHandler<SlideRequestDb, SlideResponseDb>({
    apiCall: useCallback(
      async (data) => studySyncDB.post(dbEndpoints.slides, data),
      []
    ),
    dispatch,
  });

  const handleSave = useCallback(async () => {
    try {
      dispatch({ type: FetchActionType.FETCH_START });

      const response = await handler({
        data: {
          content: value || "",
          uploads: uploads.map(
            (uploadId) => uploadsState.filter((item) => item.id === uploadId)[0]
          ),
        },
      });

      dispatch({
        type: FetchActionType.FETCH_SUCCESS,
        payload: response || ({} as SlideResponseDb),
      });

      if (!_.isEmpty(response)) {
        replace(routes.dashboard.slides.details(response.id));
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: FetchActionType.FETCH_ERROR });
    }
  }, [dispatch, handler, replace, uploads, uploadsState, value]);

  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[auto,1fr]">
      <PageHeading {...home.create}>
        <IconButton {...preview.buttons.save} onClick={handleSave} />
      </PageHeading>
      <div
        className="container h-full overflow-hidden px-0.5 pb-10"
        data-color-mode="light"
      >
        <MDEditor
          value={value}
          onChange={setValue}
          className="!rounded-md border *:!text-lg !shadow-none !bg-background *:!bg-background !h-full p-5"
          previewOptions={{
            className: "markdown-lg !text-foreground !bg-transparent",
          }}
        />
      </div>
    </div>
  );
};

export default Preview;
