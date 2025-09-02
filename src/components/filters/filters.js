import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import { useState } from "react";
import Modal from "@/uikit/modal";
import Button from "@/uikit/button";
import {
  DumpsterSizeFilter,
  ProjectSizeFilter,
  DebrisTypeFilter,
  DurationFilter,
} from "@/components/filters";
import ResetButton from "./uikit/reset-button";
import ApplyButton from "./uikit/apply-button";

export default function FilterComponent({
  dropdownSize = "m",
  dropdownOrientation = "right",
  onCloseModal,
}) {
  const { filters, resetFilters } = useFilters();
  const { fetchTable } = useTable();

  const handleContinue = () => {
    fetchTable({ ...filters, page: 1 });
    onCloseModal?.();
  };

  const handleReset = () => {
    resetFilters();
    fetchTable({ page: 1 });
    onCloseModal?.();
  };

  return (
    <div className="flex flex-col w-[20rem] min-w-[20rem] h-full p-6 bg-neutral-50 border-r border-neutral-200 mobile-hidden">
      <div className="flex flex-col gap-6 flex-wrap">
        <p className="title-s">Filters</p>
        <div className="flex flex-col gap-4">
          <DumpsterSizeFilter
            dropdownSize={dropdownSize}
            dropdownOrientation={dropdownOrientation}
          />
          <ProjectSizeFilter
            dropdownSize={dropdownSize}
            dropdownOrientation={dropdownOrientation}
          />
          <DebrisTypeFilter
            dropdownSize={dropdownSize}
            dropdownOrientation={dropdownOrientation}
          />
          <DurationFilter
            dropdownSize={dropdownSize}
            dropdownOrientation={dropdownOrientation}
          />
        </div>
        <ApplyButton onApply={handleContinue} />
        <ResetButton onApply={handleReset} />
      </div>
    </div>
  );
}

export function FiltersMobile() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <div className="desktop-hidden tablet-hidden">
        <Button
          variant="secondary"
          size="m"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filters
        </Button>
      </div>
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        size="m"
      >
        <FilterComponent
          dropdownSize="auto"
          dropdownOrientation="bottom"
          onCloseModal={() => setIsFilterModalOpen(false)}
        />
      </Modal>
    </>
  );
}
