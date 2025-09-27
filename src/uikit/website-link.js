"use client";
import ExternalLinkIcon from "./icons/external-link";
import { ensureHttps } from "@/utils/ensure-https";

export default function WebsiteLink({ website, size = "s" }) {
  if (!website || !website.includes(".") || website.includes("@")) return null;

  const iconSize = size === "m" ? 20 : 16;
  const textClass = size === "m" ? "text-lg/6" : "";

  return (
    <a
      href={ensureHttps(website)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(ensureHttps(website), "_blank");
      }}
    >
      <div className="flex flex-row items-center gap-1 text-brand-blue-800 border-b border-transparent hover:border-brand-blue-800 ">
        <ExternalLinkIcon size={iconSize} />
        <p className={`line-clamp-1 ${textClass}`}>
          {website
            .replace(/^(https?:\/\/)?(www\.)?/, "")
            .replace(/\/$/, "")
            .toLowerCase()}
        </p>
      </div>
    </a>
  );
}
