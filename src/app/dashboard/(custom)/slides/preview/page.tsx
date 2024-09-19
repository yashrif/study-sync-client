"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import PageHeading from "@/app/dashboard/_components/PageHeading";
import { home, preview, QueryParams } from "@/assets/data/dashboard/slides";
import { routes } from "@/assets/data/routes";
import { useQueryString } from "@/hooks/useQueryString";
import IconButton from "@/components/button/IconButton";

const Preview = () => {
  const { replace } = useRouter();
  const { getAllQueryString } = useQueryString();

  const [content, uploads, topics] = [
    getAllQueryString(QueryParams.content),
    getAllQueryString(QueryParams.uploads),
    getAllQueryString(QueryParams.topics),
  ];

  const [value, setValue] = useState<string | undefined>(
    typeof content === "string" ? content : content[0]
  );

  if (!content) {
    replace(routes.dashboard.slides.create);
  }

  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[auto,1fr]">
      <PageHeading {...home.create}>
        <IconButton {...preview.buttons.save} />
      </PageHeading>
      <div
        className="container h-full overflow-hidden px-0.5 pb-10"
        data-color-mode="light"
      >
        <MDEditor
          value={value}
          onChange={setValue}
          className="!rounded-md border !shadow-none !bg-background *:!bg-background !h-full p-5"
          previewOptions={{
            className: "markdown-lg !text-foreground !bg-transparent",
          }}
        />
      </div>
    </div>
  );
};

export default Preview;
