"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncDB from "@/api/studySyncDB";
import { actions, additionalFields } from "@/assets/data/auth/sign-in";
import SubmitButton from "@/components/button/SubmitButton";
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
import {
  Link as LinkType,
  SignInField,
  SignInSchema,
  SignUpField,
  SignUpSchema,
} from "@/types";
import { setTokens } from "@/utils/auth";
import { Status } from "@allTypes";

const MotionFormItem = motion(FormItem);

type Props = {
  formSchema: SignUpSchema | SignInSchema;
  altLink: {
    title: string;
    link: LinkType;
  };
  redirect?: string | undefined;
  url: string;
  title: string;
  fields: SignUpField[] | SignInField[];
  actionButton: string;
  defaultValues?: Record<string, string | boolean>;
  showAdditionalFields?: boolean;
};

const AuthContainer: React.FC<Props> = ({
  formSchema,
  altLink,
  redirect = undefined,
  url,
  title,
  fields,
  actionButton,
  defaultValues = {},
  showAdditionalFields = false,
}) => {
  const { replace } = useRouter();
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStatus(Status.PENDING);
    let statusCode = 0;

    try {
      const response = await studySyncDB.post(url, JSON.stringify(values));

      setStatus(Status.SUCCESS);
      const { access_token, refresh_token } = response.data;
      statusCode = response.status;
      setTokens(access_token, refresh_token);
    } catch (err) {
      console.log(err);
      setStatus(Status.ERROR);
    } finally {
      setTimeout(() => {
        if ((statusCode === 200 || statusCode === 201) && redirect)
          replace(redirect);
        setStatus(Status.IDLE);
      }, 2500);
    }
  };

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-12 items-center"
          layout
        >
          <h2 className="text-text mb-4">{title}</h2>
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
                        value={field.value as string}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </MotionFormItem>
                )}
              />
            ))}

            {/* ----------------------------- Additional Fields ---------------------------- */}

            {showAdditionalFields && (
              <div className="flex gap-16 items-center justify-between col-span-2">
                <FormField
                  control={form.control}
                  name={
                    additionalFields.remember
                      .id as keyof typeof additionalFields
                  }
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
                        {additionalFields.remember.label}
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
            )}
          </div>

          <div className="flex flex-col gap-4">
            <SubmitButton
              type={"submit"}
              size={"lg"}
              status={status}
              className="group col-span-2 bg-text hover:bg-primary text-accent hover:text-white"
            >
              {actionButton}
            </SubmitButton>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-medium font-medium">{altLink.title}</p>
              <Link
                href={altLink.link.href}
                className="anchor text-accent hover:text-secondary transition-colors duration-300"
              >
                {altLink.link.title}
              </Link>
            </div>
          </div>
        </motion.form>
      </Form>
    </>
  );
};

export default AuthContainer;
