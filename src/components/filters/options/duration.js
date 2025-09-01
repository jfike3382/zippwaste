"use client";
import { useFilters } from "@/providers/filters-provider";
import FilterDropdown from "@/components/filters/uikit/filter-multi-select";
import filters from "@/data/filters.json";

export default function Filter({ onApply, dropdownSize, dropdownOrientation }) {
  const {
    filters: { duration = [] },
    updateFilter,
  } = useFilters();

  return (
    <FilterDropdown
      label="Duration"
      tip="Select the duration."
      options={filters.duration.map((item) => item.name)}
      selectedValues={duration}
      onChange={(newValues) => updateFilter("duration", newValues)}
      onApply={onApply}
      dropdownSize={dropdownSize}
      dropdownOrientation={dropdownOrientation}
    />
  );
}
