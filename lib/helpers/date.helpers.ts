export const formatDate = (date: string | number) =>
  new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const addDays = (date: string | number, days: number) => {
  const dateValue = new Date(date);
  const newDate = dateValue.setDate(dateValue.getDate() + days);
  return formatDate(newDate);
};
export const minusDays = (date: string | number, days: number) => {
  const dateValue = new Date(date);
  const newDate = dateValue.setDate(dateValue.getDate() - days);
  return formatDate(newDate);
};
