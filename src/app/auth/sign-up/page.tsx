"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { actionButton, fields, titles } from "@/assets/data/auth/sign-up";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "First name is required.",
    }),
    last_name: z.string().min(1, {
      message: "Last name is required.",
    }),
    email: z
      .string()
      .email({
        message: "Invalid email!",
      })
      .min(1, {
        message: "Email is required.",
      }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string(),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirm_password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "Passwords do not match.",
      });
    }
  });

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.custom &&
    issue.path[0] === "confirm_password"
  ) {
    return { message: issue.message || `An error occurred.` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values, form.formState.errors);
  }

  console.log(form.formState.errors);

  const MotionFormItem = motion(FormItem);

  return (
    <div className="w-full h-screen flex justify-center items-center p-20">
      <div className="max-w-[1000px] w-full min-h-[500px] h-full rounded-lg overflow-hidden bg-auth-bg bg-cover object-cover bg-center grid grid-cols-[1fr,4fr] shadow-[12px_12px_16px_rgba(0,0,0,0.25)]">
        <div></div>
        <div className="bg-auth-curve bg-cover flex justify-end">
          <div className="w-[75%] px-20 py-16 flex flex-col gap-16">
            <h2 className="text-text">{titles}</h2>
            <div className="">
              <Form {...form}>
                <motion.form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-2 gap-8 col"
                  layout
                >
                  {fields.map((formField) => (
                    <FormField
                      key={formField.id}
                      control={form.control}
                      name={formField.id}
                      render={({ field }) => (
                        <MotionFormItem
                          className={`${formField?.className}`}
                          layout
                        >
                          <FormControl>
                            <Input
                              type={formField.type}
                              placeholder={formField.label}
                              variant={"underline"}
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                          <FormMessage />
                        </MotionFormItem>
                      )}
                    />
                  ))}
                  <Button
                    type={"submit"}
                    className="group col-span-2 bg-text hover:bg-secondary text-accent hover:text-white"
                  >
                    {actionButton}
                  </Button>
                </motion.form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
