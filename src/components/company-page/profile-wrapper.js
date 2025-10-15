import ProfileLogo from "@/uikit/profile-logo";
import ConnectButtons from "@/components/table/uikit/connect-buttons";
import CharacteristicsList from "./characteristics-list";
import FormatLocation from "@/utils/format-data/location";
import WebsiteLink from "@/uikit/website-link";
import FAQ from "./faq";
import ProfileViews from "./profile-views";
import Sidebar from "./sidebar";
import VerifiedIcon from "@/uikit/icons/verified";
import ClaimListing from "@/components/global-elements/claim-listing";
import Button from "@/uikit/button";

export default function MainContent({ item }) {
  return (
    <div className="flex flex-row flex-1">
      <Sidebar item={item} />
      <div className="main-data-right-container max-w-4xl">
        <div className="w-full flex flex-col gap-8 items-start">
          <ProfileLogo name={item.name} size="l" src={item.logo?.url} />

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-2 items-center">
              <p className="title-l">{item.name}</p>
              {item.verified && <VerifiedIcon size={28} />}
            </div>
            <p className="paragraph-l">{FormatLocation(item)}</p>
            <WebsiteLink website={item.website} size="m" />
          </div>

          <ConnectButtons item={item} size="m" />
        </div>
        <div className="flex flex-col gap-8">
          {(item.description || item.firm_data?.description) && (
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-secondary">
                Description
              </p>
              <p className="paragraph-l ">
                {item.description
                  ? item.description
                  : item.firm_data?.description}
              </p>
            </div>
          )}
          {item.address && (
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-secondary">
                Company address
              </p>
              <p className="paragraph-l">{item.address}</p>
            </div>
          )}
          {item.zip_codes && (
            <CharacteristicsList
              data={item.zip_codes}
              characteristic={"ZIP codes"}
              visibleItems={20}
            />
          )}
          <div className="hidden max-lg:flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <CharacteristicsList
                data={item.dumpster_size}
                characteristic={"Dumpsters"}
              />
              <CharacteristicsList
                data={item.project_size}
                characteristic={"Project Size"}
              />
              <CharacteristicsList
                data={item.debris_type}
                characteristic={"Debris Types"}
              />
              <CharacteristicsList
                data={item.duration}
                characteristic={"Duration"}
              />
            </div>
          </div>
        </div>
        <FAQ item={item} />
        <div className="flex flex-col gap-4">
          <p className="title-m">Is this your company? Have any edits?</p>
          <p>Request access over the company listing</p>
          <ClaimListing
            button={
              <Button variant="primary" size="m">
                Claim listing
              </Button>
            }
          />
        </div>
        <ProfileViews views={item.views} />
      </div>
    </div>
  );
}
