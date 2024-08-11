export const compareIsoDates = (isoString1: string, isoString2: string) => {
  const date1 = new Date(isoString1);
  const date2 = new Date(isoString2);

  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};
