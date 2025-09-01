"use client";
import { useActionRouter } from "@/utils/use-action-router";
import { useTable } from "@/providers/table-provider";
import { useFilters } from "@/providers/filters-provider";
import Button from "@/components/uikit/button";

const ITEMS_PER_PAGE = 40;

export default function Pagination({
  itemsReceived,
  itemsTotal,
  currentPage = 1,
  onPageChange,
  type = "investors",
}) {
  const { handleAction } = useActionRouter();
  const { fetchTable } = useTable();
  const { updatePage, filters } = useFilters();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const hasNextPage = offset + itemsReceived < itemsTotal;
  const hasPrevPage = currentPage > 1;

  const start = offset + 1;
  const end = offset + itemsReceived;
  const formattedTotal = new Intl.NumberFormat("en-US").format(itemsTotal);

  const handlePrevPage = (e) => {
    if (!handleAction(() => {}, e)) {
      return;
    }
    const newPage = currentPage - 1;
    updatePage(newPage);
    fetchTable({ ...filters, page: newPage });
    onPageChange?.();
  };

  const handleNextPage = (e) => {
    if (!handleAction(() => {}, e)) {
      return;
    }
    const newPage = currentPage + 1;
    updatePage(newPage);
    fetchTable({ ...filters, page: newPage });
    onPageChange?.();
  };

  if (itemsTotal === 0) return null;

  return (
    <div className="flex flex-row gap-2 items-center">
      <Button
        size="icon_s"
        variant="icon"
        icon="left"
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
      />
      <p className="text-brand-gray-800 font-semibold">
        {start}-{end}
      </p>
      <Button
        size="icon_s"
        variant="icon"
        icon="right"
        onClick={handleNextPage}
        disabled={!hasNextPage}
      />
      <span className="text-brand-gray-800 font-semibold">
        of {formattedTotal} {type}
      </span>
    </div>
  );
}
