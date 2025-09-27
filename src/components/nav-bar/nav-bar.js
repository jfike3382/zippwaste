"use client";

import { useState, useEffect } from "react";
import CancelIcon from "@/uikit/icons/cancel";
import MenuIcon from "@/uikit/icons/menu";

import ProjectLogo from "./project-logo";
import { ContentRight, ContentLeft } from "./nav-bar-content";
import NavBarMobile from "./nav-bar-mobile";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <nav className="nav-bar">
      <div className="flex items-center gap-8">
        <div onClick={handleCloseMenu}>
          <ProjectLogo />
        </div>

        <div className="tablet-hidden mobile-hidden">
          <ContentLeft />
        </div>
      </div>

      <div className="nav-bar-right tablet-hidden mobile-hidden">
        <ContentRight />
      </div>

      <button
        className="nav-bar-mobile-toggle desktop-hidden"
        onClick={handleToggleMenu}
      >
        {menuOpen ? <CancelIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <NavBarMobile isOpen={menuOpen} onClose={handleCloseMenu} />
    </nav>
  );
}
