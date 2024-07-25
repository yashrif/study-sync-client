import { useEffect, useState } from "react";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { TTableControl } from "@/types";
import IconButton from "../button/IconButton";
import AddFile from "./AddFile";

type Props = {
  uploadEndpointDb: string | undefined;
  style?: React.CSSProperties;
  onUpload?: () => void;
} & TTableControl;

const UploadControl: React.FC<Props> = ({
  Icon,
  order,
  size,
  style,
  title,
  uploadEndpointDb: url,
  variant,
  onUpload,
  ...rest
}) => {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  useEffect(() => {
    if (!isDropzoneOpen && onUpload) onUpload();
  }, [isDropzoneOpen, onUpload]);

  return (
    <>
      <IconButton
        title={title || controlBar.upload.title}
        Icon={Icon || controlBar.upload.Icon}
        iconClassName="stroke-[2.5]"
        variant={variant || controlBar.upload.variant}
        size={size || controlBar.upload.size}
        onClick={() => setIsDropzoneOpen(!isDropzoneOpen)}
        style={{ ...style, order }}
        {...rest}
      />

      <AddFile
        uploadEndpointDb={url}
        isOpen={isDropzoneOpen}
        setIsOpen={setIsDropzoneOpen}
      />
    </>
  );
};

export default UploadControl;
