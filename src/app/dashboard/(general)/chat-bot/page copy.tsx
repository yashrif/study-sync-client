// "use client";

// import { Dispatch, SetStateAction, useCallback, useState } from "react";

// import studySyncDB from "@/api/studySyncDB";
// import { dbEndpoints } from "@/assets/data/api";
// import {
//   Commands as ECommands,
//   commandsLvl1,
// } from "@/assets/data/dashboard/chatBot";
// import {
//   Command,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command-custom";
// import { useFetchDataState } from "@/hooks/fetchData";
// import { UploadShallow } from "@/types";

// const ChatBotInput = () => {
//   const [text, setText] = useState("");
//   const [focusedIndex, setFocusedIndex] = useState(-1);
//   const [selectedCommand, setSelectedCommand] =
//     useState<keyof typeof ECommands>();
//   const [isOpen, setIsOpen] = useState(false);

//   const {
//     state: { data: uploads },
//   } = useFetchDataState<null, UploadShallow[]>({
//     apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
//   });

//   const filteredCommands = commandsLvl1.filter((item) =>
//     item.label.toLowerCase().includes(text.toLowerCase())
//   );

//   const handleKeyDown = (event: {
//     key: string;
//     preventDefault: () => void;
//   }) => {
//     if (event.key === "ArrowDown") {
//       event.preventDefault();
//       setFocusedIndex((prev) => (prev + 1) % filteredCommands.length);
//     } else if (event.key === "ArrowUp") {
//       event.preventDefault();
//       setFocusedIndex(
//         (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
//       );
//     } else if (event.key === "Enter") {
//       if (focusedIndex >= 0 && filteredCommands[focusedIndex]) {
//         setText(
//           filteredCommands[focusedIndex].label +
//             " " +
//             filteredCommands[focusedIndex].next.label
//         );
//         setSelectedCommand(filteredCommands[focusedIndex].next.value);
//         setIsOpen(false);
//       }
//     }
//   };

//   return (
//     <div className="relative">
//       <Command>
//         <CommandInput
//           value={text}
//           renderedText={text}
//           onValueChange={(e) => {
//             setText(e);
//             setFocusedIndex(-1);
//             setIsOpen(true);
//           }}
//           placeholder="Type a command or search..."
//           onKeyDown={handleKeyDown}
//         />
//         <CommandList
//           className="absolute top-full left-0 max-w-60 w-full z-20 bg-white rounded-md animate-in"
//           style={{
//             visibility: text.startsWith("/") && isOpen ? "visible" : "hidden",
//           }}
//         >
//           <CommandGroup>
//             {filteredCommands.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   setText(item.label + " " + item.next.label);
//                   setSelectedCommand(item.next.value);
//                   setIsOpen(false);
//                 }}
//               >
//                 <CommandItem
//                   className={`cursor-pointer text-muted-foreground ${
//                     focusedIndex === index
//                       ? "bg-accent text-accent-foreground"
//                       : "data-[selected='true']:bg-transparent data-[selected=true]:text-muted-foreground"
//                   }`}
//                   onMouseEnter={() => {
//                     setFocusedIndex(index);
//                   }}
//                 >
//                   {item.label}
//                 </CommandItem>
//               </div>
//             ))}
//           </CommandGroup>
//         </CommandList>

//         <Commands
//           command={selectedCommand}
//           data={uploads || []}
//           focusedIndex={focusedIndex}
//           setFocusedIndex={setFocusedIndex}
//         />
//       </Command>
//     </div>
//   );
// };

// export default ChatBotInput;

// type CommandsProps = {
//   command: keyof typeof ECommands | undefined;
//   data: UploadShallow[];
//   focusedIndex: number;
//   setFocusedIndex: Dispatch<SetStateAction<number>>;
// };

// const Commands: React.FC<CommandsProps> = (data) => {
//   switch (data.command) {
//     case ECommands["select file"]:
//       console.log(data.data);
//       return (
//         <UploadSelector
//           data={data.data}
//           focusedIndex={data.focusedIndex}
//           setFocusedIndex={data.setFocusedIndex}
//         />
//       );
//     default:
//       return null;
//   }
// };

// /* --------------------------------- Uploads -------------------------------- */

// type UploadSelectorProps = {
//   data: UploadShallow[];
//   focusedIndex: number;
//   setFocusedIndex: Dispatch<SetStateAction<number>>;
// };

// const UploadSelector: React.FC<UploadSelectorProps> = ({
//   data: uploads,
//   focusedIndex,
//   setFocusedIndex,
// }) => (
//   <CommandList
//     className="absolute top-full left-0 max-w-60 w-full z-30 bg-white rounded-md animate-in"
//     // style={{
//     //   visibility: uploads && uploads?.length > 0 ? "visible" : "hidden",
//     // }}
//   >
//     <CommandGroup>
//       {uploads &&
//         uploads.map((item, index) => (
//           <div
//             key={index}
//             // onClick={() => {
//             //   setText(item.title);
//             //   setSelectedCommand(item.name);
//             // }}
//           >
//             <CommandItem
//               className={`cursor-pointer text-muted-foreground ${
//                 focusedIndex === index
//                   ? "bg-accent text-accent-foreground"
//                   : "data-[selected='true']:bg-transparent data-[selected=true]:text-muted-foreground"
//               }`}
//               onMouseEnter={() => {
//                 setFocusedIndex(index);
//               }}
//             >
//               {item.title}
//             </CommandItem>
//           </div>
//         ))}
//     </CommandGroup>
//   </CommandList>
// );
