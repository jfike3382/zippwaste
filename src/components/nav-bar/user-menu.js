"use client";

import Link from "next/link";
import Dropdown from "../uikit/dropdown";
import ProfileLogo from "./profile/profile-logo";
import { getCookie, logout } from "@/utils/cookies";
import { useUserState } from "@/providers/user-state-provider";
import { formatNumber } from "@/utils/format-data/number";

export default function UserMenu({ onClose, variant = "default" }) {
  const { isCustomer, startupPage } = useUserState();

  const userName = getCookie("user_name");
  const userEmail = getCookie("user_email");
  const userLogo = getCookie("user_logo");
  const userExports = formatNumber(Number(getCookie("user_export_credits")));
  const userAICredits = formatNumber(Number(getCookie("user_ai_credits")));

  const toggleContent =
    variant === "extended" ? (
      <div className="navigation-cell no-click">
        <ProfileLogo name={userName} src={userLogo} />
        <div className="flex flex-col gap-0.5 text-xs font-medium line-clamp-1">
          <p>{userName}</p>
          <p className="text-brand-gray-800 line-clamp-1">{userEmail}</p>
        </div>
      </div>
    ) : (
      <ProfileLogo name={userName} src={userLogo} />
    );

  return (
    <Dropdown
      toggleContent={toggleContent}
      dropdownSize="m"
      dropdownOrientation="bottom"
      horizontalPosition={variant === "extended" ? "left" : "right"}
    >
      <div className="navigation-cell no-click">
        <ProfileLogo name={userName} src={userLogo} />
        <div className="flex flex-col gap-0.5 text-xs font-medium line-clamp-1">
          <p>{userName}</p>
          <p className="text-brand-gray-800 line-clamp-1">{userEmail}</p>
        </div>
      </div>
      <div className="divider" />
      {startupPage && (
        <Link
          href={`/startup/${startupPage.slug}`}
          className="navigation-cell"
          onClick={onClose}
        >
          {startupPage.name}
        </Link>
      )}
      <Link href="/exports" className="navigation-cell" onClick={onClose}>
        <div className="flex flex-row justify-between w-full items-center">
          <p>Exports</p>
          {isCustomer && (
            <p className="text-xs text-brand-gray-800">{userExports} left</p>
          )}
        </div>
      </Link>
      <Link href="/billing" className="navigation-cell" onClick={onClose}>
        Billing
      </Link>
      <Link href="/settings" className="navigation-cell" onClick={onClose}>
        Settings
      </Link>
      <div
        className="navigation-cell"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        Log out
      </div>
    </Dropdown>
  );
}
