import { useFilters } from "@/providers/filters-provider";
import BubbleFilter from "../uikit/bubble-filter";
import filtersData from "@/data/filters.json";

export default function TypeFilter() {
  const { filters, updateFilter } = useFilters();

  const handleTypeChange = (selectedType) => {
    updateFilter("type", selectedType);
  };

  return (
    <BubbleFilter
      options={filtersData.type}
      selectedValue={filters.type || "Dumpster rental"}
      onChange={handleTypeChange}
    />
  );
}
