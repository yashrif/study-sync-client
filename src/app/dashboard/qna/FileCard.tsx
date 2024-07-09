import { fileIcons } from "@/assets/data/dashboard/file";
import { FileTypes, UploadSimple } from "@/types";

const FileCard: React.FC<UploadSimple> = ({
  id,
  title,
  name,
  type,
  createDate,
}) => {
  const Icon = fileIcons(type as FileTypes);

  return (
    <div className="px-12">
      <p>{title}</p>
      <div className="flex items-center space-x-1 text-text-200">
        <Icon className="h-4 w-4" />
        {name}
      </div>
    </div>
  );
};

export default FileCard;
