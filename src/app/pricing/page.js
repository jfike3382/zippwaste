import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Pricing — Zippwaste",
  description:
    "Explore Zippwaste pricing and unlock full access to investors, fundraising tools, and exclusive features.",
  url: "/pricing",
  keywords:
    "Zippwaste pricing, startup tools, investor database, fundraising plans, Zippwaste features",
});

export default function Page() {
  return (
    <main className="main-container">
      <PageWrapper />
    </main>
  );
}
