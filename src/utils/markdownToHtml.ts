import { marked } from 'marked';

export const convertMarkdownToHtml = (markdown: string): string => {
  return marked(markdown);
};
