import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import studySyncAI from "@/api/studySyncAI";
import { aiEndpoints } from "@/assets/data/api";

export async function POST(request: NextRequest) {
  let formData = await request.formData();
  let body = Object.fromEntries(formData);

  try {
    const response = await studySyncAI.post(aiEndpoints.uploads, formData);

    const name =
      typeof body.in_file === "object" && "name" in body.in_file
        ? body.in_file.name
        : null;
    const type =
      typeof body.in_file === "object" && "type" in body.in_file
        ? body.in_file.type
        : null;

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        data: { id: response.data.fileId, name, type },
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
