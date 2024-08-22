"use client";

import { useCallback, useEffect, useRef } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { api, downloadFile } from "@/assets/data/api/ai";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { Preference, UploadsActionType } from "@/types";
import ChatAI from "./_components/ChatAI";
import ChatResponse from "./_components/ChatResponse";

type Props = {
  params: {
    id: string;
  };
};

const PDFViewer: React.FC<Props> = ({ params: { id } }) => {
  const {
    state: { showChatResponse },
    dispatch,
  } = useUploadsContext();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      import("pspdfkit").then(async (PSPDFKit) => {
        if (PSPDFKit) {
          // @ts-ignore
          PSPDFKit.unload(container);
        }
        // @ts-ignore
        const instance = await PSPDFKit.load({
          container,
          document: `${api}${downloadFile}?uuidFileName=${id}.pdf`,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });

        // @ts-ignore
        instance.addEventListener("textSelection.change", (textSelection) => {
          if (textSelection)
            textSelection.getText().then((text: any) => {
              dispatch({
                type: UploadsActionType.SET_SELECTED_TEXT,
                payload: text,
              });
            });
          else
            dispatch({
              type: UploadsActionType.SET_SELECTED_TEXT,
              payload: "",
            });
        });
      });
    }
  }, [dispatch, id]);

  const { dispatch: patchDispatch } = useFetchState<Preference>();
  const { handler } = useApiHandler<{ studyId: string }, Preference>({
    apiCall: useCallback(
      (data) => studySyncDB.patch(dbEndpoints.preferences, data),
      []
    ),
    dispatch: patchDispatch,
  });

  useEffect(() => {
    if (id) handler({ data: { studyId: id } });
  }, [handler, id]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen w-full absolute top-0 right-0"
      ></div>
      <div className="absolute bottom-0 left-0 right-0  z-10 flex justify-center">
        {showChatResponse ? <ChatResponse /> : <ChatAI />}
      </div>
    </>
  );
};

export default PDFViewer;
