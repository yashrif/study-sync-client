import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";

export async function POST(request: NextRequest) {
  const params: {
    rightAnswer: string;
    givenAnswer: string;
  } = await request.json();

  try {
    const response = await studySyncAI.post(aiEndpoints.evaluate, params);

    return NextResponse.json(
      {
        ...response.data,
      },
      { status: 200 },
    );
  } catch (e: AxiosError | any | unknown | Error) {
    return NextResponse.json(
      {
        message: e.message.message || e.message || "An error occurred",
      },
      { status: 400 },
    );
  }
}
