import Link from "next/link";
import Image from "next/image";

export default function ProjectLogo() {
  return (
    <Link href="/">
      <Image
        src="/assets/zippwaste_logo.svg"
        alt="Zippwaste Logo"
        width={126}
        height={32}
      />
    </Link>
  );
}
