import ConnectButtons from "./connect-buttons";
import WebsiteLink from "@/uikit/website-link";
import ProfileLogo from "@/uikit/profile-logo";
import formatLocation from "@/utils/format-data/location";
import VerifiedIcon from "@/uikit/icons/verified";
import Link from "next/link";

export default function TableRow({ item }) {
  return (
    <div className="relative w-full p-6 border-standard rounded-3xl bg-white group hover:bg-neutral-50 hover:shadow-base transition-colors">
      <Link
        href={`/company/${item.slug}`}
        className="absolute inset-0 z-15"
      ></Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4 max-md:flex-col max-md:items-start">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <ProfileLogo name={item.name} size="m" src={item.logo?.url} />
          </div>

          {/* Company Info */}
          <div className="flex-grow flex flex-col gap-2">
            <h3 className="text-lg font-semibold group-hover:text-brand-blue-800 transition-colors">
              {item.name}

              {item.verified && (
                <span className="inline-flex ml-1 items-center align-text-top">
                  <VerifiedIcon size={20} />
                </span>
              )}
            </h3>

            <div className="flex flex-row gap-2 items-center text-sm max-2xl:flex-col max-2xl:items-start ">
              <p className="line-clamp-1 ">{formatLocation(item)}</p>
              <div className="relative z-30">
                <WebsiteLink website={item.website} size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Connect Buttons */}
        <div className="w-fit relative z-30">
          <ConnectButtons item={item} size="s" />
        </div>
      </div>
    </div>
  );
}
