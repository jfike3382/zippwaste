export const formatDate = (timestamp) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
