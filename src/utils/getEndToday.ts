export const getEndToday = (): Date => {
  const today = new Date();
  const endDay = new Date(today.setHours(23, 59, 59, 999));
  return endDay;
};
