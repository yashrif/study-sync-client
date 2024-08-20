'use client';
import { useEffect, useRef } from 'react';

import { useStudyContext } from '@/hooks/useStudyContext';
import { StudyActionType } from '@/types/study';
import { api, downloadFile } from '@/assets/data/api/ai';
import ChatResponse from './ChatResponse';
import ChatAI from './ChatAI';

export default function PDFViewer() {
  const {
    state: { currentStudy, showChatResponse },
    dispatch,
  } = useStudyContext();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== 'undefined') {
      import('pspdfkit').then(async (PSPDFKit) => {
        if (PSPDFKit) {
          // @ts-ignore
          PSPDFKit.unload(container);
        }
        // @ts-ignore
        const instance = await PSPDFKit.load({
          container,
          document: `${api}${downloadFile}?uuidFileName=${currentStudy}.pdf`,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });

        // @ts-ignore
        instance.addEventListener('textSelection.change', (textSelection) => {
          if (textSelection)
            textSelection.getText().then((text: any) => {
              dispatch({
                type: StudyActionType.SET_SELECTED_TEXT,
                payload: text,
              });
            });
          else
            dispatch({
              type: StudyActionType.SET_SELECTED_TEXT,
              payload: '',
            });
        });
      });
    }
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className='h-screen w-full absolute top-0 right-0'></div>
      <div className='absolute bottom-0 left-0 right-0  z-10 flex justify-center'>
        {showChatResponse ? <ChatResponse /> : <ChatAI />}
      </div>
    </>
  );
}
