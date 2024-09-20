import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";
import { SlideRequestAI, SlideRequestServer, SlideResponseAI } from "@/types";

export async function POST(request: NextRequest) {
  const props: SlideRequestServer = await request.json();

  try {
    const response: AxiosResponse<SlideResponseAI> = await studySyncAI.post<
      SlideResponseAI,
      AxiosResponse<SlideResponseAI>,
      SlideRequestAI
    >(aiEndpoints.content, props);

    return NextResponse.json(response.data.content, { status: 200 });
  } catch (e: AxiosError | any) {
    return NextResponse.json(
      {
        message: e?.response?.data?.message || e.message || "An error occurred",
      },
      { status: 400 }
    );
  }
}
