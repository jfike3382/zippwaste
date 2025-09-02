import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import { useState } from "react";
import Modal from "@/uikit/modal";
import Button from "@/uikit/button";
import {
  TypeFilter,
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
    fetchTable({ page: 1, type: filters.type });
    onCloseModal?.();
  };

  return (
    <div className="flex flex-col w-[24rem] min-w-[24rem] h-full p-6 pt-10 bg-neutral-50 border-r border-neutral-200 mobile-hidden">
      <div className="flex flex-col gap-8 flex-wrap">
        <TypeFilter />
        <div className="flex flex-col gap-4">
          <p className="text-base font-medium text-secondary">Filters</p>
          <div className="flex flex-col gap-3">
            {(filters.type === "Dumpster rental" || !filters.type) && (
              <DumpsterSizeFilter
                dropdownSize={dropdownSize}
                dropdownOrientation={dropdownOrientation}
              />
            )}
            {filters.type === "Junk removal" && (
              <ProjectSizeFilter
                dropdownSize={dropdownSize}
                dropdownOrientation={dropdownOrientation}
              />
            )}
            <DebrisTypeFilter
              dropdownSize={dropdownSize}
              dropdownOrientation={dropdownOrientation}
            />
            {(filters.type === "Dumpster rental" || !filters.type) && (
              <DurationFilter
                dropdownSize={dropdownSize}
                dropdownOrientation={dropdownOrientation}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ApplyButton onApply={handleContinue} />
          <ResetButton onApply={handleReset} />
        </div>
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
