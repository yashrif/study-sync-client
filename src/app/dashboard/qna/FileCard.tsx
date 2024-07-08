import { UploadSimple } from "@/types";

const FileCard: React.FC<UploadSimple> = ({ id, name, type, createDate }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{type}</p>
    </div>
  );
};

export default FileCard;
