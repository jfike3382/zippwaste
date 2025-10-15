import Input from "@/uikit/input";
import { useState, useEffect } from "react";
import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import { FiltersMobile } from "@/components/filters/filters";
import ZoomIcon from "@/uikit/icons/zoom";
import { formatNumber } from "@/utils/format-data/number";

export default function Header({ itemsTotal = 0 }) {
  const [searchInput, setSearchInput] = useState("");
  const { updateSearch, filters } = useFilters();
  const { fetchTable } = useTable();

  const handleSearch = () => {
    updateSearch(searchInput);
    fetchTable({ ...filters, search: searchInput, page: 1 });
  };

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" ||
      e.code === "Enter" ||
      e.code === "Return" ||
      e.key === "Go" ||
      e.key === "Search" ||
      e.keyCode === 13
    ) {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Automatically search when input becomes empty
    if (value === "") {
      updateSearch("");
      fetchTable({ ...filters, search: "", page: 1 });
    }
  };

  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  return (
    <div className="flex flex-row gap-8 items-center max-lg:flex-col max-lg:items-start">
      <div className="flex flex-row gap-4 items-center">
        <h1 className="title-m">Companies</h1>
        <p className="title-m text-secondary">{formatNumber(itemsTotal)} </p>
      </div>
      <div className="min-w-[24rem] max-md:w-full max-md:min-w-[20rem] relative">
        <Input
          placeholder="Search by zip code or company name"
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-white pl-1 ${
            searchInput ? "text-main" : "text-neutral-400"
          }`}
          onClick={handleSearch}
        >
          <ZoomIcon size={24} />
        </div>
      </div>

      <FiltersMobile />
    </div>
  );
}
