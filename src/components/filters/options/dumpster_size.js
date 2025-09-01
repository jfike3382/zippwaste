"use client";
import { useFilters } from "@/providers/filters-provider";
import FilterDropdown from "@/components/filters/uikit/filter-multi-select";
import filters from "@/data/filters.json";

export default function Filter({ onApply, dropdownSize, dropdownOrientation }) {
  const {
    filters: { dumpster_size = [] },
    updateFilter,
  } = useFilters();

  return (
    <FilterDropdown
      label="Dumpster Size"
      tip="Select the size of the dumpster."
      options={filters.dumpster_size.map((item) => item.name)}
      selectedValues={dumpster_size}
      onChange={(newValues) => updateFilter("dumpster_size", newValues)}
      onApply={onApply}
      dropdownSize={dropdownSize}
      dropdownOrientation={dropdownOrientation}
    />
  );
}
