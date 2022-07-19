const generateDate = () => {
  const date = new Date();
  return date.toString();
};

export const getClientDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    hours: date.getHours().toString().padStart(2, '0'),
    minutes: date.getMinutes().toString().padStart(2, '0'),
    weekDay: `${date.getDay()}`,
    month: `${date.getMonth() + 1}`,
    year: `${date.getFullYear()}`,
  };
};

export default generateDate;
