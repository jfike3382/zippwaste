import ProfileLogo from "@/components/profile-logo";
import ConnectButtons from "@/components/table/uikit/connect-buttons";
import CharacteristicsList from "./characteristics-list";
import FormatLocation from "@/utils/format-data/location";
import WebsiteLink from "@/uikit/website-link";
import FAQ from "./faq";
import ProfileViews from "./profile-views";
import Sidebar from "./sidebar";

export default function MainContent({ item }) {
  return (
    <div className="flex flex-row flex-1 ">
      <Sidebar item={item} />
      <div className="main-data-right-container">
        <div className="w-full flex flex-col gap-8 items-start">
          <ProfileLogo name={item.name} size="l" src={item.logo?.url} />

          <div className="flex flex-col gap-2 ">
            <p className="title-l">{item.name}</p>
            <p className="paragraph-l">{FormatLocation(item)}</p>
            <WebsiteLink website={item.website} size={20} />
          </div>

          <ConnectButtons item={item} size="m" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-secondary title-s">Description</p>
            <p className="paragraph-l ">
              {item.description
                ? item.description
                : item.firm_data?.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-secondary title-s">Company address</p>
            <p className="paragraph-l">{item.address}</p>
          </div>
        </div>
        <FAQ item={item} />
        <ProfileViews views={item.views} />
      </div>
    </div>
  );
}
