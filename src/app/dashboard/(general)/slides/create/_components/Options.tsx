"use client";

import { create } from "@/assets/data/dashboard/slides";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import { CreateSlideActionType } from "@/types";

const Options = () => {
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
        <create.options.icon className="size-5 stroke-primary stroke-[2.5px]" />
        <span className="text-large font-medium text-primary">
          {create.options.title}
        </span>
      </Label>
      <div className="flex gap-8 items-center">
        {create.options.fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Checkbox
              id={field.id}
              onCheckedChange={(e) => {
                dispatch({
                  type: CreateSlideActionType.SET_SLIDE_DATA,
                  payload: {
                    ...data,
                    webSearch: e as boolean,
                  },
                });
              }}
            />
            <Label
              htmlFor={field.id}
              className="flex gap-1.5 items-center peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="text-base text-muted-foreground leading-none">
                {field.title}
              </span>
              <field.icon className="size-4 stroke-muted-foreground stroke-2" />
            </Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Options;
