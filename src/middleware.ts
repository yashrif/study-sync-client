import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  // api middlewares
  if (request.nextUrl.pathname.startsWith("/api")) {
  }

  // may write UI middlewares
  else {
  }
  return NextResponse.next();
};
