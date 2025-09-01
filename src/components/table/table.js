import { useFilters } from "@/providers/filters-provider";
import { useTable } from "@/providers/table-provider";
import { useState } from "react";
import CardModal from "../uikit/card-modal";
import TableRowHead from "./uikit/table-header";
import TableRow from "./uikit/table-row";
import TableEmptyState from "./uikit/empty-state";
import Pagination from "./uikit/pagination";
import PayRow from "./pay-row";

export default function Table({
  items = [],
  itemsTotal = 0,
  loading = false,
  limited = false,
}) {
  const { currentPage } = useFilters();
  const { isInitial } = useTable();
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [selectedInvestorIndex, setSelectedInvestorIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalItems = limited ? items.slice(0, 5) : items;

  const handleRowClick = (item) => {
    const index = modalItems.findIndex(
      (investor) => investor.slug === item.slug
    );
    setSelectedInvestor(item);
    setSelectedInvestorIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToNext = () => {
    const nextIndex = (selectedInvestorIndex + 1) % modalItems.length;
    setSelectedInvestorIndex(nextIndex);
    setSelectedInvestor(modalItems[nextIndex]);
  };

  const navigateToPrevious = () => {
    const prevIndex =
      selectedInvestorIndex === 0
        ? modalItems.length - 1
        : selectedInvestorIndex - 1;
    setSelectedInvestorIndex(prevIndex);
    setSelectedInvestor(modalItems[prevIndex]);
  };

  return (
    <div
      className={`flex flex-col gap-8 transition-opacity duration-300 ${
        loading ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="flex flex-col">
        <TableRowHead itemsTotal={itemsTotal} type="investors" />
        {isInitial && items.length === 0 ? (
          <TableEmptyState />
        ) : limited ? (
          <>
            {items.slice(0, 5).map((item, index) => (
              <TableRow
                key={item.slug || index}
                item={item}
                onClick={() => handleRowClick(item)}
              />
            ))}
            {items.length > 5 && <PayRow />}
            {items.slice(5, 10).map((item, index) => (
              <TableRow
                key={item.slug || `disabled-${index}`}
                item={item}
                disabled
              />
            ))}
          </>
        ) : (
          items?.map((item, index) => (
            <TableRow
              key={item.slug || index}
              item={item}
              onClick={() => handleRowClick(item)}
            />
          ))
        )}
      </div>
      <Pagination
        itemsReceived={items.length}
        itemsTotal={itemsTotal}
        currentPage={currentPage}
        type="investors"
      />
      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={selectedInvestor}
        onNext={navigateToNext}
        onPrevious={navigateToPrevious}
        hasNext={modalItems.length > 1}
        hasPrevious={modalItems.length > 1}
        currentIndex={selectedInvestorIndex}
        totalItems={modalItems.length}
        type="investors"
      />
    </div>
  );
}
