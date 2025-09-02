import Switcher from "@/uikit/switcher";

export default function BubbleFilter({
  options = [],
  selectedValue,
  onChange,
}) {
  const switcherOptions = options.map((option) => ({
    value: option.name,
    label: option.name,
  }));

  return (
    <Switcher
      options={switcherOptions}
      value={selectedValue}
      onChange={onChange}
    />
  );
}
