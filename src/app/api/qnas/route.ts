import _ from "lodash";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";

export async function POST(request: NextRequest) {
  const ids: string[] = await request.json();

  try {
    const response = await studySyncAI.post(aiEndpoints.qna, ids);
    const data = response.data[0].collection;

    return NextResponse.json(
      {
        mcqs: _.chain(data)
          .map((data) => ({
            question: data.question,
            choices: data.choice,
            answers: data.isChoiceAnswer,
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
