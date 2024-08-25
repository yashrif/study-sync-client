"use client";

import { IconCalendarFilled, IconMail, IconUser } from "@tabler/icons-react";
import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchDataState } from "@/hooks/fetchData";
import { dateFormatter } from "@/utils/dateFormatter";
import { User } from "@allTypes";
import Avatar from "../../../../components/Avatar";
import StatsHeading from "./components/StatsHeading";

const UserInfo = () => {
  const { state } = useFetchDataState<null, User>({
    apiCall: useCallback(
      async () => await studySyncDB.get(dbEndpoints.users),
      []
    ),
  });

  return (
    <div className="min-w-[280px] w-auto flex flex-col items-center p-8 rounded-md bg-primary/15 shadow-sm">
      <StatsHeading
        Icon={IconUser}
        title="User"
        className="mb-4"
        style={{
          color: "hsl(var(--primary))",
        }}
      />
      <Avatar size="xl" isRandomColor className="mb-4">
        {state.data?.firstName} {state.data?.lastName}
      </Avatar>
      <div className="flex flex-col gap-2.5 items-center">
        {state.data?.role ? (
          <Badge>{state.data?.role}</Badge>
        ) : (
          <Skeleton className="w-16 h-[21.6px]" />
        )}
        {state.data?.firstName ? (
          <h3 className="text-primary">
            {state.data?.firstName} {state.data?.lastName}
          </h3>
        ) : (
          <Skeleton className="w-36 h-[28.8px] mb-2" />
        )}
        <div className="flex flex-col gap-1 items-center">
          {state.data?.email ? (
            <div className="flex gap-1.5 items-center">
              <IconMail className="size-4 stroke-muted-foreground" />
              <p className="text-[15px] text-muted-foreground">
                {state.data?.email}
              </p>
            </div>
          ) : (
            <Skeleton className="w-52 h-4 mb-2" />
          )}
          {state.data?.createDate ? (
            <div className="flex gap-1.5 items-center">
              <IconCalendarFilled className="size-4 text-muted-foreground" />
              <p className="text-[15px] text-muted-foreground">
                Joined - {dateFormatter(state.data?.createDate ?? "")}
              </p>
            </div>
          ) : (
            <Skeleton className="w-52 h-4 mb-2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
