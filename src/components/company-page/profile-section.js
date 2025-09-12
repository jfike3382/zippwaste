import ProfileLogo from "@/components/profile-logo";
import ConnectButtons from "@/components/table/uikit/connect-buttons";
import CharacteristicsList from "./characteristics_list";
import FormatLocation from "@/utils/format-data/location";
import WebsiteLink from "@/uikit/website-link";
import FAQ from "./faq";
import ProfileViews from "./profile-views";

export default function MainContent({ item }) {
  if (!item) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <ProfileLogo name={item.name} size="xl" src={item.logo?.url} />

        <div className="flex flex-col gap-2 paragraph-l">
          <p>{item.name}</p>
          <p>{item.address}</p>
          <WebsiteLink website={item.website} size={20} />
        </div>

        <ConnectButtons item={item} size="m" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-neutral-800 title-s">Description</p>
          <p className="paragraph-l ">
            {item.description ? item.description : item.firm_data?.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-neutral-800 title-s">Location</p>
          <p className="paragraph-l">{FormatLocation(item)}</p>
        </div>

        <CharacteristicsList
          data={item.filters ? item.filters.geography : item.geography}
          characteristic={"regions"}
          visibleItems={10}
          titleSize="title-s"
        />
        <CharacteristicsList
          data={item.filters ? item.filters.stages : item.stages}
          characteristic={"stages"}
          visibleItems={10}
          titleSize="title-s"
        />
        <CharacteristicsList
          data={item.filters ? item.filters.industries : item.industries}
          characteristic={"industries"}
          visibleItems={10}
          titleSize="title-s"
        />
      </div>
      <FAQ item={item} />
      <ProfileViews views={item.views} />
    </>
  );
}
