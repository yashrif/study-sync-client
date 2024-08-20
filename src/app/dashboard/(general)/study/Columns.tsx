import { ColumnDef } from '@tanstack/react-table';
import { fileTypeIcons } from '@/assets/data/dashboard/file';
import { routes } from '@/assets/data/routes';
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from '@/components/table/ColumnTools';
import { Column, TableAction } from '@allTypes';
import { StudyActionType, StudyShallow } from '@/types/study';
import { useStudyContext } from '@/hooks/useStudyContext';
import { useRouter } from 'next/navigation';

const useColumnConfig = (): {
  columns: Column<StudyShallow>[];
  actions: TableAction<StudyShallow>[];
} => {
   const { push } = useRouter();

  return {
    columns: [
      {
        type: 'link',
        accessorKey: 'title',
        title: 'Title',
        formatter: (title) => {
          return title as string;
        },
        linkKey: 'id',
        path: routes.dashboard.study,
        Icon(props) {
          return fileTypeIcons({
            key: 'type',
            value: props.value,
          });
        },
        iconClassName() {
          return 'text-primary';
        },
      },
      {
        type: 'no_link',
        accessorKey: 'type',
        title: 'Type',
        formatter: (type) => {
          return type as string;
        },
      },
      {
        type: 'no_link',
        accessorKey: 'createDate',
        title: 'Create Date',
        formatter: (date) => {
          return new Date(date as string).toLocaleDateString();
        },
      },
    ],
    actions: [
      {
        title: 'Study',
        onClick: (data) => push(`/dashboard/study?content=${data?.id}`),
      },
    ],
  };
};

export const useColumns = (): ColumnDef<StudyShallow>[] => {
  const columnHeaders = useColumnConfig().columns.map((column) =>
    ColumnHeader<StudyShallow>({ column })
  );

  return [
    ...columnHeaders,
    {
      ...Actions<StudyShallow>({
        actions: useColumnConfig().actions,
        copyId: false,
      }),
    },
  ];
};
