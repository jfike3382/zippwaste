"use client";

import Image from "next/image";
import Link from "next/link";
import { ensureHttps } from "@/utils/ensure-https";

export default function Button({
  size = "",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "center",
  spaceBetween = false,
  children,
  onClick,
  selected = false,
  href,
  hrefType = "internal",
}) {
  const sizeClass = size ? `button-${size}` : "";
  const variantClass = variant ? `button-${variant}` : "";
  const disabledClass = disabled || loading ? "button-disabled" : "";
  const selectedClass = selected ? "button-selected" : "";

  const justifyClass = spaceBetween ? "justify-between" : "justify-center";
  const widthClass = fullWidth ? "w-full" : "";

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const renderIcon = (iconName) => {
    const iconSize = size === "s" || size === "icon_s" ? 20 : 24;
    return (
      <Image
        src={`/assets/icons/${iconName}.svg`}
        width={iconSize}
        height={iconSize}
        alt={iconName}
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      const spinnerColor =
        variant === "secondary" ? "text-black" : "text-white";
      return (
        <svg
          className={`animate-spin h-5 w-5 ${spinnerColor}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0"
          ></path>
        </svg>
      );
    }

    if (icon) {
      switch (iconPosition) {
        case "left":
          return (
            <>
              <span className="ml-[-0.2rem]">{renderIcon(icon)}</span>
              {children}
            </>
          );
        case "right":
          return (
            <>
              {children}
              <span className="mr-[-0.2rem]">{renderIcon(icon)}</span>
            </>
          );
        default:
          return renderIcon(icon);
      }
    }

    return children;
  };
  const className = [
    "button-base",
    sizeClass,
    variantClass,
    widthClass,
    justifyClass,
    disabledClass,
    selectedClass,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (hrefType === "external") {
      const safeHref = ensureHttps(href);
      return (
        <a
          href={safeHref}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {renderContent()}
        </a>
      );
    }

    return (
      <Link href={href} className={className} onClick={handleClick}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
}
