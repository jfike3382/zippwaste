import Link from "next/link";
import Image from "next/image";

export default function ProjectLogo() {
  return (
    <Link href="/">
      <Image
        src="/zippwaste-logo.svg"
        alt="Zippwaste Logo"
        width={166}
        height={32}
      />
    </Link>
  );
}
