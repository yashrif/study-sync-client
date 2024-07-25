import { home } from "@/assets/data/dashboard/flashcard";
import PageHeading from "../_components/PageHeading";

const FlashCard: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageHeading
        title={home.saved.title}
        description={home.saved.description}
        Icon={home.saved.Icon}
      />
    </div>
  );
};

export default FlashCard;
