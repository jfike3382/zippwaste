"use client";
import { useFilters } from "@/providers/filters-provider";
import FilterDropdown from "@/components/filters/uikit/filter-multi-select";
import filters from "@/data/filters.json";

export default function Filter({ onApply, dropdownSize, dropdownOrientation }) {
  const {
    filters: { project_size = [] },
    updateFilter,
  } = useFilters();

  return (
    <FilterDropdown
      label="Project Size"
      tip="Select the size of the project."
      options={filters.project_size.map((item) => item.name)}
      selectedValues={project_size}
      onChange={(newValues) => updateFilter("project_size", newValues)}
      onApply={onApply}
      dropdownSize={dropdownSize}
      dropdownOrientation={dropdownOrientation}
    />
  );
}
