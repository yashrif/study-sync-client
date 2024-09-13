"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import {
  Commands as ECommands,
  commandsLvl1,
} from "@/assets/data/dashboard/chatBot";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom";
import { useFetchDataState } from "@/hooks/fetchData";
import { UploadShallow } from "@/types";
import _ from "lodash";

const ChatBotInput = () => {
  const [text, setText] = useState("");
  const [isMainCommandsOpen, setIsMainCommandsOpen] = useState(false);
  const [isSecondaryCommandsOpen, setIsSecondaryCommandsOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] =
    useState<keyof typeof ECommands>();

  const filteredCommands = useMemo(
    () =>
      commandsLvl1.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      ),
    [text]
  );

  const {
    state: { data: uploads },
  } = useFetchDataState<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
  });

  useEffect(() => {
    if (selectedCommand) setIsSecondaryCommandsOpen(true);
  }, [selectedCommand]);

  return (
    <div className="m-40 relative">
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value === "/") setIsMainCommandsOpen(true);
        }}
        className="max-w-lg"
      />

      <SelectContainer
        isOpen={isMainCommandsOpen}
        setIsOpen={setIsMainCommandsOpen}
        setText={setText}
        data={{ type: "commands", data: filteredCommands }}
        setCommand={setSelectedCommand}
      />

      <Commands
        isOpen={isSecondaryCommandsOpen}
        setIsOpen={setIsSecondaryCommandsOpen}
        setText={setText}
        data={{ type: "uploads", data: uploads || [] }}
        command={selectedCommand}
        setCommand={setSelectedCommand}
      />
    </div>
  );
};

export default ChatBotInput;

type Data =
  | { type: "commands"; data: typeof commandsLvl1 }
  | { type: "uploads"; data: UploadShallow[] };

/* ---------------------------- Select Component ---------------------------- */

type SelectContainerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setText: Dispatch<SetStateAction<string>>;
  data: Data;
  setCommand: Dispatch<SetStateAction<keyof typeof ECommands | undefined>>;
};

const SelectContainer: React.FC<SelectContainerProps> = ({
  isOpen,
  setIsOpen,
  setText,
  data,
  setCommand,
}) => (
  <Select
    defaultOpen
    open={isOpen}
    onOpenChange={setIsOpen}
    onValueChange={(e) => {
      setCommand(e as keyof typeof ECommands);
      setText(
        (prev) =>
          prev +
          (data.type === "commands"
            ? _.find(data.data, ["value", e])?.label.slice(1)
            : _.find(data.data, ["name", e])?.title) +
          " "
      );
    }}
  >
    <SelectTrigger className="invisible absolute top-0 left-0 max-w-60 w-full z-10 rounded-md animate-in">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {data.data.map((item) => (
          <SelectItem
            key={
              data.type === "commands"
                ? (item as (typeof commandsLvl1)[0]).value
                : (item as UploadShallow).name
            }
            value={
              data.type === "commands"
                ? (item as (typeof commandsLvl1)[0]).value
                : (item as UploadShallow).name
            }
            className="text-xs text-muted-foreground px-3"
          >
            {data.type === "commands"
              ? (item as (typeof commandsLvl1)[0]).label
              : (item as UploadShallow).title}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

/* -------------------------------- Commands -------------------------------- */

type CommandsProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setText: Dispatch<SetStateAction<string>>;
  data: Data;
  command: keyof typeof ECommands | undefined;
  setCommand: Dispatch<SetStateAction<keyof typeof ECommands | undefined>>;
};

const Commands: React.FC<CommandsProps> = (data) => {
  console.log(data.command);
  switch (data.command) {
    case ECommands["create-quiz"]:
      return (
        <SelectContainer
          isOpen={data.isOpen}
          setIsOpen={data.setIsOpen}
          setText={data.setText}
          data={data.data}
          setCommand={data.setCommand}
        />
      );
    default:
      return null;
  }
};
