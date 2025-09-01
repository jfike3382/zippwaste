import { formatNumber } from "@/utils/format-data/number";

export default function TableRowHead({ itemsTotal, type, sorting }) {
  const formattedTotal = formatNumber(itemsTotal);
  const publishedText =
    sorting === "relevant" ? "Published last 30 days" : "All published";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center py-1">
        <span className="text-brand-gray-800 text-sm font-semibold uppercase">
          {formattedTotal} {type}
        </span>
        {type === "startups" && (
          <span className="text-brand-gray-800 text-sm font-semibold uppercase">
            {publishedText}
          </span>
        )}
      </div>
      <div className="divider" />
    </div>
  );
}
