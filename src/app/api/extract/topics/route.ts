import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";
import { TopicsResponseAi } from "@/types";

export async function POST(request: NextRequest) {
  const ids: string[] = await request.json();

  try {
    const response: AxiosResponse<TopicsResponseAi> = await studySyncAI.post(
      aiEndpoints.topics,
      ids
    );

    return NextResponse.json(
      {
        name: response.data.collectionName,
        topics: response.data.collection[0].map((topic) => ({
          name: topic.name,
          description: topic.desciption,
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
