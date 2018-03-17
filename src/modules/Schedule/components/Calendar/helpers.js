export const padLeft = (number, padding) => (
  padding.substring(number.toString().length) + number
);

export const toTimeString = (hours, minutes) => (
	`${padLeft(hours, '00')}:${padLeft(minutes, '00')}`
);

export const startOfWeek = (date) => {
	const clone = new Date(date);
  const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  clone.setDate(diff);
  
  return clone;
};

export const addDays = (date, days) => {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  
  return clone;
};