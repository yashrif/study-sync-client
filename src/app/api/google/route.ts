import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import process from "process";

import { dbEndpoints, serverEndpoints } from "@/assets/data/api";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_TOKEN_ENDPOINT = process.env.GOOGLE_TOKEN_ENDPOINT || ''

export async function PATCH(request: NextRequest) {
  const params: { code: string, token: string } = await request.json();
  const data = {
    grant_type: "authorization_code",
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: serverEndpoints.hostname,
    code: params.code
  };

  // Getting refresh token from google
  let refreshToken
  try {
    const tokenResponse = await axios.post(GOOGLE_TOKEN_ENDPOINT, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    refreshToken = tokenResponse.data.refresh_token;
  } catch (e: AxiosError | any | unknown | Error) {
    return NextResponse.json(
      {
        message: e.message.message || e.message || "An error occurred",
      },
      { status: 400 },
    );

  }


  // storing google-refresh token in DB
  try {
    const response = await axios.patch(dbEndpoints.api + dbEndpoints.preferences,
      { refreshToken: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${params.token}`
        }
      });

    return NextResponse.json(
        response.data
      ,
      { status: 200 }
    );

  } catch (e: AxiosError | any | unknown | Error) {
    console.log(e)
    return NextResponse.json(
      {
        message: e.message.message || e.message || "An error occurred",
      },
      { status: 400 },
    );

  }



}