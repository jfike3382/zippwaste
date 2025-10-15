"use client";

import { useState } from "react";

export default function CharacteristicsList({
  data,
  characteristic,
  visibleItems = 3,
  showAllMode = "expand", // "expand" or "navigate"
}) {
  const [showAll, setShowAll] = useState(false);

  if (!data || !data.length) return null;

  const visibleData = showAll ? data : data?.slice(0, visibleItems);
  const remainingCount = data?.length - visibleItems;

  const handleShowMore = () => {
    if (showAllMode === "navigate") {
      // Navigate functionality can be added later if needed
      setShowAll(true);
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-wrap">
      <p className="font-medium text-secondary">{characteristic}</p>
      <div className="flex flex-row gap-2 flex-wrap">
        {visibleData?.map((dataValue, index) => (
          <span key={index} className="tag white">
            {dataValue}
          </span>
        ))}
        {!showAll && data?.length > visibleItems && (
          <span className="tag blue cursor-pointer" onClick={handleShowMore}>
            {showAllMode === "navigate" ? "Show all" : `+${remainingCount}`}
          </span>
        )}
      </div>
    </div>
  );
}
