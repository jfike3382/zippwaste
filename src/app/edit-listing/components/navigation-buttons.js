"use client";
import { useState, useCallback } from "react";
import Button from "@/components/uikit/button";
import { EditStartupInfo } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";

export default function NavigationButtons({
  nextSection,
  getDataToSave,
  step,
  onSectionChange,
}) {
  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();

  const handleNext = useCallback(async () => {
    if (typeof getDataToSave === "function" && typeof step === "number") {
      setSaving(true);
      try {
        const dataToSave = getDataToSave();
        const response = await EditStartupInfo({ ...dataToSave, step });
        if (response.error) {
          showNotification("error", response.error);
          setSaving(false);
          return;
        }
        // Pass dataToSave to onSectionChange so parent can update fill state
        onSectionChange(nextSection, () => dataToSave);
      } catch (error) {
        showNotification("error", error.message);
      } finally {
        setSaving(false);
      }
    } else if (typeof onSectionChange === "function") {
      onSectionChange(nextSection);
    }
  }, [getDataToSave, step, nextSection, onSectionChange, showNotification]);

  return (
    <div className="flex items-start">
      <Button variant="black" size="m" onClick={handleNext} disabled={saving}>
        Next → {nextSection}
      </Button>
    </div>
  );
}
