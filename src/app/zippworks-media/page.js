import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Website Creation — Zippworks Media",
  description:
    "Explore Zippworks Media pricing and unlock full access to investors, fundraising tools, and exclusive features.",
  url: "/zippworks-media",
  keywords: "Zippworks Media pricing, Zippworks Media features",
});

export default function Page() {
  return (
    <main className="main-container">
      <PageWrapper />
    </main>
  );
}
