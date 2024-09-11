"use client";

import {
  IconCalendarFilled,
  IconPointFilled,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import {
  PlannerActionType,
  Status,
  Topic,
  TopicRecord,
  TopicShallow,
  TopicStatus,
} from "@/types";
import { compareIsoDates } from "@/utils/compareIsoDates";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import StatusCard from "../topic-card/Status";

type Props = {
  topic: Topic;
  date: string;
};

const RecordCard: React.FC<Props> = ({ topic, date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { state, dispatch: plannerDispatch } = usePlannerContext();
  const {
    state: { status: fetchStatus },
    dispatch,
  } = useFetchState<TopicShallow>();

  const { handler } = useApiHandler<{ records: TopicRecord[] }, TopicShallow>({
    apiCall: useCallback(
      (data, pathVariable) =>
        studySyncDB.patch(`${dbEndpoints.topics}/${pathVariable}`, data),
      []
    ),
    dispatch,
  });

  const record = useMemo(() => {
    if (topic?.records?.length) {
      return topic.records.find((record) =>
        compareIsoDates(record?.date, date)
      );
    } else return undefined;
  }, [date, topic?.records]);

  const MotionIconButton = motion(IconButton);

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    data?: TopicRecord
  ) => {
    if (e) e.stopPropagation();

    const newRecords =
      topic?.records?.filter((rec) => !compareIsoDates(rec.date, date)) || [];

    if (data) newRecords.push(data);

    const sortedRecords = _.sortBy(newRecords, "date");

    console.log(topic);

    handler({
      data: {
        records: sortedRecords,
      },
      fetchType: "lazy",
      isReset: true,
      pathVariable: topic.id,
    });

    plannerDispatch({
      type: PlannerActionType.SET_PLANNER,
      payload: {
        ...state.planner,
        topics: state.planner.topics.map((theTopic) =>
          theTopic.id === topic.id
            ? {
                ...theTopic,
                records: sortedRecords,
                status: newRecords.at(-1)?.status ?? TopicStatus.WEAK,
              }
            : theTopic
        ),
      },
    });
  };

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className={`relative h-full py-3 px-4 rounded-sm flex flex-col justify-center gap-2 hover:shadow-primary cursor-pointer transition-all duration-300
              ${record ? backgroundColor(record.status) : ""}`}
            style={{
              boxShadow: isHovered
                ? `0 0 4px 1px ${topic.color}`
                : `0 6px 12px rgba(0, 0, 0, 0.08)`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsOpen(true)}
          >
            {((isHovered && (isOpen || record)) ||
              fetchStatus === Status.PENDING ||
              fetchStatus === Status.SUCCESS) && (
              <AnimatePresence>
                <MotionIconButton
                  contents={{
                    [Status.IDLE]: {
                      type: "icon-only",
                      Icon: IconX,
                      iconClassName: "stroke-destructive",
                    },
                    [Status.SUCCESS]: {
                      type: "icon-only",
                      iconClassName: "!text-success !stroke-success",
                    },
                  }}
                  status={fetchStatus}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);

                    if (record && !isOpen) {
                      onClick(e);
                    }
                  }}
                  className={`self-center rounded-full size-5 p-0 absolute
                      ${
                        fetchStatus === Status.SUCCESS
                          ? "ring-success"
                          : "ring-destructive"
                      } bg-transparent hover:bg-transparent hover:scale-110 z-[9999]`}
                  iconClassName="size-3"
                  variant={"outline"}
                  initial={{
                    opacity: 0,
                    top: 16,
                    left: "50%",
                    translateY: "-50%",
                    translateX: "-50%",
                  }}
                  animate={{
                    opacity: 1,
                    top: 0,
                    left: "50%",
                    translateY: "-50%",
                    translateX: "-50%",
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    top: -16,
                    left: "50%",
                    translateX: "-50%",
                  }}
                  whileHover={{
                    scale: 1.25,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                />
              </AnimatePresence>
            )}
            {isOpen ? (
              <div className="flex flex-col gap-3">
                <Select
                  onValueChange={(value) => {
                    try {
                      onClick(null, {
                        date,
                        status: value as TopicStatus,
                      });

                      setIsOpen(false);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Status"
                      className="placeholder:capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TopicStatus).map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="cursor-pointer"
                      >
                        {status.slice(0, 1).toUpperCase() +
                          status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              record && (
                <div className="flex flex-col gap-2 items-center justify-center">
                  <StatusCard status={record.status} />
                  <div
                    className="flex gap-1.5 items-center "
                    style={{
                      color: topic.color,
                    }}
                  >
                    <IconCalendarFilled className="size-4" />
                    <p className="text-small">{dateFormatter(date, "short")}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <div className="flex gap-1.5 items-center">
                <IconPointFilled
                  className="size-4"
                  style={{
                    fill: topic.color,
                  }}
                />
                <h4
                  className="text-sm font-semibold"
                  style={{
                    color: topic.color,
                  }}
                >
                  {topic.name}
                </h4>
              </div>
              <p className="text-sm text-wrap pl-[22px]">{topic.description}</p>
              <div
                className="flex gap-1.5 items-center pt-2"
                style={{
                  color: topic.color,
                }}
              >
                <IconCalendarFilled className="size-4" />
                <p className="text-small pt-0.5">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(date).toDateString()}
                </p>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default RecordCard;

const backgroundColor = (status: string) => {
  switch (status) {
    case TopicStatus.WEAK:
      return "bg-destructive/20";
    case TopicStatus.MODERATE:
      return "bg-yellow-500/20";
    case TopicStatus.CONFIDENT:
      return "bg-success/20";
  }
};
