"use client";
import Button from "@/uikit/button";

export default function ApplyButton({ onApply, closeDropdown }) {
  const handleClick = () => {
    onApply({ page: 1 });
    closeDropdown?.();
  };

  return (
    <Button variant="black" size="s" fullWidth onClick={handleClick}>
      Show results
    </Button>
  );
}
