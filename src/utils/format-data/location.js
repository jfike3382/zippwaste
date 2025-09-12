export default function formatLocation(item, icon = true) {
  const city = item.city ? item.city : "";
  const county = item.county ? item.county : "";
  const country = item.country && item.country !== "—" ? item.country : "";

  const location = [city, county, country].filter(Boolean).join(", ");
  return location ? `${icon ? "📍 " : ""}${location}` : "";
}
