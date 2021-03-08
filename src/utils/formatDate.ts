export const formatDate = (date: number): string => {
  const obj = new Date(date);
  return obj.toLocaleDateString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
