import React from "react";
import Spinner from "./Spinner";

type Props = {
  height?: number;
  width?: number;
  className?: string;
};

const SpinnerContainer: React.FC<Props> = ({ className, height, width }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: height || "100%",
        width: width || "100%",
      }}
    >
      <Spinner className={className} />
    </div>
  );
};

export default SpinnerContainer;
