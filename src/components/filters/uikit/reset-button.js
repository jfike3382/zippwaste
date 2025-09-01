"use client";
import Button from "@/components/uikit/button";

export default function ResetButton({ onApply }) {
  return (
    <Button
      variant="secondary"
      size="s"
      fullWidth
      onClick={() => {
        onApply?.();
      }}
    >
      Clear filters
    </Button>
  );
}
