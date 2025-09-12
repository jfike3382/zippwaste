"use client";
import ExternalLinkIcon from "./icons/external-link";
import { ensureHttps } from "@/utils/ensure-https";

export default function WebsiteLink({ website, size = 16 }) {
  if (!website || !website.includes(".") || website.includes("@")) return null;

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
      <div className="flex flex-row items-center gap-1 text-brand-blue-800 border-b border-transparent hover:border-brand-blue-800 w-fit ">
        <ExternalLinkIcon size={size} />
        <p className="line-clamp-1">
          {website
            .replace(/^(https?:\/\/)?(www\.)?/, "")
            .replace(/\/$/, "")
            .toLowerCase()}
        </p>
      </div>
    </a>
  );
}
