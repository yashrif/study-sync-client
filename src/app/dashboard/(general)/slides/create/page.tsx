import { home } from "@/assets/data/dashboard/slides";
import PageHeading from "../../../_components/PageHeading";

const CreateSlides = () => {
  return (
    <div className="flex flex-col">
      <PageHeading {...home.create} />
    </div>
  );
};

export default CreateSlides;
