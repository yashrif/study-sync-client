import { useState } from "react";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { ButtonVariant } from "@/types";
import AddFile from "./AddFile";
import ControlButton from "./ControlButton";

type Props = {
  uploadEndpointDb: string | undefined;
  style?: React.CSSProperties;
  variant?: ButtonVariant;
};

const UploadController: React.FC<Props> = ({
  uploadEndpointDb: url,
  style,
  variant = controlBar.upload.variant,
}) => {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  return (
    <>
      <ControlButton
        title={controlBar.upload.title}
        Icon={controlBar.upload.Icon}
        variant={variant}
        size={controlBar.upload.size}
        onClick={() => setIsDropzoneOpen(!isDropzoneOpen)}
        style={style}
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
