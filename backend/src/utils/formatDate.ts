export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateTime = (date: Date): string => {
  return date.toISOString();
};

export const formatTime = (date: Date): string => {
  return date.toISOString().split('T')[1].substring(0, 5);
};

export default {
  formatDate,
  formatDateTime,
  formatTime,
};
