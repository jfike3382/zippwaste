"use client";

export default function CharacteristicsList({
  data,
  characteristic,
}) {
  if (!data || !data.length) return null;

  return (
    <div className="flex flex-col gap-3 flex-wrap">
      <p className="text-base font-medium text-secondary">{characteristic}</p>
      <div className="flex flex-row gap-2 flex-wrap">
        {data?.map((dataValue, index) => (
          <span key={index} className="tag white">
            {dataValue}
          </span>
        ))}
      </div>
    </div>
  );
}
