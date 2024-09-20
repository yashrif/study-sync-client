import { convertMarkdownToHtml } from "@/utils/markdownToHtml";
import { NextResponse } from "next/server";

import { generatePdfFromHtml } from "@/utils/generatePdf";

export async function POST(request: Request) {
  const { markdown } = await request.json();

  console.log(markdown);

  if (!markdown) {
    return NextResponse.json(
      { error: "No markdown provided" },
      { status: 400 }
    );
  }

  const htmlContent = convertMarkdownToHtml(markdown);
  const pdfBuffer = await generatePdfFromHtml(htmlContent);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    },
  });
}
