export const replace = (
  str: string,
  search: string,
  replace: string,
  mode: "gi" | "i" = "gi"
): string => {
  const regex = new RegExp(search, mode);
  return str.replace(regex, replace);
};

export const findFirstSubstring = (
  mainString: string,
  substrings: string[]
): { substring: string | null; index: number } => {
  let firstIndex = -1;
  let firstSubstring: string | null = null;

  substrings.forEach((substring) => {
    const index = mainString.indexOf(substring);
    if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
      firstIndex = index;
      firstSubstring = substring;
    }
  });

  return { substring: firstSubstring, index: firstIndex };
};
