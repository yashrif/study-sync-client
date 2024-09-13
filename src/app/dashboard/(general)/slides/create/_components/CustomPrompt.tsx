"use client";

import { create } from "@/assets/data/dashboard/slides";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import { CreateSlideActionType } from "@/types";

const CustomPrompt = () => {
  const {
    state: { data },
    dispatch,
  } = useCreateSlideContext();

  return (
    <>
      <Label
        htmlFor={"prompt"}
        className="flex gap-1.5 items-center whitespace-nowrap self-start"
      >
        <create.prompt.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.prompt.title}
        </span>
      </Label>
      <Textarea
        id="prompt"
        placeholder={create.prompt.description}
        className="resize-y text-base text-text placeholder:text-text-200 max-w-lg"
        value={data.prompt}
        onChange={(e) => {
          dispatch({
            type: CreateSlideActionType.SET_SLIDE_DATA,
            payload: { ...data, prompt: e.target.value },
          });
        }}
      />
    </>
  );
};

export default CustomPrompt;
