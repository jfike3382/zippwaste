export function formatNumber(number) {
  return Intl.NumberFormat("en-US").format(number);
}

export function formatNumberInput(number) {
  if (!number) return "";
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function unformatNumberInput(formatted) {
  return String(formatted).replace(/,/g, "");
}
