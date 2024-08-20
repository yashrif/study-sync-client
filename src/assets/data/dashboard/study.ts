import { IconBook } from "@tabler/icons-react";

import { IconList } from "@allTypes";

export const home: IconList = {
  title: "Study",
  Icon: IconBook,
  description: "Open a file to start AI assisted study now!",
};

export const create = {
  title: "Add your file",
  description: "Drag and drop your files here to start uploading.",
};

export const search = {
  key: "title",
  placeholder: "Search by title",
};

export const actions: any[] = [
  {
    name: 'Explain',
    instruction: 'Explain the text below given context:\n\n'
  },
  {
    name: 'Summarize',
    instruction: 'Summarize the text below given context:\n\n'
  },
  {
    name: 'Example',
    instruction: 'Give Example, similar to the text below given context:\n\n'
  }
]