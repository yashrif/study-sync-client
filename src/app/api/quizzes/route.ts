import { AxiosError, AxiosResponse } from "axios";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";
import {
  CqResponseAi,
  CqsResponseAi,
  McqResponseAi,
  McqsResponseAi,
  QuizTypes,
} from "@/types";

export async function POST(request: NextRequest) {
  const {
    ids,
    types,
  }: {
    ids: string[];
    types: QuizTypes[];
  } = await request.json();

  try {
    let mcqs: McqResponseAi[] = [],
      cqs: CqResponseAi[] = [];
    if (types.includes(QuizTypes.MCQ)) {
      const response: AxiosResponse<McqsResponseAi> = await studySyncAI.post(
        aiEndpoints.qna,
        ids
      );

      mcqs = _.flatten(response.data.collection);
    }
    if (types.includes(QuizTypes.CQ)) {
      const response: AxiosResponse<CqsResponseAi> = await studySyncAI.post(
        aiEndpoints.cqna,
        ids
      );
      cqs = _.flatten(response.data.collection);
    }

    return NextResponse.json(
      {
        mcqs: _.map(mcqs, (data) => ({
          question: data.question,
          choices: data.choice,
          answers: data.isChoiceAnswer,
        })),
        cqs: _.map(cqs, (data) => ({
          question: data.question,
          answer: data.answer,
        })),
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
