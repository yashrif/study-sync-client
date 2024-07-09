import { FileTypes } from "@/types";
import {
  IconFileTypePdf,
  IconFileTypeJpg,
  IconFileTypePng,
  IconFileTypeDocx,
  IconFileTypePpt,
  IconFile,
} from "@tabler/icons-react";

export const fileIcons = (type: FileTypes) => {
  switch (type) {
    case FileTypes.PDF:
      return IconFileTypePdf;
    case FileTypes.JPG:
      return IconFileTypeJpg;
    case FileTypes.JPEG:
      return IconFileTypeJpg;
    case FileTypes.PNG:
      return IconFileTypePng;
    case FileTypes.DOC:
      return IconFileTypeDocx;
    case FileTypes.PPT:
      return IconFileTypePpt;
    default:
      return IconFile;
  }
};
