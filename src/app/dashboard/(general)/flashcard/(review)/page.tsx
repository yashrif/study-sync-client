"use client";

import {
  IconBolt,
  IconCircleLetterAFilled,
  IconLetterA,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { review } from "@/assets/data/dashboard/flashcard";
import { routes } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchDataState } from "@/hooks/fetchData";
import { FetchActionType, Flashcard, FlashcardStatus, Status } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";

const FlashCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const { replace } = useRouter();
  const {
    state: { data: flashcards, status },
    dispatch,
  } = useFetchDataState<null, Flashcard[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.flashcards), []),
  });

  const filteredFlashcards = useMemo(() => {
    return isPreview
      ? flashcards
        ? [...flashcards]
        : []
      : flashcards?.filter(
          (item) => item.status !== FlashcardStatus.REMEMBERED
        ) || [];
  }, [flashcards, isPreview]);

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        replace(routes.dashboard.flashcard.create);
      }}
    >
      <DialogContent className="max-w-[700px] h-[450px] bg-background">
        <DialogTitle className="hidden">{review.title}</DialogTitle>
        <DialogDescription className="hidden">{review.title}</DialogDescription>
        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-16 items-center justify-between mt-6">
            <div className="">
              <IconBolt className="size-5 fill-yellow-500 stroke-none mt-0.5" />
            </div>
            <div className="flex gap-2 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconLetterA
                      className={`size-[18px] ${isPreview ? "text-primary" : "text-text-200/80"} stroke-2 cursor-pointer hover:scale-110 transition-all duration-300`}
                      onClick={() => {
                        setIndex(0);
                        setIsPreview(!isPreview);
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Toggle preview mode</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-small font-medium text-primary text-pretty">
                <span>
                  {filteredFlashcards
                    ? isPreview
                      ? index + 1
                      : filteredFlashcards?.length - index
                    : 0}
                </span>
                <span>/</span>
                <span>{filteredFlashcards?.length}</span>
              </p>
            </div>
          </div>
          {status === Status.PENDING ? (
            <SpinnerContainer />
          ) : (
            <div className="h-full flex flex-col justify-between items-center gap-8">
              {filteredFlashcards.length > 0 ? (
                <>
                  <motion.div
                    className="max-h-[280px] h-auto w-full flex flex-col gap-4 border border-primary/80 p-4 pt-6 rounded-md overflow-x-scroll overflow-y-hidden"
                    layout
                  >
                    <motion.div layout="position">
                      <IconBolt className="float-left mr-2 size-6 fill-yellow-500 stroke-none mt-0.5" />
                      <h5>{filteredFlashcards?.[index].question}</h5>
                    </motion.div>
                    {isOpen && (
                      <div>
                        <IconCircleLetterAFilled className="float-left mr-2 size-5 text-success mt-0.5" />
                        <p className="text-medium">
                          {filteredFlashcards?.[index].answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                  <>
                    {isPreview ? (
                      <div className="w-full flex gap-16 justify-between items-center">
                        {[
                          {
                            ...(isOpen
                              ? review.buttons.hide
                              : review.buttons.show),
                            onClick: () => {
                              setIsOpen(!isOpen);
                            },
                          },
                          {
                            ...review.buttons.next,
                            onClick: () => {
                              setIsOpen(false);
                              setIndex(
                                index + 1 >= filteredFlashcards.length
                                  ? 0
                                  : index + 1
                              );
                            },
                          },
                          {
                            ...review.buttons.reset,
                            onClick: async () => {
                              try {
                                await studySyncDB.patch(
                                  `${dbEndpoints.cqs}/${filteredFlashcards?.[index].id}`,
                                  {
                                    status: FlashcardStatus.FORGOTTEN,
                                  }
                                );
                                filteredFlashcards?.splice(index, 1, {
                                  ...filteredFlashcards?.[index],
                                  status: FlashcardStatus.FORGOTTEN,
                                });
                                dispatch({
                                  type: FetchActionType.FETCH_RESET,
                                  payload: filteredFlashcards,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            },
                          },
                        ].map((button) => (
                          <IconButton
                            key={button.title}
                            title={button.title}
                            Icon={button.Icon}
                            size={"sm"}
                            onClick={button.onClick}
                            className={`min-w-24 ${button.className}`}
                          />
                        ))}
                      </div>
                    ) : isOpen ? (
                      <div className="w-full flex gap-16 justify-between items-center">
                        {[
                          review.buttons.forgotten,
                          review.buttons.delayed,
                          review.buttons.remembered,
                        ].map((button) => (
                          <IconButton
                            key={button.title}
                            title={button.title}
                            Icon={button.Icon}
                            size={"sm"}
                            onClick={async () => {
                              const currentStatus = flashcardStatus(
                                filteredFlashcards?.[index].status,
                                button.status
                              );

                              await studySyncDB.patch(
                                `${dbEndpoints.cqs}/${filteredFlashcards?.[index].id}`,
                                {
                                  status: currentStatus,
                                }
                              );
                              setIsOpen(false);
                              const theFlashcard = {
                                ...filteredFlashcards?.[index],
                                status: currentStatus,
                              };
                              filteredFlashcards
                                ?.splice(index, 1)
                                .push(theFlashcard);
                              dispatch({
                                type: FetchActionType.FETCH_RESET,
                                payload: filteredFlashcards,
                              });
                              setIndex(0);
                            }}
                            className={button.className}
                          />
                        ))}
                      </div>
                    ) : (
                      <IconButton
                        title={review.buttons.show.title}
                        Icon={review.buttons.show.Icon}
                        size={"sm"}
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      />
                    )}
                  </>
                </>
              ) : (
                <div className="w-full h-24 flex justify-center items-center border border-primary/80 rounded-md">
                  <p>{review.message.caughtUp}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlashCard;

const flashcardStatus = (
  prevStatus: FlashcardStatus | null,
  currentStatus: FlashcardStatus
) => {
  switch (currentStatus) {
    case FlashcardStatus.FORGOTTEN:
      return FlashcardStatus.FORGOTTEN;
    case FlashcardStatus.TOOK_A_WHILE_TO_REMEMBER:
      return FlashcardStatus.TOOK_A_WHILE_TO_REMEMBER;
    case FlashcardStatus.REMEMBERED:
      switch (prevStatus) {
        case FlashcardStatus.FORGOTTEN:
          return FlashcardStatus.TOOK_A_WHILE_TO_REMEMBER;
        case FlashcardStatus.TOOK_A_WHILE_TO_REMEMBER:
          return FlashcardStatus.REMEMBERED;
        default:
          return FlashcardStatus.REMEMBERED;
      }
    default:
      return FlashcardStatus.FORGOTTEN;
  }
};
