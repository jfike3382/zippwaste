import CharacteristicsList from "./characteristics-list";

export default function Sidebar({ item }) {
  return (
    <div className="sidebar-container">
      <div className="flex flex-col gap-8">
        <p className="text-lg font-semibold">Company services </p>
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
  );
}
