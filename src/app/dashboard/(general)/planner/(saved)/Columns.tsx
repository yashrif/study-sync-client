import {
  IconBook2,
  IconExternalLink,
  IconProgress,
  IconProgressCheck,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { routes } from "@/assets/data/routes";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { usePlannersContext } from "@/hooks/usePlannersContext";
import { cn } from "@/lib/utils";
import {
  Column,
  FetchActionType,
  Icon,
  PlannerShallow,
  TableAction,
} from "@/types";
import { shadeGenerator } from "@/utils/colorGenerator";
import { MAX_TOPICS_PER_ROW } from "@/utils/constants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";

/* ---------------------------- fields and values ---------------------------- */

const useColumnConfig = (): {
  columns: Column<PlannerShallow>[];
  actions: TableAction<PlannerShallow>[];
} => {
  const { push } = useRouter();
  const {
    state: { planners },
    dispatch,
  } = usePlannersContext();

  return {
    columns: [
      {
        type: "link",
        accessorKey: "title",
        title: "Title",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.planner.home,
        Icon() {
          return IconBook2;
        },
        iconClassName() {
          return "text-primary";
        },
      },
      {
        type: "no_link",
        accessorKey: "topics",
        title: "Topics",
        formatter: (topics) => {
          return (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {topics &&
                typeof topics !== "string" &&
                topics.slice(0, MAX_TOPICS_PER_ROW).map((topic) => (
                  <Badge
                    key={topic.id}
                    style={{
                      color: topic.color,
                      backgroundColor: shadeGenerator(topic.color, 20),
                      borderColor: topic.color,
                    }}
                  >
                    {topic.name}
                  </Badge>
                ))}
              {topics &&
                typeof topics !== "string" &&
                topics.length > MAX_TOPICS_PER_ROW && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div>
                        <Badge className="cursor-default">
                          + {topics.length - MAX_TOPICS_PER_ROW}
                        </Badge>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <ul className="list-disc flex flex-col gap-1 justify-between px-4">
                        {topics.slice(MAX_TOPICS_PER_ROW).map((topic) => (
                          <li
                            key={topic.id}
                            className="font-medium"
                            style={{
                              color: topic.color,
                            }}
                          >
                            {topic.name}
                          </li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                )}
            </div>
          );
        },
      },
      {
        type: "no_link",
        accessorKey: "endDate",
        title: "Status",
        formatter: (date) => {
          const Status: React.FC<{
            label: string;
            Icon: Icon;
            iconClassName?: string;
          }> = ({ label, Icon, iconClassName }) => {
            const containerVariants = cva("size-4 stroke-primary");

            return (
              <div className="flex gap-2 items-center whitespace-nowrap">
                <Icon
                  className={cn(
                    containerVariants({ className: iconClassName })
                  )}
                />
                <span>{label}</span>
              </div>
            );
          };

          return date ? (
            <Status
              label="Completed"
              Icon={IconProgressCheck}
              iconClassName="stroke-success"
            />
          ) : (
            <Status label={"In Progress"} Icon={IconProgress} />
          );
        },
      },
      {
        type: "no_link",
        accessorKey: "createDate",
        title: "Create Date",
        formatter: (date) => {
          return new Date(date as string).toLocaleDateString();
        },
      },
    ],
    actions: [
      {
        title: "View",
        Icon: IconExternalLink,
        className: "text-primary",
        onClick: (data) =>
          data ? push(routes.dashboard.planner.details(data.id)) : null,
      },
      {
        title: "Delete",
        Icon: IconTrash,
        className: "text-destructive",
        onClick: async (data) => {
          try {
            await studySyncDB.delete(`${dbEndpoints.planners}/${data?.id}`);
            dispatch({
              type: FetchActionType.FETCH_RESET,
              payload: planners?.filter((planner) => planner.id !== data?.id),
            });
            toast({
              title: "Deleted Successfully!",
              description: `Plan with id: ${data?.id} is successfully deleted.`,
              duration: 5000,
            });
          } catch (err) {
            console.log(err);
            toast({
              title: "Action failed!",
              description: `Failed to delete plan with the id: ${data?.id}.`,
              duration: 5000,
            });
          }
        },
      },
    ],
  };
};

export const useColumns = (): ColumnDef<PlannerShallow>[] => {
  const columnHeaders = useColumnConfig().columns.map((column) =>
    ColumnHeader<PlannerShallow>({ column })
  );

  return [
    {
      ...Checkbox(),
    },
    ...columnHeaders,
    {
      ...Actions<PlannerShallow>({
        actions: useColumnConfig().actions,
      }),
    },
  ];
};
