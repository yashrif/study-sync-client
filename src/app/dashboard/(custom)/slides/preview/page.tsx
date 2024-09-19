"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import { routes } from "@/assets/data/routes";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { home } from "@/assets/data/dashboard/slides";

const Preview = () => {
  const { replace } = useRouter();
  const [value, setValue] = useState<string | undefined>("");

  const { state } = useCreateSlideContext();

  useEffect(() => {
    if (state.content) {
      setValue(state.content);
    }
  }, [state.content]);

  if (!state.content) {
    replace(routes.dashboard.slides.create);
  }

  return (
    <div className="h-full grid grid-cols-1 grid-rows-[auto,1fr]">
      <PageHeading {...home.create} />
      <div className="container px-0.5 pb-10" data-color-mode="light">
        <MDEditor value={value} onChange={setValue} className="!h-full p-5" />
      </div>
    </div>
  );
};

export default Preview;
