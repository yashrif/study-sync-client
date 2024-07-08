"use client";

import { useUploads } from "@/hooks/useUploads";
import FileCard from "./FileCard";

const FileList = () => {
  const { uploads, status } = useUploads();

  return (
    <div className="divide-y-2 flex flex-col">
      {uploads.map((upload) => (
        <FileCard key={upload.id} {...upload} />
      ))}
    </div>
  );
};

export default FileList;
