import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { fileTypeIcons } from '@/assets/data/dashboard/file';
import { Actions, ColumnHeader } from '@/components/table/ColumnTools';
import { Column, TableAction } from '@allTypes';
import { StudyShallow } from '@/types/study';
import { routes } from '@/assets/data/routes';

const useColumnConfig = (): {
  columns: Column<StudyShallow>[];
  actions: TableAction<StudyShallow>[];
} => {
  const { push } = useRouter();

  return {
    columns: [
      {
        type: 'no_link',
        accessorKey: 'title',
        title: 'Title',
        formatter: (title) => {
          return title as string;
        },
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
        onClick: (data) =>
          push(`${routes.dashboard.study}?content=${data?.id}`),
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
