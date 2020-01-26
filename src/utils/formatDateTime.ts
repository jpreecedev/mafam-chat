const formatDateTime = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
};

export { formatDateTime };
