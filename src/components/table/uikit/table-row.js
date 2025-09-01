import ProfileLogo from "../../global-elements/profile/profile-logo";
import ConnectButtons from "./connect-buttons";
import FormatLocation from "@/utils/format-data/location";
import ProfileSubtitle from "@/components/global-elements/profile/profile-subtitle";
import ProfileName from "@/components/global-elements/profile/profile-name";
import WebsiteLink from "@/components/global-elements/profile/website-link";
import Link from "next/link";

export default function TableRow({ item, disabled = false }) {
  return (
    <div
      className={`table-record group ${
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "cursor-pointer"
      }`}
    >
      <Link
        href={`/investor/${item.slug}`}
        className="absolute inset-0 z-15"
      ></Link>

      <div className="flex flex-row gap-4 items-center max-md:items-start">
        <ProfileLogo name={item.name} size="m" src={item.logo?.url} />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-0.5">
            <ProfileName size="m" name={item.name} verified={item.verified} />
            <ProfileSubtitle item={item} size="s" />
          </div>
          <div className="flex flex-row gap-2 items-center text-sm max-md:flex-col max-md:items-start">
            {FormatLocation(item) && (
              <p className=" line-clamp-1 text-brand-gray-900">
                {FormatLocation(item)}
              </p>
            )}
            <div className="relative z-30">
              <WebsiteLink website={item.website} size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <ConnectButtons item={item} />
      </div>
    </div>
  );
}
