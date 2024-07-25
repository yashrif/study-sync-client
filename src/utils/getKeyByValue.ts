export const getKeyByValue = (enumObject: Object, value: string | number) => {
  for (const [key, enumValue] of Object.entries(enumObject)) {
    if (enumValue === value) {
      return key;
    }
  }
  return null;
};
