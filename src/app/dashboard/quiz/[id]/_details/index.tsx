"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { Form } from "@/components/ui/form";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import {
  Choices,
  CqIntermediate,
  McqIntermediate,
  QuizActionType,
  QuizEvaluateResponseServer,
  QuizTypes,
} from "@/types";
import Heading from "../_components/Heading";
import Cq from "./components/Cq";
import Mcq from "./components/Mcq";

const List: React.FC = () => {
  const { checkQueryString } = useQueryString();
  const {
    state: { quiz, formRef: ref },
    dispatch,
  } = useQuizContext();
  const { mcqs, cqs } = useMemo(() => {
    return {
      mcqs: checkQueryString(queryParams.types.key, QuizTypes.MCQ)
        ? quiz.mcqs || []
        : [],
      cqs: checkQueryString(queryParams.types.key, QuizTypes.CQ)
        ? quiz.cqs || []
        : [],
    };
  }, [checkQueryString, quiz.cqs, quiz.mcqs]);

  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) formRef.current.requestSubmit();
    },
    clear: () => {
      if (formRef.current) formRef.current.reset();
      dispatch({
        type: QuizActionType.SET_IS_SHOW_RESULTS,
        payload: false,
      });

      form.reset(initialState(mcqs || []));
    },
  }));

  const FormSchema = generateFormSchema({ mcqs: mcqs || [], cqs: cqs || [] });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let mcqPoints = 0;

    mcqs?.forEach((mcq) => {
      if (mcq.answers[Choices[data[mcq.id] as keyof typeof Choices]])
        mcqPoints++;
    });

    dispatch({
      type: QuizActionType.SET_POINTS_START,
    });

    dispatch({
      type: QuizActionType.SET_IS_SHOW_RESULTS,
      payload: true,
    });

    dispatch({
      type: QuizActionType.QUIZ_EVALUATE_START,
    });
    try {
      const evaluation = await Promise.all(
        cqs?.map(async (cq) => {
          const response = await studySyncServer.post(
            serverEndpoints.evaluate,
            {
              rightAnswer: cq.answer,
              givenAnswer: data[cq.id],
            },
          );

          return { [cq.id]: response.data as QuizEvaluateResponseServer };
        }) || [],
      );

      const cqEvaluation = evaluation.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {},
      ) as { [key: string]: QuizEvaluateResponseServer };

      dispatch({
        type: QuizActionType.QUIZ_EVALUATE_SUCCESS,
        payload: cqEvaluation,
      });

      let cqPoints = 0;
      Object.values(cqEvaluation).forEach((cq) => {
        cqPoints += cq.correctness / 100;
      });

      dispatch({
        type: QuizActionType.SET_POINTS_SUCCESS,
        payload: mcqPoints + cqPoints,
      });
    } catch (e) {
      dispatch({
        type: QuizActionType.QUIZ_EVALUATE_ERROR,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-16 max-w-[940px]"
      >
        <div className="flex flex-col gap-16 divide-y-2">
          {mcqs?.length > 0 && (
            <div className="flex flex-col gap-8">
              <Heading title={quizDetails.mcq.title} />
              {mcqs?.map((mcq, index) => (
                <Mcq key={mcq.id} mcq={mcq} form={form} order={index + 1} />
              ))}
            </div>
          )}
          {cqs?.length > 0 && (
            <div className="flex flex-col gap-8 pt-16 first:pt-0">
              <Heading title={quizDetails.cq.title} />
              {cqs?.map((cq, index) => (
                <Cq key={cq.id} cq={cq} form={form} order={index + 1} />
              ))}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default List;

const initialState = (mcqs: McqIntermediate[]) => ({
  ...mcqs.reduce((acc: { [key: string]: any }, mcq) => {
    acc[mcq.id] = "";
    return acc;
  }, {}),
});

const generateFormSchema = ({
  mcqs,
  cqs,
}: {
  mcqs: McqIntermediate[];
  cqs: CqIntermediate[];
}) => {
  let fields: {
    [x: string]: z.ZodEnum<[string, ...string[]]> | z.ZodString;
  } = {};

  mcqs.forEach((mcq) => {
    fields[mcq.id] = z.enum(
      [...(Object.values(Choices) as [string, ...string[]])],
      {
        required_error: "You need to chose one option.",
      },
    );
  });
  cqs.forEach((cq) => {
    fields[cq.id] = z.string().min(1, {
      message: "Answer cannot be empty",
    });
  });

  return z.object(fields);
};
