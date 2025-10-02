"use client";
import { useState } from "react";
import TooltipIcon from "@/uikit/icons/tooltip";

export default function Tooltip({ text, orientation = "bottom", size = "m" }) {
  const [isVisible, setIsVisible] = useState(false);

  const defaultContainerStyles =
    "bg-white text-sm rounded-lg px-3 py-2 shadow-l";

  const sizeStyles = {
    s: "w-40",
    m: "w-60",
    l: "w-90",
  };

  const positionStyles = {
    top: "bottom-full mb-3 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-3 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-3 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-3 top-1/2 transform -translate-y-1/2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-white border-t-8 border-x-8 border-x-transparent drop-shadow-l",
    bottom:
      "bottom-full left-1/2 transform -translate-x-1/2 border-b-white border-b-8 border-x-8 border-x-transparent drop-shadow-l",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-white border-l-8 border-y-8 border-y-transparent drop-shadow-l",
    right:
      "right-full top-1/2 transform -translate-y-1/2 border-r-white border-r-8 border-y-8 border-y-transparent drop-shadow-l",
  };

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <TooltipIcon size={20} />
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 ${defaultContainerStyles} ${positionStyles[orientation]} ${sizeStyles[size]}`}
        >
          {text}
          <div className={`absolute ${arrowStyles[orientation]}`} />
        </div>
      )}
    </div>
  );
}
