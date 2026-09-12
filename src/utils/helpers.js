export const padZero = (num) => String(num).padStart(2, '0');

export const formatDays = (daysArray) => {
  if (!daysArray || daysArray.length === 0) return 'Today';
  if (daysArray.length === 7) return 'Everyday';
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];
  
  const isWeekdays = weekdays.every(day => daysArray.includes(day)) && daysArray.length === 5;
  const isWeekends = weekends.every(day => daysArray.includes(day)) && daysArray.length === 2;

  if (isWeekdays) return 'Weekdays';
  if (isWeekends) return 'Weekends';
  
  return daysArray.join(', ');
};