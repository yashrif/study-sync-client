export const dateFormatter = (
  date: Date | string,
  mode: "long" | "numeric" = "long",
) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: mode === "long" ? "long" : "numeric",
    day: mode === "long" ? "numeric" : "2-digit",
  });

export const dateTimeFormatter = (date: string | Date) => {
  return `${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "GMT",
    hour12: true,
  }).format(new Date(date))}, ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(new Date(date))}`;
};
