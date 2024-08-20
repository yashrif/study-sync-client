'use client';
import { Suspense, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import studySyncDB from '@/api/studySyncDB';
import { dbEndpoints } from '@/assets/data/api';
import { home, search } from '@/assets/data/dashboard/study';
import Spinner from '@/components/spinner/Spinner';
import DataTable from '@/components/table';
import { useFetchData } from '@/hooks/fetchData';
import { useTable } from '@/hooks/useTable';
import { Status, TableControlTypes } from '@/types';
import PageHeading from '../../_components/PageHeading';
import { useColumns } from './Columns';
import { StudyActionType, StudyShallow } from '@/types/study';
import { useStudyContext } from '@/hooks/useStudyContext';
import PDFViewer from './_components/PDFViewer';

const Study: React.FC = () => {
  const {
    state: { uploads, status, currentStudy },
    dispatch,
  } = useStudyContext();
  const serachParams = useSearchParams();
  useFetchData<null, StudyShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const columns = useColumns();
  const { table } = useTable({
    data: uploads || [],
    columns: useColumns(),
  });
  
  useEffect(() => {
    const content = serachParams.get('content');
    dispatch({
      type: StudyActionType.SET_STUDY,
      payload: content || '',
    });
  }, [dispatch, serachParams]);

  return currentStudy ? (
    <Suspense fallback={<Spinner />}>
      <PDFViewer />
    </Suspense>
  ) : (
    <div className='flex flex-col'>
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <Suspense fallback={<Spinner />}>
        <DataTable
          table={table}
          columns={columns}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={undefined}
          controlsConfig={{
            [TableControlTypes.STUDY]: {
              hidden: false,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default Study;
