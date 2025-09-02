import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import TableRow from "./uikit/table-row";
import TableEmptyState from "./uikit/empty-state";
import Pagination from "./uikit/pagination";

export default function Table() {
  const { currentPage } = useFilters();
  const { isInitial, items, itemsTotal, loading } = useTable();

  return (
    <div
      className={`flex flex-col gap-8 transition-opacity duration-300 ${
        loading ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="flex flex-col gap-6">
        {isInitial && items.length === 0 ? (
          <TableEmptyState />
        ) : (
          items?.map((item, index) => (
            <TableRow key={item.slug || index} item={item} />
          ))
        )}
      </div>
      <Pagination
        itemsReceived={items.length}
        itemsTotal={itemsTotal}
        currentPage={currentPage}
      />
    </div>
  );
}
