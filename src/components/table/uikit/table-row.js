import Image from "next/image";
import ConnectButtons from "./connect-buttons";
import Link from "next/link";

export default function TableRow({ item }) {
  return (
    <div className="w-full p-6 border-standard rounded-3xl bg-white  group">
      <Link
        href={`/company/${item.slug}`}
        className="absolute inset-0 z-15"
      ></Link>

      <div className="flex flex-row items-center gap-6">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {item.logo?.url ? (
              <Image
                src={item.logo.url}
                alt={`${item.name} logo`}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <div className="text-gray-400 text-sm font-medium">
                {item.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Company Info */}
        <div className="flex-grow flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-blue-800">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600">{item.address}</p>
          <p className="text-sm text-gray-500">
            {item.city}, {item.state}
          </p>
        </div>

        {/* Connect Buttons */}
        <div className="flex-shrink-0 relative z-30">
          <ConnectButtons item={item} size="s" />
        </div>
      </div>
    </div>
  );
}
