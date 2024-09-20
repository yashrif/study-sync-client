"use client";

import { IconRefresh, IconXboxX } from "@tabler/icons-react";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { api, downloadFile } from "@/assets/data/api/ai";
import { indexDialog } from "@/assets/data/dashboard/study";
import IconButton from "@/components/button/IconButton";
import { CheckmarkAnimated } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchDataState, useFetchState } from "@/hooks/fetchData";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { FetchActionType, Preference, Status, Upload } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";

type Props = {
  params: {
    id: string;
  };
};

const PDFViewer: React.FC<Props> = ({ params: { id } }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { dispatch } = useUploadsContext();
  const {
    state: { setPrompt },
  } = useChatBotContext();

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

        instance.addEventListener(
          "textSelection.change",
          (textSelection: any) => {
            if (textSelection)
              textSelection.getText().then((text: string) => {
                setPrompt((prev) => (prev.endsWith(text) ? prev : prev + text));
              });
          }
        );
      });
    }
  }, [dispatch, id, setPrompt]);

  useFetchDataState<null, Preference>({
    apiCall: useCallback(
      () => studySyncDB.patch(dbEndpoints.preferences, { studyId: id }),
      [id]
    ),
  });

  const {
    state: { data: upload, status },
  } = useFetchDataState<null, Upload>({
    apiCall: useCallback(
      () => studySyncDB.get(`${dbEndpoints.uploads}/${id}`),
      [id]
    ),
  });

  const { state, dispatch: indexDispatch } = useFetchState(Status.IDLE);

  useEffect(() => {
    if (!_.isEmpty(upload)) {
      if (!upload.isIndexed) setShowDialog(true);
    }
  }, [upload]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen w-full absolute top-0 right-0"
      />

      {showDialog && (
        <>
          <Dialog defaultOpen>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{indexDialog.title}</DialogTitle>
                <DialogDescription>{indexDialog.description}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "id", value: upload?.id },
                    { label: "name", value: upload?.name },
                    {
                      label: "Create Date",
                      value: dateFormatter(upload?.createDate || ""),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center text-sm"
                    >
                      <span className="font-semibold capitalize">
                        {item.label}:{" "}
                      </span>
                      <span className="line-clamp-1">{item.value}</span>
                    </div>
                  ))}
                </div>
                <IconButton
                  size={"sm"}
                  status={state.status}
                  isAlwaysIcons
                  iconClassName="size-4"
                  className="mr-auto"
                  contents={{
                    [Status.IDLE]: {
                      type: "icon-content",
                      Icon: IconRefresh,
                      content: indexDialog.button,
                    },
                    [Status.SUCCESS]: {
                      type: "icon-only",
                      Icon: CheckmarkAnimated,
                    },
                    [Status.ERROR]: {
                      type: "icon-only",
                      Icon: IconXboxX,
                    },
                  }}
                  onClick={async () => {
                    try {
                      indexDispatch({
                        type: FetchActionType.FETCH_START,
                      });
                      await studySyncServer.post(
                        serverEndpoints.index,
                        upload?.name
                      );
                      await studySyncDB.patch(
                        `${dbEndpoints.uploads}/${upload?.id}`,
                        {
                          isIndexed: true,
                        }
                      );
                      indexDispatch({
                        type: FetchActionType.FETCH_SUCCESS,
                        payload: { ...upload, isIndexed: true },
                      });
                      setTimeout(() => {
                        setShowDialog(false);
                      }, 2500);
                    } catch (err) {
                      console.log(err);
                      indexDispatch({
                        type: FetchActionType.FETCH_ERROR,
                      });
                    }
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default PDFViewer;
