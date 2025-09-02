"use client";
import Dropdown from "@/uikit/dropdown";
import Button from "@/uikit/button";

export default function FilterSingleSelect({
  label,
  tip,
  options,
  selectedValue = null,
  onChange,
}) {
  const handleFilterChange = (value, closeDropdown) => {
    onChange(value);
    closeDropdown();
  };

  return (
    <Dropdown
      toggleContent={
        <Button
          size="s"
          variant="secondary"
          icon="down"
          iconPosition="right"
          fullWidth
          spaceBetween
        >
          {selectedValue || label}
        </Button>
      }
      dropdownSize="auto"
      dropdownOrientation="bottom"
    >
      {(closeDropdown) => (
        <div className="dropdown-scroll">
          {options.map((value) => (
            <div
              className="navigation-cell"
              key={value}
              onClick={() => handleFilterChange(value, closeDropdown)}
            >
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}
    </Dropdown>
  );
}
