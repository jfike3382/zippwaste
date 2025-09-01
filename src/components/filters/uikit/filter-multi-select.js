"use client";
import Dropdown from "@/components/uikit/dropdown";
import Button from "@/components/uikit/button";
import Checkbox from "@/components/uikit/checkbox";

export default function FilterDropdown({
  label,
  tip,
  options,
  dropdownSize = "m",
  dropdownOrientation = "left",
  selectedValues = [],
  onChange,
}) {
  const handleFilterChange = (value, isChecked) => {
    const newValues = isChecked
      ? [...selectedValues, value]
      : selectedValues.filter((item) => item !== value);
    onChange(newValues);
  };

  return (
    <Dropdown
      toggleContent={
        <Button
          size="s"
          variant="secondary"
          icon="down"
          iconPosition="right"
          selected={selectedValues.length > 0}
          fullWidth
          spaceBetween={true}
        >
          {label} {selectedValues.length > 0 && `(${selectedValues.length})`}
        </Button>
      }
      dropdownSize={dropdownSize}
      dropdownOrientation={dropdownOrientation}
      horizontalPosition="top"
    >
      {tip && <div className="navigation-tip">{tip}</div>}
      <div>
        {options.map((value) => (
          <div
            className="navigation-cell"
            key={value}
            onClick={() =>
              handleFilterChange(value, !selectedValues.includes(value))
            }
          >
            <Checkbox checked={selectedValues.includes(value)} />
            <p>{value}</p>
          </div>
        ))}
      </div>
    </Dropdown>
  );
}
