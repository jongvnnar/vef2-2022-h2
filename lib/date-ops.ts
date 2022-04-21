export const getDateFromAPI = (date: string): Date => {
  const retVal = new Date(date);
  return retVal;
};

export const formatDateString = (datestring: string): string => {
  const date = getDateFromAPI(datestring);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getFullYear()}  ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} `;
};
