import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { Status, TTableControl } from "@/types";
import IconButton from "../button/IconButton";
import AddFile from "./AddFile";

type Props = {
  uploadEndpointDb: string | undefined;
  style?: React.CSSProperties;
  setUploadStatus?: Dispatch<SetStateAction<Status>>;
} & TTableControl;

const UploadControl: React.FC<Props> = ({
  Icon,
  order,
  size,
  style,
  title,
  uploadEndpointDb: url,
  variant,
  setUploadStatus,
  ...rest
}) => {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  useEffect(() => {
    setUploadStatus &&
      setUploadStatus(isDropzoneOpen ? Status.PENDING : Status.IDLE);
  }, [isDropzoneOpen, setUploadStatus]);

  return (
    <>
      <IconButton
        title={title || controlBar.upload.title}
        Icon={Icon || controlBar.upload.Icon}
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
