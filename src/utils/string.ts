export const replaceAll = (
  str: string,
  search: string,
  replace: string
): string => {
  const regex = new RegExp(search, "gi");
  return str.replace(regex, replace);
};
