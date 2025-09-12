import Image from "next/image";
import Initials from "@/utils/format-data/initials";

const logoSizes = {
  s: { width: 40, height: 40 },
  m: { width: 64, height: 64 },
  l: { width: 128, height: 128 },
};

export default function ProfileLogo({ name, size = "s", src, placeholder }) {
  const displayContent = placeholder || Initials(name);
  const dimensions = logoSizes[size] || logoSizes.s;

  return (
    <div className={`logo ${size}`}>
      {src ? (
        <Image
          src={src}
          alt="Profile logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-cover"
          priority
        />
      ) : (
        displayContent
      )}
    </div>
  );
}
