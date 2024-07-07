"use client";

import { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { Suspense, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import Spinner from "@/components/Spinner";
import "./dropzone.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  name: string;
  uploadEndpoint: string;
  uploadEndpointDb: string | undefined;
  onFileUpload?: ({ data, url }: { data: string; url: string }) => void;
  className?: string;
};

const Dropzone: React.FC<Props> = ({
  name,
  uploadEndpoint,
  uploadEndpointDb = undefined,
  onFileUpload,
  className,
}) => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  return (
    <Suspense fallback={<Spinner />}>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-auth-bg rounded-md"></div>
        <FilePond
          files={files.map((file) => file.file)}
          onupdatefiles={setFiles}
          allowReorder={true}
          allowMultiple={true}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          styleButtonRemoveItemPosition="right"
          server={{
            process: {
              url: uploadEndpoint,
              onload: (data) => {
                if (uploadEndpointDb && onFileUpload)
                  onFileUpload({
                    data: data,
                    url: uploadEndpointDb,
                  });

                return data;
              },
            },
          }}
          name={name}
          className={`bg-white bg-opacity-[0.8] backdrop-blur-lg backdrop-saturate-[180%] ${className}`}
        />
      </div>
    </Suspense>
  );
};

export default Dropzone;
