import Link from "next/link";

export default function Footer() {
  return (
    <section className="flex flex-col gap-16 p-16 bg-brand-gray-900 text-white items-center max-md:px-5">
      <div className="max-w-5xl flex flex-row gap-8 w-full max-md:flex-col">
        <div className="flex flex-col gap-3 flex-1 text-brand-gray-400">
          {" "}
          Products
          <Link href="/investors">Investors</Link>
          <Link href="/startups">Startups</Link>
          <Link href="/fundraising-guide">Guide</Link>
        </div>
        <div className="flex flex-col gap-3 flex-1 text-brand-gray-400">
          {" "}
          Company
          <Link href="/pricing">Pricing</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">F.A.Q.</Link>
        </div>
        <div className="flex flex-col gap-3 flex-1 text-brand-gray-400">
          {" "}
          Info
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="flex flex-col gap-3 flex-1 text-brand-gray-400">
          {" "}
          Top lists
          <Link href="/investors?pre-selected=eyJ0eXBlIjpbImFnaSJdLCJzdGFnZSI6WyJwcyJdLCJpbmR1c3RyaWVzIjpbImFpIl19">
            AI Pre-seed angels
          </Link>
          <Link href="/investors?pre-selected=eyJpbmR1c3RyaWVzIjpbInNhcyJdLCJzdGFnZSI6WyJzIl0sInR5cGUiOlsidmMiXX0">
            SaaS seed VCs
          </Link>
          <Link href="/investors?pre-selected=eyJzdGFnZSI6WyJzIl0sImluZHVzdHJpZXMiOlsiZnQiXSwidHlwZSI6WyJ2YyJdfQ">
            FinTech Pre-seed VCs
          </Link>
          <Link href="/investors?pre-selected=eyJ0eXBlIjpbImFnaSJdLCJzdGFnZSI6WyJzIl0sImluZHVzdHJpZXMiOlsiaGMiXX0">
            HealthCare Seed Angels
          </Link>
        </div>
      </div>
      <p className="font-medium !text-brand-gray-600">
        Designed by{" "}
        <a
          className="text-white"
          href="https://homebased.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home Based Studio
        </a>
        , developed by{" "}
        <a
          className="text-white"
          href="https://happy-vibes.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Happy Vibes
        </a>
      </p>
      <p>© 2025 Raizer. All rights reserved.</p>
    </section>
  );
}
