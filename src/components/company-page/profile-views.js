import EyeIcon from "@/uikit/icons/eye-on";

export default function Content({ views = 16 }) {
  if (!views || views < 0) return null;

  return (
    <div className="flex flex-row gap-2 items-center text-brand-blue-800 px-3 py-2 bg-brand-blue-200 rounded-xl text-sm ">
      <EyeIcon size={24} />
      <p className="line-clamp-1">This page has been discovered {views} times</p>
    </div>
  );
}
