import { Dispatch, SetStateAction } from "react";

export type Props = {
  className?: string;
  iconPadding?: number;
  setTranscript: Dispatch<SetStateAction<string>>;
};
