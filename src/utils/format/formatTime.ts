const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours ? hours : 12;

  return hours + ":" + (minutes < 10 ? `0${minutes}` : minutes);
};

export { formatTime };
