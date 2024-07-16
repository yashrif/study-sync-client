import { AxiosError } from "axios";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";
import { QuizTypes } from "@/types";

export async function POST(request: NextRequest) {
  const {
    ids,
    types,
  }: {
    ids: string[];
    types: QuizTypes[];
  } = await request.json();

  try {
    let mcqs, cqs;
    if (types.includes(QuizTypes.MCQ)) {
      const response = await studySyncAI.post(aiEndpoints.qna, ids);
      mcqs = response.data[0].collection;
    }
    if (types.includes(QuizTypes.CQ)) {
      const response = await studySyncAI.post(aiEndpoints.cqna, ids);
      cqs = response.data[0].collection;
    }

    return NextResponse.json(
      {
        mcqs: _.chain(mcqs)
          .map((data) => ({
            question: data.question,
            choices: data.choice,
            answers: data.isChoiceAnswer,
          }))
          .value(),
        cqs: _.chain(cqs)
          .map((data) => ({
            question: data.question,
            answer: data.answer,
          }))
          .value(),
      },
      { status: 200 }
    );
  } catch (e: AxiosError | any | unknown | Error) {
    return NextResponse.json(
      {
        message: e.message.message || e.message || "An error occurred",
      },
      { status: 400 }
    );
  }
}
