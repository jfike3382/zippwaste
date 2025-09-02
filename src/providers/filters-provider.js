"use client";
import { createContext, useContext, useState, useEffect } from "react";

const initialState = {
  page: 1,
  type: "Dumpster rental",
};

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(initialState);
  const [filtersReady, setFiltersReady] = useState(false);

  useEffect(() => {
    setFilters(initialState);
    setTimeout(() => setFiltersReady(true), 0);
  }, []);

  const updateFilter = (filterName, values) => {
    const newFilters = {
      ...filters,
      [filterName]: values,
      page: 1,
    };
    setFilters(newFilters);
  };

  const updateSearch = (searchValue) => {
    const newFilters = {
      ...filters,
      search: searchValue || undefined,
      page: 1,
    };
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const newFilters = {
      page: 1,
      type: filters.type,
    };
    setFilters(newFilters);
  };

  const updatePage = (newPage) => {
    const newFilters = {
      ...filters,
      page: newPage,
    };
    setFilters(newFilters);
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        filtersReady,
        updateFilter,
        updateSearch,
        resetFilters,
        updatePage,
        currentPage: filters.page,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);
