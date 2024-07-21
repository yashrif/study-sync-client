"use client";

import {
  IconBolt,
  IconCircleLetterAFilled,
  IconLetterA,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { home, review } from "@/assets/data/dashboard/flashcard";
import IconButton from "@/components/button/IconButton";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchDataState } from "@/hooks/fetchData";
import { Flashcard, Status } from "@/types";
import { Dialog, DialogContent } from "@components/ui/dialog";
import PageHeading from "../../_components/PageHeading";

const FlashCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const { back } = useRouter();
  const {
    state: { data, status },
  } = useFetchDataState<Flashcard[]>(dbEndpoints.flashcards);

  return (
    <div className="flex flex-col">
      <PageHeading
        title={home.review.title}
        description={home.review.description}
        Icon={home.review.Icon}
      />
      <Dialog
        defaultOpen
        onOpenChange={() => {
          back();
        }}
      >
        <DialogContent className="max-w-[700px] h-[450px] bg-background">
          <DialogHeader className="flex flex-col gap-6">
            <div className="w-full flex gap-16 items-center justify-between mt-4">
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
                          setIsPreview(!isPreview);
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Toggle preview mode</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-small font-medium text-primary text-pretty">
                  <span>
                    {data ? (isPreview ? index + 1 : data?.length - index) : 0}
                  </span>
                  <span>/</span>
                  <span>{data ? data?.length : 0}</span>
                </p>
              </div>
            </div>
            {status === Status.PENDING ? (
              <SpinnerContainer />
            ) : (
              <div className="h-full flex flex-col justify-between items-center gap-8">
                {data && data.length > 0 && (
                  <>
                    <motion.div
                      className="max-h-[280px] h-auto w-full flex flex-col gap-4 border border-primary/80 p-4 pt-6 rounded-md overflow-x-scroll overflow-y-contain"
                      layout
                    >
                      <motion.div layout="position">
                        <IconBolt className="float-left mr-2 size-6 fill-yellow-500 stroke-none mt-0.5" />
                        <h5>{data?.[index].question}</h5>
                      </motion.div>
                      {isOpen && (
                        <div>
                          <IconCircleLetterAFilled className="float-left mr-2 size-5 text-success mt-0.5" />
                          <p className="text-medium">{data?.[index].answer}</p>
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
                                  index + 1 >= data.length ? 0 : index + 1
                                );
                              },
                            },
                            {
                              ...review.buttons.reset,
                              onClick: async () => {
                                await studySyncDB.patch(
                                  `${dbEndpoints.cqs}/${data?.[index].id}`,
                                  {
                                    status: null,
                                  }
                                );
                              },
                            },
                          ].map((button) => (
                            <IconButton
                              key={button.title}
                              title={button.title}
                              Icon={button.Icon}
                              size={"sm"}
                              onClick={button.onClick}
                              className={button.className}
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
                                await studySyncDB.patch(
                                  `${dbEndpoints.cqs}/${data?.[index].id}`,
                                  {
                                    status: button.status,
                                  }
                                );
                                setIsOpen(false);
                                setIndex(
                                  index + 1 >= data.length ? 0 : index + 1
                                );
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
                )}
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlashCard;
