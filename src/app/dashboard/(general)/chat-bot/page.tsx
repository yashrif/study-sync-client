"use client";

import _ from "lodash";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import {
  Commands as ECommands,
  commandsLvl1,
} from "@/assets/data/dashboard/chatBot";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { useFetchDataState } from "@/hooks/fetchData";
import { UploadShallow } from "@/types";

const ChatBotInput = () => {
  const [text, setText] = useState("");
  const [isMainCommandsOpen, setIsMainCommandsOpen] = useState(false);
  const [isSecondaryCommandsOpen, setIsSecondaryCommandsOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] =
    useState<keyof typeof ECommands>();
  const textDivRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  /* ------------------------------ Input overlay ----------------------------- */

  useEffect(() => {
    if (textDivRef.current) {
      textDivRef.current.scrollTop = textDivRef.current.scrollHeight;
      textDivRef.current.scrollLeft = textDivRef.current.scrollWidth;
    }
  }, [text]);

  useEffect(() => {
    if (textareaRef.current && textDivRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      textDivRef.current.scrollTop = textDivRef.current.scrollHeight;
    }
  }, [text]);

  const handleScroll = () => {
    if (textDivRef.current && textareaRef.current) {
      textDivRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="m-40 max-w-lg overflow-hidden relative">
      <div
        ref={textDivRef}
        className="absolute top-0 left-0 p-2 leading-[150%] w-full h-full text-sm overflow-hidden pointer-events-none break-words whitespace-pre-wrap"
      >
        {text.split(" ").map((word, index) => (
          <span
            key={index}
            className={index % 2 === 0 ? "text-red-500" : "text-blue-500"}
          >
            {word}{" "}
          </span>
        ))}
      </div>

      {/* Textarea */}
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value === "/") {
            setIsMainCommandsOpen(true);
            setSelectedCommand(undefined);
          }
        }}
        onScroll={handleScroll}
        className="w-full h-full text-sm caret-primary text-transparent bg-transparent relative no-scrollbar z-10 p-2 leading-[150%] whitespace-pre-wrap"
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
            : "using the books 📕 " + _.find(data.data, ["name", e])?.title) +
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
