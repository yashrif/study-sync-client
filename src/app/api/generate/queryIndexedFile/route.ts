import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";
import { StudyPromptRequestAi, StudyPromptResponseAi } from "@/types";

export async function POST(request: NextRequest) {
  const { query, fileId }: StudyPromptRequestAi = await request.json();

  try {
    const response: AxiosResponse<StudyPromptResponseAi> =
      await studySyncAI.post<
        StudyPromptResponseAi,
        AxiosResponse<StudyPromptResponseAi>,
        StudyPromptRequestAi
      >(aiEndpoints.queryIndexedFile, { query, fileId });

    return NextResponse.json(response.data, { status: 200 });
  } catch (e: AxiosError | any) {
    return NextResponse.json(
      {
        message: e?.response?.data?.message || e.message || "An error occurred",
      },
      { status: 400 }
    );
  }
}
