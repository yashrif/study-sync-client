import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/uploads";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Dropzone from "@components/dropzone";

type UploadDataProps = {
  data: string;
  url: string;
};

const onFileUpload = ({ data, url }: UploadDataProps) => {
  try {
    const store = async () =>
      studySyncDB
        .post(url, JSON.stringify(JSON.parse(data)))
        .then((res) => res.data);

    store();
  } catch (e) {
    console.log(e);
  }
};

type Props = {
  uploadEndpointDb: string | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddFile: React.FC<Props> = ({
  uploadEndpointDb: url,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>{create.title}</DialogTitle>
          <DialogDescription />
          <div className="max-h-96 overflow-y-scroll pr-2">
            <Dropzone
              name="in_file"
              uploadEndpoint={`${serverEndpoints.api}${serverEndpoints.uploads}`}
              uploadEndpointDb={url}
              onFileUpload={onFileUpload}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFile;
