import { Conversation } from "@/types";
import { replace } from "@/utils/string";

const usePromptConversation = () => {
  const prompt = (text: string, highlight?: string): Conversation => ({
    type: "prompt",
    data: highlight ? (
      <p className="text-sm">
        <span className="text-white rounded-[7px] bg-primary px-1">
          {highlight}
        </span>{" "}
        {replace(text, highlight, "")}
      </p>
    ) : (
      <p className="text-sm">{text}</p>
    ),
  });

  const noText = (): Conversation => ({
    type: "response",
    data: <p className="text-sm">No text provided.</p>,
  });

  return {
    prompt,
    noText,
  };
};

export default usePromptConversation;
