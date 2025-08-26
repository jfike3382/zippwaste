"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useNavBarScrollOpacity from "@/utils/use-nav-bar-scroll-opacity";

import ProjectLogo from "@/components/global-elements/project-logo";
import {
  ContentCenter,
  ContentRight,
} from "@/components/global-elements/nav-bar/nav-bar-content";
import NavBarMobile from "@/components/global-elements/nav-bar/nav-bar-mobile";

export default function NavBar() {
  const pathname = usePathname();

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

  const bgOpacity = useNavBarScrollOpacity(pathname);

  const isAnimatedPage = pathname === "/";

  return (
    <nav
      className={`nav-bar ${isAnimatedPage ? "nav-bar-home" : ""}`}
      style={
        isAnimatedPage
          ? {
              backgroundColor: `rgba(255,255,255,${bgOpacity})`,
              borderBottom: `1px solid rgba(34,34,34,${bgOpacity})`,
            }
          : {}
      }
    >
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
