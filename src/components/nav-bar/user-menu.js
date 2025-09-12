"use client";

import Link from "next/link";
import Dropdown from "../../uikit/dropdown";
import ProfileLogo from "../../uikit/profile-logo";
import { getCookie, logout } from "@/utils/cookies";
import { useUserState } from "@/providers/user-state-provider";
import UpgradeIcon from "@/uikit/icons/upgrade";
import SettingsIcon from "@/uikit/icons/settings";
import LogoutIcon from "@/uikit/icons/logout";

export default function UserMenu({ onClose, variant = "default" }) {
  const { companyPage } = useUserState();

  const userName = getCookie("user_name");
  const userEmail = getCookie("user_email");
  const userLogo = getCookie("user_logo");

  const toggleContent =
    variant === "extended" ? (
      <div className="dropdown-cell no-click">
        <ProfileLogo name={userName} src={userLogo} />
        <div className="flex flex-col gap-0.5 text-xs font-medium line-clamp-1">
          <p>{userName}</p>
          <p className="text-neutral-600 line-clamp-1">{userEmail}</p>
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
      <div className="dropdown-cell no-click">
        <ProfileLogo name={userName} src={userLogo} />
        <div className="flex flex-col gap-1 text-sm font-medium line-clamp-1">
          <p>{userName}</p>
          <p className="text-neutral-600 text-xs line-clamp-1">{userEmail}</p>
        </div>
      </div>
      <div className="divider" />
      {companyPage && (
        <Link
          href={`/company/${companyPage.slug}`}
          className="dropdown-cell"
          onClick={onClose}
        >
          {companyPage.name}
        </Link>
      )}
      <Link href="/pricing" className="dropdown-cell" onClick={onClose}>
        <UpgradeIcon size={18} />
        Listing plans
      </Link>
      <Link href="/settings" className="dropdown-cell" onClick={onClose}>
        <SettingsIcon size={18} />
        Settings
      </Link>
      <div
        className="dropdown-cell"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        <LogoutIcon size={18} />
        Log out
      </div>
    </Dropdown>
  );
}
