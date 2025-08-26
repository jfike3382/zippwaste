"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import ProjectLogo from "./project-logo";
import { ContentCenter, ContentRight } from "./nav-bar-content";
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
      <div onClick={handleCloseMenu}>
        <ProjectLogo />
      </div>

      <div className="nav-bar-center tablet-hidden mobile-hidden">
        <ContentCenter />
      </div>
      <div className="nav-bar-right tablet-hidden mobile-hidden">
        <ContentRight />
      </div>

      <button
        className="nav-bar-mobile-toggle desktop-hidden"
        onClick={handleToggleMenu}
      >
        {menuOpen ? (
          <Image
            src="/assets/icons/cancel.svg"
            alt="Close"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        )}
      </button>

      <NavBarMobile isOpen={menuOpen} onClose={handleCloseMenu} />
    </nav>
  );
}
