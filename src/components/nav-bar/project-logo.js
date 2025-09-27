import Link from "next/link";
import Image from "next/image";

export default function ProjectLogo() {
  return (
    <Link href="/">
      <div className="pt-1.5">
        <Image
          src="/assets/images/zippwaste-logo.svg"
          alt="Zippwaste Logo"
          width={140}
          height={28}
        />
      </div>
    </Link>
  );
}
