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
import { SelectElement, Status, UploadShallow } from "@allTypes";

const UploadSelect: React.FC = () => {
  const [options, setOptions] = useState<SelectElement[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const {
    state: { status, uploads },
    dispatch,
  } = useCreateSlideContext();

  useFetchData<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  useEffect(() => {
    if (uploads)
      setOptions(
        _.chain(uploads)
          .uniqBy("name")
          .map((item) => ({
            value: item.name,
            label: item.title,
          }))
          .value()
      );
  }, [uploads]);

  return (
    <>
      <div className="flex gap-1.5 items-center whitespace-nowrap">
        <create.uploads.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.uploads.title}
        </span>
      </div>
      {status === Status.PENDING ? (
        <SpinnerContainer containerClassName="max-w-xl h-10" />
      ) : (
        <MultiSelect
          className="max-w-xl"
          options={options}
          setOptions={setOptions}
          onValueChange={setSelectedOptions}
          defaultValue={selectedOptions}
          placeholder="Select files"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      )}
    </>
  );
};

export default UploadSelect;
