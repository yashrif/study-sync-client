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
import {
  home,
  preview,
  PreviewAction,
  QueryParams,
} from "@/assets/data/dashboard/slides";
import { routes } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { Input } from "@/components/ui/input";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { useQueryString } from "@/hooks/useQueryString";
import { FetchActionType, SlideRequestDb, SlideResponseDb } from "@/types";

const Preview = () => {
  const { replace } = useRouter();
  const { getQueryString, getAllQueryString } = useQueryString();

  const {
    state: { uploads: uploadsState },
  } = useChatBotContext();

  const [content, uploads, topics, initName, action, id] = [
    getQueryString(QueryParams.content),
    getAllQueryString(QueryParams.uploads),
    getAllQueryString(QueryParams.topics),
    getQueryString(QueryParams.name),
    getQueryString(QueryParams.action),
    getQueryString(QueryParams.id),
  ];

  const [value, setValue] = useState<string | undefined>(content || "");
  const [name, setName] = useState<string>(initName || "");

  if (!content || (action === PreviewAction.patch && !id)) {
    replace(routes.dashboard.slides.create);
  }

  const { state, dispatch } = useFetchState<SlideResponseDb>();
  const { handler: postHandler } = useApiHandler<
    SlideRequestDb,
    SlideResponseDb
  >({
    apiCall: useCallback(
      async (data) => studySyncDB.post(dbEndpoints.slides, data),
      []
    ),
    dispatch,
  });
  const { handler: patchHandler } = useApiHandler<
    Omit<SlideRequestDb, "uploads">,
    SlideResponseDb
  >({
    apiCall: useCallback(
      async (data, pathVariable) =>
        studySyncDB.patch(`${dbEndpoints.slides}/${pathVariable}`, data),
      []
    ),
    dispatch,
  });

  const handleSave = useCallback(async () => {
    try {
      dispatch({ type: FetchActionType.FETCH_START });

      const response =
        action === PreviewAction.post
          ? await postHandler({
              data: {
                content: value || "",
                name,
                uploads: uploads.map(
                  (uploadId) =>
                    uploadsState.filter((item) => item.id === uploadId)[0]
                ),
              },
              fetchType: "lazy",
            })
          : await patchHandler({
              data: {
                content: value || "",
                name,
              },
              fetchType: "lazy",
              pathVariable: id || "",
            });

      dispatch({
        type: FetchActionType.FETCH_SUCCESS,
        payload: response || ({} as SlideResponseDb),
      });

      if (!_.isEmpty(response)) {
        setTimeout(() => {
          replace(routes.dashboard.slides.details(response.id));
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: FetchActionType.FETCH_ERROR });
    }
  }, [
    dispatch,
    action,
    postHandler,
    value,
    name,
    uploads,
    patchHandler,
    id,
    uploadsState,
    replace,
  ]);

  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[auto,1fr]">
      <PageHeading {...home.create}>
        <IconButton
          {...preview.buttons.save}
          onClick={handleSave}
          status={state.status}
          iconClassName="!text-white !stroke-white"
        />
      </PageHeading>
      <div className="h-full overflow-hidden grid grid-cols-1 grid-rows-[auto,1fr] gap-6">
        <Input
          type={preview.fields.title.type}
          id={preview.fields.title.id}
          placeholder={preview.fields.title.placeholder}
          required={preview.fields.title.required}
          dimension={"sm"}
          Icon={preview.fields.title.Icon}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="max-w-[420px] w-full rounded-sm border-primary placeholder:text-muted-foreground/70"
        />
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
    </div>
  );
};

export default Preview;
