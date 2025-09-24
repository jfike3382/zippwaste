import Link from "next/link";
import FacebookIcon from "@/uikit/icons/facebook";
import TikTokIcon from "@/uikit/icons/tiktok";
import LinkedInIcon from "@/uikit/icons/linkedin";
import InstagramIcon from "@/uikit/icons/instagram";
import ClaimListing from "./claim-listing";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-16 p-16 bg-neutral-950 text-white items-center max-md:px-5 max-md:items-start">
      <div className="max-w-5xl flex flex-row gap-8 w-full max-md:flex-col max-md:items-start">
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Company</span>
            <Link href="/blog">Blog</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/register">Add my listing</Link>
            <ClaimListing />
          </div>{" "}
        </div>
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Info</span>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>{" "}
        </div>
        <div className="flex flex-col gap-3 flex-1 items-center">
          <div className="flex flex-col gap-3 items-start">
            <span className="text-neutral-400">Follow Us</span>
            <Link
              href="https://www.facebook.com/profile.php?id=61579791359160"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <FacebookIcon size={20} />
              Facebook
            </Link>
            <Link
              href="https://www.tiktok.com/@zippwaste"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <TikTokIcon size={20} />
              TikTok
            </Link>
            <Link
              href="https://www.linkedin.com/company/zippwaste/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <LinkedInIcon size={20} />
              LinkedIn
            </Link>
            <Link
              href="https://www.instagram.com/zippwaste?igsh=cDY5MG9rZ2dlb2Vi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <InstagramIcon size={20} />
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <p>© 2025 Zippwaste. All rights reserved.</p>
    </footer>
  );
}
