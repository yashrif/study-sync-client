"use client";

import IconButton from "@/components/button/IconButton";
import { IconFileTypePdf } from "@tabler/icons-react";

const exportPdf = async (markdown: string, fileName?: string) => {
  const response = await fetch("/api/generate/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markdown }),
  });

  if (!response.ok) {
    console.error("Failed to generate PDF");
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName || "document.pdf";
  a.click();
};

type Props = {
  content: string;
  fileName?: string;
  disabled?: boolean;
};

const PdfExporter: React.FC<Props> = ({ content, fileName, disabled }) => {
  return (
    <IconButton
      title="Export"
      Icon={IconFileTypePdf}
      disabled={disabled}
      onClick={() => exportPdf(content, fileName)}
    />
  );
};

export default PdfExporter;
