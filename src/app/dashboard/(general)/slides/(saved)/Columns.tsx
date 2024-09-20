import { IconFileTypePdf } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";

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
import { useSlidesContext } from "@/hooks/useSlidesContext";
import { shadeGenerator } from "@/utils/colorGenerator";
import {
  Column,
  SlidesActionType,
  SlideShallow,
  TableAction,
  UploadShallow,
} from "@allTypes";

const useColumnConfig = (): {
  columns: Column<SlideShallow>[];
  actions: TableAction<SlideShallow>[];
} => {
  const { push } = useRouter();
  const {
    state: { slides },
    dispatch,
  } = useSlidesContext();

  return {
    columns: [
      {
        type: "link",
        accessorKey: "name",
        title: "Name",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.slides.home,
      },
      {
        type: "no_link",
        accessorKey: "topics",
        title: "Topics",
        formatter: (topics) => {
          return (
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {(topics as string[])?.map((topic, index) => {
                const color = randomColor({ luminosity: "bright" });

                return (
                  <Badge
                    key={index}
                    className="max-w-[20ch] line-clamp-1"
                    style={{
                      color: color,
                      backgroundColor: shadeGenerator(color, 20),
                      borderColor: color,
                    }}
                  >
                    {topic}{" "}
                  </Badge>
                );
              })}
            </div>
          );
        },
      },
      {
        type: "no_link",
        accessorKey: "uploads",
        title: "Files",
        formatter: (uploads) => {
          return (
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {(uploads as UploadShallow[]).map((upload) => (
                <Badge key={upload.id} className="bg-primary text-white">
                  <div className="flex gap-1 items-center">
                    <IconFileTypePdf className="size-3 stroke-[2.5px]" />
                    <span className="max-w-[20ch] line-clamp-1">
                      {upload.title}
                    </span>
                  </div>
                </Badge>
              ))}
            </div>
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
        onClick: (data) =>
          data ? push(routes.dashboard.slides.details(data.id)) : null,
      },
      {
        title: "Delete",
        onClick: async (data) => {
          try {
            await studySyncDB.delete(`${dbEndpoints.slides}/${data?.id}`);
            dispatch({
              type: SlidesActionType.SET_SLIDES,
              payload: slides?.filter((slide) => slide.id !== data?.id),
            });
            toast({
              title: "Deleted Successfully!",
              description: `Slide with id: ${data?.id} is successfully deleted.`,
              duration: 5000,
            });
          } catch (err) {
            console.log(err);
            toast({
              title: "Action failed!",
              description: `Failed to delete slide with the id: ${data?.id}.`,
              duration: 5000,
            });
          }
        },
      },
    ],
  };
};

export const useColumns = (): ColumnDef<SlideShallow>[] => {
  const columnHeaders = useColumnConfig().columns.map((column) =>
    ColumnHeader<SlideShallow>({ column })
  );

  return [
    {
      ...Checkbox(),
    },
    ...columnHeaders,
    {
      ...Actions<SlideShallow>({
        actions: useColumnConfig().actions,
        copyId: true,
      }),
    },
  ];
};
