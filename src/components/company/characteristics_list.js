"use client";

import { useState } from "react";

export default function CharacteristicsList({
  data,
  characteristic,
  visibleItems = 3,
  titleSize = "text-base",
  showAllMode = "expand", // "expand" or "navigate"
  profileUrl = null,
}) {
  const [showAll, setShowAll] = useState(false);

  if (!data || !data.length) return null;

  const visibleData = showAll ? data : data?.slice(0, visibleItems);
  const remainingCount = data?.length - visibleItems;

  const handleShowMore = () => {
    if (showAllMode === "navigate" && profileUrl) {
      window.location.href = profileUrl;
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-wrap">
      <p className={`text-brand-gray-800 ${titleSize}`}>
        Invest in {characteristic}
      </p>
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
