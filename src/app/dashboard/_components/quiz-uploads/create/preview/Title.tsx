
import { preview } from "@/assets/data/dashboard/quiz";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { QuizUploadsActionType } from "@/types";
import { Input } from "@components/ui/input";

const Title: React.FC = () => {
  const {
    state: { quiz },
    dispatch,
  } = useQuizUploadsContext();

  return quiz ? (
    <Input
      type={preview.fields.title.type}
      id={preview.fields.title.id}
      placeholder={preview.fields.title.placeholder}
      required={preview.fields.title.required}
      dimension={"sm"}
      Icon={preview.fields.title.Icon}
      value={quiz?.title}
      onChange={(e) => {
        dispatch({
          type: QuizUploadsActionType.SET_QUIZ,
          payload: { ...quiz, title: e.target.value },
        });
      }}
      className="min-w-[320px] w-full rounded-sm border-primary placeholder:text-muted-foreground/70"
    />
  ) : null;
};

export default Title;
