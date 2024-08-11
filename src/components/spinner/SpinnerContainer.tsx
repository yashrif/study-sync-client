import React from "react";
import Spinner from "./Spinner";

type Props = {
  containerClassName?: string;
  spinnerClassName?: string;
};

const SpinnerContainer: React.FC<Props> = ({
  containerClassName,
  spinnerClassName,
}) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${containerClassName}`}
    >
      <Spinner className={spinnerClassName} />
    </div>
  );
};

export default SpinnerContainer;
