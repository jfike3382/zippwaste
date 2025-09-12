import { formatNumber } from "@/utils/format-data/number";

export default function ProfileStats({ data }) {
  const stats = [
    { label: "Investments", value: data.number_investments },
    { label: "Lead rounds", value: data.number_lead_investments },
    { label: "Exits", value: data.number_exits },
  ];

  return (
    <div className="flex flex-row gap-4 max-md:flex-col max-md:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 max-w-40 w-full">
          <p className="text-brand-gray-800 font-semibold text-lg">{stat.label}</p>
          <div className="flex justify-start">
            <p className="tag white">{formatNumber(stat.value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}