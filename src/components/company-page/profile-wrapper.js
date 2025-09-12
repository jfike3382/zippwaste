import ProfileLogo from "@/components/profile-logo";
import ConnectButtons from "@/components/table/uikit/connect-buttons";
import CharacteristicsList from "./characteristics_list";
import FormatLocation from "@/utils/format-data/location";
import WebsiteLink from "@/uikit/website-link";
import FAQ from "./faq";
import ProfileViews from "./profile-views";

export default function MainContent({ item }) {
  return (
    <div className="flex flex-row flex-1 ">
      <div className="filter-container">
        <CharacteristicsList
          data={item.dumpster_size}
          characteristic={"regions"}
          visibleItems={10}
          titleSize="title-s"
        />
        <CharacteristicsList
          data={item.project_size}
          characteristic={"stages"}
          visibleItems={10}
          titleSize="title-s"
        />
        <CharacteristicsList
          data={item.debris_type}
          characteristic={"industries"}
          visibleItems={10}
          titleSize="title-s"
        />
        <CharacteristicsList
          data={item.duration}
          characteristic={"industries"}
          visibleItems={10}
          titleSize="title-s"
        />
      </div>
      <div className="table-container">
        <div className="w-full flex flex-col gap-8 items-start">
          <ProfileLogo name={item.name} size="l" src={item.logo?.url} />

          <div className="flex flex-col gap-2 paragraph-l">
            <p>{item.name}</p>
            <p className="paragraph-l">{FormatLocation(item)}</p>
            <WebsiteLink website={item.website} size={20} />
          </div>

          <ConnectButtons item={item} size="m" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-800 title-s">Description</p>
            <p className="paragraph-l ">
              {item.description
                ? item.description
                : item.firm_data?.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-800 title-s">Company address</p>
            <p className="paragraph-l">{item.address}</p>
          </div>
          <div className="hidden">
            <CharacteristicsList
              data={item.dumpster_size}
              characteristic={"regions"}
              visibleItems={10}
              titleSize="title-s"
            />
            <CharacteristicsList
              data={item.project_size}
              characteristic={"stages"}
              visibleItems={10}
              titleSize="title-s"
            />
            <CharacteristicsList
              data={item.debris_type}
              characteristic={"industries"}
              visibleItems={10}
              titleSize="title-s"
            />
            <CharacteristicsList
              data={item.duration}
              characteristic={"industries"}
              visibleItems={10}
              titleSize="title-s"
            />
          </div>
        </div>
        <FAQ item={item} />
        <ProfileViews views={item.views} />
      </div>
    </div>
  );
}
