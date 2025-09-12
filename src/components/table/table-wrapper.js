"use client";
import { useEffect } from "react";
import { TableProvider, useTable } from "@/providers/table-provider";
import { FiltersProvider, useFilters } from "@/providers/filters-provider";
import Header from "./header";
import Table from "./table";

import FilterComponent from "@/components/filters/filters";

function TableContainer() {
  const { filters, filtersReady } = useFilters();
  const { fetchTable, itemsTotal } = useTable();

  useEffect(() => {
    if (filtersReady) {
      fetchTable(filters);
    }
  }, [filtersReady]);

  return (
    <div className="flex flex-row flex-1">
      <div className=" filter-container">
        <FilterComponent />
      </div>
      <div className="main-data-container">
        <Header itemsTotal={itemsTotal} />
        <Table />
      </div>
    </div>
  );
}

export default function TableWrapper() {
  return (
    <FiltersProvider>
      <TableProvider>
        <TableContainer />
      </TableProvider>
    </FiltersProvider>
  );
}
