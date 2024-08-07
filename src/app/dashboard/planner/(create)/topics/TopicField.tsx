import { IconRefresh, IconTrash } from "@tabler/icons-react";
import randomColor from "randomcolor";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

import { topics } from "@/assets/data/dashboard/planner";
import IconButton from "@/components/button/IconButton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Topic } from "@/types";
import { tintGenerator } from "@/utils/tintGenerator";

type Props = {
  topic: Topic;
  form: UseFormReturn<
    {
      topics: {
        name: string;
        description: string;
        color: string;
      }[];
    },
    any,
    undefined
  >;
  controls: UseFieldArrayReturn<
    {
      topics: {
        name: string;
        description: string;
        color: string;
      }[];
    },
    "topics",
    "id"
  >;
  index: number;
};

const TopicField: React.FC<Props> = ({ topic, form, controls, index }) => {
  return (
    <div
      key={topic.name}
      className="w-full grid grid-cols-[280px,420px,1fr,auto] items-end justify-between gap-16 pt-8 first:pt-0"
    >
      <FormField
        {...form.register(`topics.${index}.name`)}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>{topics.fields.name.label}</FormLabel>
            <FormControl>
              <Input {...field} {...topics.fields.name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        {...form.register(`topics.${index}.description`)}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>{topics.fields.description.label}</FormLabel>
            <FormControl>
              <Input {...field} {...topics.fields.description} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        {...form.register(`topics.${index}.color`)}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 justify-between">
            <FormLabel>{topics.fields.color.label}</FormLabel>
            <div className="flex gap-4 items-center !mt-0">
              <div
                className="size-9 border flex items-center justify-center rounded-md cursor-pointer"
                style={{
                  borderColor: field.value,
                  backgroundColor: `#${tintGenerator(field?.value || "", 20)}`,
                }}
                onClick={() => {
                  field.onChange(randomColor());
                }}
              >
                <IconRefresh
                  className="size-6"
                  style={{
                    stroke: field.value,
                  }}
                />
              </div>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-[120px]"
                  maxLength={6}
                  minLength={6}
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <IconButton
        Icon={IconTrash}
        variant={"outline"}
        iconClassName="stroke-destructive size-6"
        className="size-9 ring-transparent hover:bg-destructive/20 mb-0.5"
        onClick={() => {
          controls.remove(index);
        }}
      />
    </div>
  );
};

export default TopicField;
