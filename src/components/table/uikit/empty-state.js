import Image from "next/image";

export default function TableEmptyState({
  title = "No results found",
  subtitle = "Please try another filters",
  imagePath = "/assets/images/empty_state.png",
}) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-12">
      <Image src={imagePath} alt="Empty state" width={64} height={64} />
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-brand-gray-800">{subtitle}</p>
      </div>
    </div>
  );
}
