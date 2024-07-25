import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const response = await studySyncAI.delete(
      `${aiEndpoints.uploads.delete}?uuidFileName=${params.id}`,
    );

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
