"use client";
import { useEffect, useState } from "react";

export function ToggleSwitcher({ checked = false, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      className={`
        w-11 h-6 rounded-full p-0.5 cursor-pointer
        ${checked ? "bg-brand-blue-800" : "bg-neutral-300"}
        transition-colors duration-300 ease-in-out
        relative
        flex items-center
      `}
    >
      <div
        className={`
          w-5 h-5 rounded-full 
          bg-white
          absolute transform
          transition-transform duration-300
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}
