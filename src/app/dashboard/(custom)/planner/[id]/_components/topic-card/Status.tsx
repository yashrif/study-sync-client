import { TopicStatus } from "@/types";
import {
  IconStack2Filled,
  IconStack3Filled,
  IconStackFilled,
} from "@tabler/icons-react";

type Props = {
  status: TopicStatus;
};

const Status: React.FC<Props> = ({ status }) => {
  const statusContent = () => {
    switch (status) {
      case TopicStatus.WEAK:
        return (
          <>
            <IconStackFilled className="size-4 text-destructive/70" />
            <span className="font-medium text-destructive/70 capitalize">
              {TopicStatus.WEAK.toLocaleLowerCase()}
            </span>
          </>
        );
      case TopicStatus.MODERATE:
        return (
          <>
            <IconStack2Filled className="size-4 text-yellow-600/70" />
            <span className="font-medium text-yellow-600/70 capitalize">
              {TopicStatus.MODERATE.toLocaleLowerCase()}
            </span>
          </>
        );
      case TopicStatus.CONFIDENT:
        return (
          <>
            <IconStack3Filled className="size-4 text-success/70" />
            <span className="font-medium text-success/70 capitalize">
              {TopicStatus.CONFIDENT.toLocaleLowerCase()}
            </span>
          </>
        );
    }
  };

  return <div className="flex gap-1.5 items-center">{statusContent()}</div>;
};

export default Status;
