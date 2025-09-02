import Input from "@/uikit/input";
import { useState, useEffect } from "react";
import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import { FiltersMobile } from "@/components/filters/filters";
import ZoomIcon from "@/uikit/icons/zoom";

export default function Header({ itemsTotal }) {
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

  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-8 items-start">
          <h1 className="title-l">Companies</h1>
          <div className="flex flex-row items-center justify-between w-full max-md:flex-col gap-4 max-md:items-start max-md:gap-8">
            <div className="flex flex-row gap-2 items-center">
              <FiltersMobile />
            </div>
            <div className="min-w-[20rem] max-md:w-full relative">
              <Input
                placeholder="Enter zip code"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray-600 bg-white pl-1">
                <ZoomIcon size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
