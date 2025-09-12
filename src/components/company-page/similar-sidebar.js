import SmallRow from "../../table/uikit/small-row";

export default function SimilarProfiles({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold">Similar Investors</h4>
      {data && data.length > 0 ? (
        data.map((item) => (
          <SmallRow
            key={item.id || item.slug}
            item={item}
            href={`/investor/${item.slug}`}
          />
        ))
      ) : (
        <p className="text-neutral-800">No similar investors found</p>
      )}
    </div>
  );
}
