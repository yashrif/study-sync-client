"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { actionButton, profile } from "@/assets/data/dashboard/settings";
import IconButton from "@/components/button/IconButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useSettingContext } from "@/hooks/useSettingContext";
import { PatchUser, SettingActionType, Status, User } from "@/types";
import { Input } from "@components/ui/input";
import ScopeHeading from "../../_components/ScopeHeading";

const formSchema = z.object({
  email: z.string().email().readonly().optional(),
  role: z.string().readonly().optional(),
  firstName: z.string().min(1, {
    message: "First name can not be empty.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
});

const MotionFormControl = motion(FormControl);
const MotionFormLabel = motion(FormLabel);

const PersonalInfo = () => {
  const {
    state: { user, status },
    dispatch,
  } = useSettingContext();

  useFetchData({
    endpoint: dbEndpoints.users,
    dispatch,
  });

  const { state: patchState, dispatch: patchDispatch } =
    useFetchState<PatchUser>();

  const { handler } = useApiHandler<PatchUser, User>({
    apiCall: useCallback(
      (data) => studySyncDB.patch(dbEndpoints.users, data),
      []
    ),
    dispatch: patchDispatch,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data: {
      [key: string]: string;
    } = {};
    _.forEach(values, (value, key) => {
      if (value) data[key] = value;
    });
    try {
      await handler({ data: data as PatchUser, fetchType: "lazy" });
      dispatch({
        type: SettingActionType.SET_USER,
        payload: {
          ...user,
          ...data,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (status === Status.SUCCESS) form.reset(user);
  }, [form, status, user]);

  return (
    <div className="flex flex-col gap-8">
      <ScopeHeading {...profile.info} />
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full max-w-[700px] grid grid-cols-[max(150px),1fr] gap-x-12 gap-y-8 items-center"
          layout
        >
          {profile.info.fields.map((formField) => (
            <FormField
              key={formField.id}
              control={form.control}
              name={formField.id}
              disabled={formField?.disabled}
              render={({ field }) => (
                <>
                  <MotionFormLabel
                    className="text-md text-text-200"
                    layout="preserve-aspect"
                  >
                    {formField.label}
                  </MotionFormLabel>
                  <FormItem className={`${formField?.className}`}>
                    <MotionFormControl layout="preserve-aspect">
                      <Input
                        type={formField.type}
                        placeholder={formField.placeholder}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        name={field.name}
                        ref={field.ref}
                      />
                    </MotionFormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          ))}

          <div className="flex items-center gap-4 col-start-2">
            {[
              {
                ...actionButton.submit,
                disabled: !form.formState.errors || !form.control._getDirty(),
                status: patchState.status,
              },
              {
                ...actionButton.reset,
                disabled: !form.control._getDirty(),
                onClick: () => {
                  form.reset(user);
                },
              },
            ].map((action) => (
              <IconButton
                key={action.title}
                type="submit"
                Icon={action.Icon}
                {..._.omit(action, "Icon")}
              >
                {action.title}
              </IconButton>
            ))}
          </div>
        </motion.form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
