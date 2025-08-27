import Link from "next/link";

export default function Footer() {
  return (
    <section className="flex flex-col gap-16 p-16 bg-neutral-950 text-white items-center max-md:px-5">
      <div className="max-w-5xl flex flex-row gap-8 w-full max-md:flex-col">
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Products</span>
            <Link href="/companies">Companies</Link>
            <Link href="/register">Claim listing</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Company</span>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">F.A.Q.</Link>
          </div>{" "}
        </div>
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Info</span>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>{" "}
        </div>
      </div>

      <p>© 2025 Zippwaste. All rights reserved.</p>
    </section>
  );
}
