"use client";

import { useState } from "react";

const exportPdf = async (markdown: string) => {
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
  a.download = "document.pdf";
  a.click();
};

const PdfExporter: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div>
      <button onClick={() => exportPdf(content)}>Export as PDF</button>
    </div>
  );
};

export default PdfExporter;
