import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { create, queryKeys, topics } from "@/assets/data/dashboard/planner";
import IconButton from "@/components/button/IconButton";
import { Form } from "@/components/ui/form";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useQueryString } from "@/hooks/useQueryString";
import { PlannerActionType, TopicsResponseServer } from "@/types";
import TopicField from "./TopicField";

type Props = {
  data: TopicsResponseServer;
};

const TopicsForm: React.FC<Props> = ({ data }) => {
  const { push } = useRouter();
  const { getQueryString: getParams } = useQueryParams();
  const { dispatch } = usePlannerContext();
  const { getAllQueryString } = useQueryString();

  const selectedUploads = useMemo(() => {
    return getAllQueryString(queryKeys.uploads.key);
  }, [getAllQueryString]);

  const FormSchema = z.object({
    topics: z.array(
      z.object({
        name: z.string().min(1, {
          message: "Topic name is required",
        }),
        description: z.string(),
        color: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topics: data.topics?.map((topic) => ({
        name: topic.name,
        description: topic.description,
        color: randomColor({ luminosity: "bright" }),
      })),
    },
  });
  const controls = useFieldArray({
    control: form.control,
    name: "topics",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    dispatch({
      type: PlannerActionType.SET_TOPICS,
      payload: data.topics,
    });
    push(
      create.steps[3].path + getParams(queryKeys.uploads.key, selectedUploads)
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 divide-y"
      >
        {form
          .getValues()
          .topics?.map((topic, index) => (
            <TopicField
              key={index}
              topic={topic}
              form={form}
              controls={controls}
              index={index}
            />
          ))}

        <div className="flex gap-4 justify-end pt-8">
          <IconButton
            {...topics.buttons.add}
            onClick={() => {
              controls.append({
                name: "",
                description: "",
                color: randomColor({
                  luminosity: "bright",
                }),
              });
            }}
          />
          <IconButton {...topics.buttons.submit} type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default TopicsForm;
