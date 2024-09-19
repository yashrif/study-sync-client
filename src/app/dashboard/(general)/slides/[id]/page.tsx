"use client";

import { useCallback, useRef, useState } from "react";
import Markdown from "react-markdown";
import jsPDF from "jspdf";
// import "jspdf-autotable";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home } from "@/assets/data/dashboard/slides";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { Badge } from "@/components/ui/badge";
import { useFetchDataState } from "@/hooks/fetchData";
import { Status, Slide as TSlide } from "@/types";
import { IconFileTypePdf } from "@tabler/icons-react";

type Props = {
  params: {
    id: string;
  };
};

const Slide: React.FC<Props> = ({ params: { id } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const { state } = useFetchDataState<null, TSlide>({
    apiCall: useCallback(
      () => studySyncDB.get(`${dbEndpoints.slides}/${id}`),
      [id]
    ),
  });

  const handleExport = async () => {
    setLoading(true);

    if (printRef.current) {
      try {
        const doc = new jsPDF("p", "mm", "a4");
        const element = printRef.current;

        if (element) {
          // Extract text from the HTML element
          const text = element.innerText || "";

          // Add the text to the PDF
          doc.text(text, 10, 10);

          // Save the PDF
          doc.save("document.pdf");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeading
        title={state.data?.name || home.saved.title}
        Icon={home.saved.Icon}
        description={state.data?.name ? "" : home.saved.description}
        className="flex flex-col !items-start gap-2"
      >
        {state.data?.uploads && (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {state.data.uploads.map((upload) => (
              <Badge key={upload.id} className="bg-primary text-white">
                <div className="flex gap-1 items-center">
                  <IconFileTypePdf className="size-3 stroke-[2.5px]" />
                  <span className="max-w-[25ch] line-clamp-1">
                    {upload.title}
                  </span>
                </div>
              </Badge>
            ))}
          </div>
        )}
      </PageHeading>

      {state.status === Status.PENDING ? (
        <SpinnerContainer
          containerClassName="h-96"
          spinnerClassName="size-10"
        />
      ) : (
        <div ref={printRef}>
          <Markdown className="markdown-lg">{state.data?.content}</Markdown>
        </div>
      )}
      <button onClick={handleExport} disabled={loading}>
        {loading ? "Generating..." : "Export to PDF"}
      </button>
    </div>
  );
};

export default Slide;
