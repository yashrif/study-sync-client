"use client";

import { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { Suspense, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import Spinner from "@/components/Spinner";
import "./dropzone.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Dropzone: React.FC = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  return (
    <Suspense fallback={<Spinner />}>
      <FilePond
        files={files.map((file) => file.file)}
        onupdatefiles={setFiles}
        allowReorder={true}
        allowMultiple={true}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        styleButtonRemoveItemPosition="right"
        server={{
          process: {
            url: `${serverEndpoints.api}${serverEndpoints.uploads}`,
            onload: (data) => {
              try {
                const store = async () =>
                  studySyncDB
                    .post(dbEndpoints.uploads, JSON.stringify(JSON.parse(data).data))
                    .then((res) => res.data);

                const response = store();

                console.log(response);
              } catch (e) {
                console.log(e);
              }

              return data;
            },
          },
        }}
        name="in_file"

      />
    </Suspense>
  );
};

export default Dropzone;
