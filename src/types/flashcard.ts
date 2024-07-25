import { Cq } from "@allTypes";

export type Flashcard = Cq;

export enum FlashcardStatus {
  FORGOTTEN = "FORGOTTEN",
  TOOK_A_WHILE_TO_REMEMBER = "TOOK_A_WHILE_TO_REMEMBER",
  REMEMBERED = "REMEMBERED",
}
