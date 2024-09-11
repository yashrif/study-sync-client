"use client";

import { pdf, PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import { quizDetails } from "@/assets/data/dashboard/quiz";
import IconButton from "@/components/button/IconButton";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useQuizContext } from "@/hooks/useQuizContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import Heading from "../../../_components/Heading";
import QuizDocument from "./QuizDocument";

const PdfViewer: React.FC = () => {
  const {
    state: { quiz },
  } = useQuizContext();

  const downloadPdf = async () => {
    const fileName = `${quiz.title}.pdf`;
    const blob = await pdf(<QuizDocument quiz={quiz} />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <Heading {...quizDetails.utils} collapsible size="sm">
      <Dialog>
        <DialogTrigger asChild>
          <IconButton
            variant={"outline"}
            size={"lg"}
            iconClassName="stroke-2"
            {...quizDetails.utils.buttons.export}
          />
        </DialogTrigger>
        <DialogContent className="max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Export quiz</DialogTitle>
            <DialogDescription>
              Export the quiz as a PDF file. This will include all the questions
              and answers.
            </DialogDescription>
          </DialogHeader>
          <PDFViewer width={"100%"} height={"320px"}>
            <QuizDocument quiz={quiz} />
          </PDFViewer>
          <DialogFooter>
            <Button onClick={downloadPdf}>
              {quizDetails.utils.buttons.export.title}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Heading>
  );
};

export default PdfViewer;
