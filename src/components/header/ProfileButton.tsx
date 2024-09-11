"use client";

import { IconLayoutGrid, IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { pathTitles, routes } from "@/assets/data/routes";
import { useFetchDataState } from "@/hooks/fetchData";
import { User } from "@/types";
import { removeTokens } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Avatar from "../Avatar";

const ProfileButton: React.FC<{
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAuthenticated }) => {
  const { push } = useRouter();

  const { state } = useFetchDataState<null, User>({
    apiCall: useCallback(async () => studySyncDB.get(dbEndpoints.users), []),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar size="lg">
          {`${state.data?.firstName} ${state.data?.lastName}`}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[120px] w-full">
        <DropdownMenuLabel className="text-primary">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex gap-1.5 items-center"
          onClick={() => {
            push(routes.dashboard.home);
          }}
        >
          <IconLayoutGrid className="size-4" />
          <span>{pathTitles.dashboard}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-1.5 items-center"
          onClick={() => {
            removeTokens();
            setIsAuthenticated(false);
          }}
        >
          <IconLogout2 className="size-4" />
          <span>{pathTitles.signOut}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
