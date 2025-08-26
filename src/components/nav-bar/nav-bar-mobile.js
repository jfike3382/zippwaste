"use client";

import { ContentMobile } from "./nav-bar-content";

export default function Content({ isOpen, onClose }) {
  const handleCloseMenu = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`nav-bar-mobile ${isOpen ? "open" : ""}`}>
      <ContentMobile onClose={handleCloseMenu} />
    </div>
  );
}
