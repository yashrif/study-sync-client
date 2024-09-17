import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, Suspense } from "react";
import "regenerator-runtime/runtime";

import Spinner from "@/components/spinner/Spinner";

const Dictaphone = dynamic(() => import("./Dictaphone"), {
  ssr: false,
});

type Props = {
  className?: string;
  iconPadding?: number;
  setTranscript: Dispatch<SetStateAction<string>>;
};

const HomePage: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Dictaphone {...props} />
    </Suspense>
  );
};

export default HomePage;
