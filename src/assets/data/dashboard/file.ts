import { FileIcon, FileTypes } from "@/types";
import {
  IconCalendarEvent,
  IconFile,
  IconFileFilled,
  IconFileInfo,
  IconFileTypeDocx,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
  IconFileTypePpt,
  IconSitemap,
} from "@tabler/icons-react";

export const fileTypeIcons = (props: FileIcon) => {
  if (props.key === "type")
    switch (props.value.type) {
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
  else
    switch (props.key) {
      case "title":
        return IconSitemap;
      case "name":
        return IconFileFilled;
      case "createDate":
        return IconCalendarEvent;
      default:
        return IconFileInfo;
    }
};
