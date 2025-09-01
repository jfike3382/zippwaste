"use client";
import { useEffect } from "react";
import { TableProvider, useTable } from "@/providers/table-provider";
import { FiltersProvider, useFilters } from "@/providers/filters-provider";

import SideBar from "@/components/global-elements/side-bar";
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
    <>
      <SideBar position="left">
        <FilterComponent />
      </SideBar>
      Data will be Here
    </>
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
