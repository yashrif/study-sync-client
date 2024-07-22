"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { dbEndpoints } from "@/assets/data/api";
import { profile } from "@/assets/data/dashboard/settings";
import SubmitButton from "@/components/button/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFetchData } from "@/hooks/fetchData";
import { useSettingContext } from "@/hooks/useSettingContext";
import { Input } from "@components/ui/input";
import ScopeHeading from "../../_components/ScopeHeading";
import { Status } from "@/types";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name can not be empty.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
});

const PersonalInfo = () => {
  const {
    state: { user, status },
    dispatch,
  } = useSettingContext();

  useFetchData({
    endpoint: dbEndpoints.users,
    dispatch,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <ScopeHeading
        title={profile.info.title}
        Icon={profile.info.Icon}
        description={profile.info.description}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full max-w-[700px] grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-12 items-center"
        >
          {profile.fields.map((formField) => (
            <FormField
              key={formField.id}
              control={form.control}
              name={formField.id}
              render={({ field }) => (
                <FormItem className={`${formField?.className}`}>
                  <FormControl>
                    <Input
                      type={formField.type}
                      placeholder={formField.label}
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex gap-4 justify-start">
            <SubmitButton status={status}>Submit</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
