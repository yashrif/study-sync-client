export const dateFormatter = (
  date: Date | string,
  mode: "long" | "numeric" = "long"
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

export const isoLocal = (date: string) => {
  const currentDate = new Date(date);

  return (
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") + // Months are 0-based
    "-" +
    String(currentDate.getDate()).padStart(2, "0") +
    "T" +
    String(currentDate.getHours()).padStart(2, "0") +
    ":" +
    String(currentDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(currentDate.getSeconds()).padStart(2, "0")
  );
};

export const isoLocalMidnight = (date: string | Date) => {
  const currentDate = typeof date === "string" ? new Date(date) : date;

  return (
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentDate.getDate()).padStart(2, "0") +
    "T00:00:00"
  );
};
