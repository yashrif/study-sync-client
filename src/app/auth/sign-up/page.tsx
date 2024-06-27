"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySync from "@/api/studySync";
import { register } from "@/assets/data/api/endpoints";
import {
  actionButton,
  fields,
  redirect,
  titles,
} from "@/assets/data/auth/sign-up";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required.",
    }),
    lastName: z.string().min(1, {
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
    confirmPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const filterValues = _.omit(values, ["confirmPassword"]);

    try {
      const response = await studySync.post(
        register,
        JSON.stringify(filterValues)
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(form.formState.errors);

  const MotionFormItem = motion(FormItem);

  return (
    <>
      <h2 className="text-text">{titles}</h2>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
          layout
        >
          <div className="grid grid-cols-2 gap-8">
            {fields.map((formField) => (
              <FormField
                key={formField.id}
                control={form.control}
                name={formField.id}
                render={({ field }) => (
                  <MotionFormItem className={`${formField?.className}`} layout>
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
          </div>
          <div className="flex flex-col gap-4">
            <Button
              type={"submit"}
              size={"lg"}
              className="group col-span-2 bg-text hover:bg-secondary text-accent hover:text-white"
            >
              {actionButton}
            </Button>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-medium font-medium">{redirect.title}</p>
              <Link
                href={redirect.link.href}
                className="anchor text-accent hover:text-secondary transition-colors duration-300"
              >
                {redirect.link.title}
              </Link>
            </div>
          </div>
        </motion.form>
      </Form>
    </>
  );
};

export default SignUp;
