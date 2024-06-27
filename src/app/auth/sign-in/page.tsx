"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import _ from "lodash";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySync from "@/api/studySync";
import { authenticate } from "@/assets/data/api/endpoints";
import {
  actionButton,
  actions,
  fields,
  redirect,
  titles,
} from "@/assets/data/auth/sign-in";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setTokens } from "@/utils/auth";

const formSchema = z.object({
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
  remember: z.boolean(),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const filterValues = _.omit(values, ["remember"]);

    try {
      const response = await studySync.post(
        authenticate,
        JSON.stringify(filterValues)
      );
      console.log(response);

      const { access_token, refresh_token } = response.data;
      setTokens(access_token, refresh_token);
    } catch (err) {
      console.log(err);
    } finally {
      // set loading to false
    }
  };

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
          <div className="grid grid-cols-1 gap-8">
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
                    <FormMessage />
                  </MotionFormItem>
                )}
              />
            ))}

            <div className="flex gap-16 items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-2 border-text data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-primary"
                      />
                    </FormControl>
                    <FormLabel className="text-base font-medium !m-0">
                      {actions.remember.title}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Link
                href={actions.forgot.href}
                className="anchor text-accent hover:text-secondary transition-colors duration-300"
              >
                {actions.forgot.title}
              </Link>
            </div>
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

export default SignIn;
