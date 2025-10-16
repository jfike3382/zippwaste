"use client";
import { useEffect } from "react";
import { TableProvider, useTable } from "@/providers/table-provider";
import { FiltersProvider, useFilters } from "@/providers/filters-provider";
import Header from "./header";
import Table from "./table";

import FilterComponent from "@/components/filters/filters";

function TableContainer() {
  const { filters, filtersReady } = useFilters();
  const { fetchTable, itemsTotal, expanded, zip_code_requested } = useTable();

  useEffect(() => {
    if (filtersReady) {
      fetchTable(filters);
    }
  }, [filtersReady]);

  useEffect(() => {
    console.log("Expanded state:", expanded);
    console.log("ZIP code requested:", zip_code_requested);
    console.log("Should show message:", expanded && zip_code_requested);
  }, [expanded, zip_code_requested]);

  return (
    <div className="flex flex-row flex-1 ">
      <aside className="sidebar-container">
        <FilterComponent />
      </aside>
      <div className="main-data-right-container">
        <Header itemsTotal={itemsTotal} />
        {expanded && zip_code_requested && (
          <div className="-mt-4 -mb-8 p-4 border border-blue-200 px-3 py-2 bg-blue-50 rounded-xl text-sm items-center w-fit ">
            <span className="text-base mr-1">🧭</span> No results for{" "}
            <span className="font-medium">{zip_code_requested}</span>. Showing
            companies within 30 miles.
          </div>
        )}
        <Table />
      </div>
    </div>
  );
}

export default function TableWrapper({ initialSearch = "" }) {
  return (
    <FiltersProvider initialSearch={initialSearch}>
      <TableProvider>
        <TableContainer />
      </TableProvider>
    </FiltersProvider>
  );
}
