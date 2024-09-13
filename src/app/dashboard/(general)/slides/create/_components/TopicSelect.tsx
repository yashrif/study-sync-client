"use client";

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/slides";
import { MultiSelect } from "@/components/ui/multi-select";
import { useFetchData } from "@/hooks/fetchData";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import { SelectElement, Status, TopicShallow } from "@allTypes";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";

const TopicSelect: React.FC = () => {
  const [options, setOptions] = useState<SelectElement[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const {
    state: { status, topics },
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

  return (
    <>
      <div className="flex gap-1.5 items-center whitespace-nowrap">
        <create.topics.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.topics.title}
        </span>
      </div>
      {status === Status.PENDING ? (
        <SpinnerContainer containerClassName="max-w-xl h-10" />
      ) : (
        <MultiSelect
          className="max-w-xl"
          options={options}
          setOptions={setOptions}
          addOption
          onValueChange={setSelectedOptions}
          defaultValue={selectedOptions}
          placeholder="Select topics"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      )}
    </>
  );
};

export default TopicSelect;
