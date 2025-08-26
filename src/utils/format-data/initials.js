

export default function getInitials(name) {
  if (!name) return "";

  if (typeof name === "string") {
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return "";
}
