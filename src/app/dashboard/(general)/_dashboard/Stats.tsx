"use client";

import { IconBolt, IconFileUpload } from "@tabler/icons-react";
import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useFetchDataState } from "@/hooks/fetchData";
import { Flashcard, QuizShallow, UploadShallow } from "@/types";
import { Quiz } from "@icons";
import Divider from "./components/Divider";
import Stat from "./components/Stat";
import { Color } from "./type";

const Stats = () => {
  const { state: uploads } = useFetchDataState<null, UploadShallow[]>({
    apiCall: useCallback(
      async () => await studySyncDB.get(dbEndpoints.uploads),
      []
    ),
  });
  const { state: quizzes } = useFetchDataState<null, QuizShallow[]>({
    apiCall: useCallback(
      async () => await studySyncDB.get(dbEndpoints.quizzes),
      []
    ),
  });
  const { state: flashcards } = useFetchDataState<null, Flashcard[]>({
    apiCall: useCallback(
      async () => await studySyncDB.get(dbEndpoints.flashcards),
      []
    ),
  });

  const colors: {
    seaGreen: Color;
    softRed: Color;
    cornFlowerBlue: Color;
  } = {
    seaGreen: {
      text: "#98c38b",
      bg: "#ebf8e7",
      path: "#dfeedb",
    },
    softRed: {
      text: "#f37658",
      bg: "#ffeeea",
      path: "#f4ddd8",
    },
    cornFlowerBlue: {
      text: "#4a90e2",
      bg: "#eaf3ff",
      path: "#d8e4f4",
    },
  };

  const values = {
    uploads: uploads.data
      ? (uploads.data?.filter((upload) => upload.isIndexed).length /
          uploads.data?.length) *
        100
      : 0,
    quizzes: quizzes.data
      ? (quizzes.data.reduce((acc, quiz) => acc + quiz.cqs, 0) /
          quizzes.data.reduce((acc, quiz) => acc + quiz.cqs + quiz.mcqs, 0)) *
        100
      : 0,
    flashcards: flashcards.data
      ? ((flashcards.data.length -
          flashcards.data.filter((flashcard) => flashcard.status === null)
            .length) /
          flashcards.data.length) *
        100
      : 0,
  };

  return (
    <div className="flex gap-x-8 gap-y-8 p-8 justify-evenly rounded-md bg-[#fcf0ce] shadow-sm">
      <Stat
        heading={{ Icon: IconFileUpload, title: "Uploads" }}
        color={colors.seaGreen}
        totalCount={uploads.data?.length || 0}
        countLabel="Files"
        percentage={values.uploads}
        percentageLabel="Indexed"
        supplementaryLabel="Not Indexed"
      />
      <Divider bg="#c69d72" />
      <Stat
        heading={{ Icon: Quiz, title: "Quizzes" }}
        color={colors.softRed}
        totalCount={quizzes.data?.length || 0}
        countLabel="Quizzes"
        percentage={values.quizzes}
        percentageLabel="Cqs"
        supplementaryLabel="Mcqs"
      />
      <Divider bg="#9f839d" />
      <Stat
        heading={{ Icon: IconBolt, title: "Flashcards" }}
        color={colors.cornFlowerBlue}
        totalCount={flashcards.data?.length || 0}
        countLabel="Flashcards"
        percentage={values.flashcards}
        percentageLabel="Reviewed"
        supplementaryLabel="Not Reviewed"
      />
    </div>
  );
};

export default Stats;
