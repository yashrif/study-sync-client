import dynamic from "next/dynamic";
import { Suspense } from "react";
import "regenerator-runtime/runtime";

import Spinner from "@/components/spinner/Spinner";

const Dictaphone = dynamic(() => import("./Dictaphone"), {
  ssr: false,
});

type Props = {
  setTranscript: (transcript: string) => void;
};

const HomePage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Dictaphone />
    </Suspense>
  );
};

export default HomePage;
