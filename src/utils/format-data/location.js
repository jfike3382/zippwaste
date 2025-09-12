export default function formatLocation(item, icon = true) {
  const city = item.city ? item.city : "";
  const state = item.state ? item.state : "";

  const location = [city, state].filter(Boolean).join(", ");
  return location ? `${icon ? "📍 " : ""}${location}` : "";
}
