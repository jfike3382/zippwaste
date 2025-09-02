"use client";
import { useEffect, useRef } from "react";

export default function Switcher({ options, value, onChange }) {
  const containerRef = useRef(null);
  const activeButtonRef = useRef(null);

  if (!options || options.length === 0) {
    throw new Error("Switcher component requires at least 1 options");
  }

  useEffect(() => {
    if (activeButtonRef.current && containerRef.current) {
      const button = activeButtonRef.current;
      const slider = containerRef.current.querySelector(".sliding-background");

      slider.style.width = `${button.offsetWidth}px`;
      slider.style.left = `${button.offsetLeft}px`;
    }
  }, [value]);

  return (
    <div className="switcher-container" ref={containerRef}>
      <div className="sliding-background" />
      {options.map((option) => (
        <div
          className="switcher-btn"
          key={option.value}
          ref={value === option.value ? activeButtonRef : null}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.tag && (
            <div
              className={`switcher-tag  ${
                value === option.value ? "active" : ""
              }`}
            >
              {option.tag}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
