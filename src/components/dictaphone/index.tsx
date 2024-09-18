import dynamic from "next/dynamic";
import { Suspense } from "react";
import "regenerator-runtime/runtime";

import Spinner from "@/components/spinner/Spinner";
import { Props } from "./type";

const Dictaphone = dynamic(() => import("./Dictaphone"), {
  ssr: false,
});

const HomePage: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Dictaphone {...props} />
    </Suspense>
  );
};

export default HomePage;
