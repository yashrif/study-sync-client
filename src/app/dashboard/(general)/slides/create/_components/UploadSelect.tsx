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
  UploadShallow,
} from "@allTypes";

const UploadSelect: React.FC = () => {
  const [options, setOptions] = useState<SelectElement[]>([]);
  const [selectedUploads, setSelectedUploads] = useState<string[]>([]);

  const {
    state: { status, uploads, data },
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
          .filter((item) => item.isIndexed)
          .uniqBy("id")
          .map((item) => ({
            value: item.id,
            label: item.title,
          }))
          .value()
      );
  }, [uploads]);

  useEffect(() => {
    dispatch({
      type: CreateSlideActionType.SET_SLIDE_DATA,
      payload: {
        ...data,
        uploads: selectedUploads,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedUploads]);

  return (
    <>
      <div className="flex gap-1.5 items-center whitespace-nowrap">
        <create.uploads.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.uploads.title}
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
            onValueChange={setSelectedUploads}
            defaultValue={selectedUploads}
            placeholder="Select files"
            variant="inverted"
            animation={2}
            maxCount={3}
            maxCharacters={25}
          />
        </div>
      )}
    </>
  );
};

export default UploadSelect;
