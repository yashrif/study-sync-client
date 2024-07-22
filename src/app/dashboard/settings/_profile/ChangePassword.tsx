"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import _ from "lodash";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { actionButton, profile } from "@/assets/data/dashboard/settings";
import SubmitButton from "@/components/button/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { ChangePassword as TChangePassword } from "@/types";
import { Input } from "@components/ui/input";
import ScopeHeading from "../../_components/ScopeHeading";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Password is required.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.newPassword !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
    if (data.currentPassword === data.newPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New Password and current password can not be the same.",
      });
    }
  });

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.custom &&
    issue.path[0] === "confirmPassword"
  )
    return { message: issue.message || `An error occurred.` };

  if (issue.code === z.ZodIssueCode.custom && issue.path[0] === "newPassword")
    return { message: issue.message || `An error occurred.` };

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const MotionFormControl = motion(FormControl);
const MotionFormLabel = motion(FormLabel);

const ChangePassword = () => {
  const {
    state: { status },
    dispatch,
  } = useFetchState<TChangePassword>();

  const { handler } = useApiHandler<TChangePassword, TChangePassword>({
    apiCall: useCallback(
      (data) => studySyncDB.patch(dbEndpoints.changePassword, data),
      [],
    ),
    dispatch,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await handler({ data: values as TChangePassword, fetchType: "lazy" });
  };

  return (
    <div className="flex flex-col gap-8">
      <ScopeHeading {...profile.changePassword} />
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full max-w-[700px] grid grid-cols-[max(150px),1fr] gap-x-12 gap-y-8 items-center"
          layout
        >
          {profile.changePassword.fields.map((formField) => (
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
                status: status,
              },
              {
                ...actionButton.cancel,
                disabled: !form.control._getDirty(),
                onClick: () => {
                  form.reset();
                },
              },
            ].map((action) => (
              <SubmitButton key={action.title} {..._.omit(action, "Icon")}>
                {action.title}
              </SubmitButton>
            ))}
          </div>
        </motion.form>
      </Form>
    </div>
  );
};

export default ChangePassword;
