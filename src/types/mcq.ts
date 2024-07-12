export type MCQRequest = {
  question: string;
  choices: string | number[];
  answers: boolean[];
};
