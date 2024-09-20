"use client";

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/slides";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { MultiSelect } from "@/components/ui/multi-select";
import { useFetchData } from "@/hooks/fetchData";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import {
  CreateSlideActionType,
  SelectElement,
  Status,
  TopicShallow,
} from "@allTypes";

const TopicSelect: React.FC = () => {
  const [options, setOptions] = useState<SelectElement[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const {
    state: { status, topics, data },
    dispatch,
  } = useCreateSlideContext();

  useFetchData<null, TopicShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.topics), []),
    dispatch,
  });

  useEffect(() => {
    if (topics.length > 0)
      setOptions(() =>
        _.chain(topics)
          .uniqBy("name")
          .map((item) => ({
            value: item.name,
            label: item.name,
            color: item.color,
          }))
          .value()
      );
  }, [topics]);

  useEffect(() => {
    dispatch({
      type: CreateSlideActionType.SET_SLIDE_DATA,
      payload: {
        ...data,
        topics: selectedTopics,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedTopics]);

  return (
    <div className="grid grid-cols-[auto,1fr] gap-12 items-center">
      <div className="flex gap-1.5 items-center whitespace-nowrap">
        <create.topics.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.topics.title}
        </span>
      </div>
      {status === Status.PENDING ? (
        <SpinnerContainer containerClassName="max-w-lg h-10" />
      ) : (
        <div className="flex items-center gap-8">
          <MultiSelect
            className="max-w-lg"
            options={options}
            setOptions={setOptions}
            addOption
            onValueChange={setSelectedTopics}
            defaultValue={selectedTopics}
            placeholder="Select topics"
            variant="inverted"
            animation={2}
            maxCount={3}
            maxCharacters={25}
          />
        </div>
      )}
    </div>
  );
};

export default TopicSelect;
