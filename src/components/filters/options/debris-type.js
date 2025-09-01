"use client";
import { useFilters } from "@/providers/filters-provider";
import FilterDropdown from "@/components/filters/uikit/filter-multi-select";
import filters from "@/data/filters.json";

export default function Filter({ onApply, dropdownSize, dropdownOrientation }) {
  const {
    filters: { debris_type = [] },
    updateFilter,
  } = useFilters();

  return (
    <FilterDropdown
      label="Debris Type"
      tip="Select the type of debris."
      options={filters.debris_type.map((item) => item.name)}
      selectedValues={debris_type}
      onChange={(newValues) => updateFilter("debris_type", newValues)}
      onApply={onApply}
      dropdownSize={dropdownSize}
      dropdownOrientation={dropdownOrientation}
    />
  );
}
