"use client";
import { useEffect } from "react";
import { TableProvider } from "@/providers/table-provider";
import { FiltersProvider } from "@/providers/filters-provider";
import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";

import SideBar from "@/components/global-elements/side-bar";
import FilterComponent from "@/components/filters/filters";

function PageContent() {
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

export default function PageWrapper() {
  return (
    <FiltersProvider>
      <TableProvider>
        <PageContent />
      </TableProvider>
    </FiltersProvider>
  );
}
