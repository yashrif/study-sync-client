import { useState } from "react";

import { navbarButtons } from "@/assets/data/dashboard/uploads";
import AddFile from "./AddFile";
import ControlButton from "./ControlButton";

type Props = {
  uploadEndpointDb: string | undefined;
};

const UploadController: React.FC<Props> = ({ uploadEndpointDb: url }) => {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  return (
    <>
      <ControlButton
        title={navbarButtons.upload.title}
        Icon={navbarButtons.upload.Icon}
        variant={navbarButtons.upload.variant}
        size={navbarButtons.upload.size}
        onClick={() => setIsDropzoneOpen(!isDropzoneOpen)}
      />

      <AddFile
        uploadEndpointDb={url}
        isOpen={isDropzoneOpen}
        setIsOpen={setIsDropzoneOpen}
      />
    </>
  );
};

export default UploadController;
