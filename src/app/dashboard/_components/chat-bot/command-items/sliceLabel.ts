const MAX_ITEM_LENGTH = 50;

export const sliceLabel = (label: string) => {
  return label.length > MAX_ITEM_LENGTH
    ? label.slice(0, MAX_ITEM_LENGTH - 3) + "..."
    : label;
};
