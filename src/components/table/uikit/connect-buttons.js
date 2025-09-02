"use client";

import { useState, useEffect } from "react";
import Button from "@/uikit/button";
import { ensureHttps } from "@/utils/ensure-https";

export default function ConnectButtons({ item, size = "s" }) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhoneToClipboard = (phone, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
  };

  useEffect(() => {
    if (copiedPhone) {
      const timer = setTimeout(() => {
        setCopiedPhone(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedPhone]);

  const renderButton = (type, url, icon, label) => {
    if (!url) return null;

    const buttonContent = (
      <Button
        size={label ? size : `icon_${size}`}
        variant={label ? "secondary" : "icon"}
        iconPosition={label ? "left" : undefined}
        icon={copiedPhone && type === "phone" ? "check" : icon}
      >
        {label}
      </Button>
    );

    if (type === "phone" && item.phone) {
      return (
        <div className="relative z-50" key={type}>
          <div onClick={(e) => copyPhoneToClipboard(item.phone, e)}>
            {buttonContent}
          </div>
          {copiedPhone && (
            <div className="absolute right-0 bottom-full mb-2 min-w-[120px] transform rounded-xl bg-white border-standard px-2 py-1 text-sm shadow-base">
              Copied to clipboard
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={type}
        className="z-50"
        href={type === "email" ? url : ensureHttps(url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonContent}
      </a>
    );
  };

  return (
    <div className="flex flex-row gap-2">
      {renderButton("website", item.website, "website", "Website")}
      {renderButton(
        "email",
        item.email ? `mailto:${item.email}` : null,
        "email",
        "Email"
      )}
      {renderButton(
        "phone",
        item.phone ? `tel:${item.phone}` : null,
        "phone",
        "Phone"
      )}
    </div>
  );
}
