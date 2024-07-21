"use client";

import { home } from "@/assets/data/dashboard/flashcard";
import PageHeading from "../_components/PageHeading";
import { useFetchDataState } from "@/hooks/fetchData";
import { dbEndpoints } from "@/assets/data/api";

const FlashCard: React.FC = () => {
  const {
    state: { data, status },
  } = useFetchDataState(dbEndpoints.flashcards);

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
