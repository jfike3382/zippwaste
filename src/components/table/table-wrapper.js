"use client";
import { useEffect } from "react";
import { TableProvider, useTable } from "@/providers/table-provider";
import { FiltersProvider, useFilters } from "@/providers/filters-provider";

import FilterComponent from "@/components/filters/filters";

function Table() {
  const { filters, filtersReady } = useFilters();
  const { fetchTable } = useTable();

  useEffect(() => {
    if (filtersReady) {
      fetchTable(filters);
    }
  }, [filtersReady]);

  return (
    <div className="flex flex-row">
      <FilterComponent />
      <div>Data will be Here</div>
    </div>
  );
}

export default function TableWrapper() {
  return (
    <FiltersProvider>
      <TableProvider>
        <Table />
      </TableProvider>
    </FiltersProvider>
  );
}
