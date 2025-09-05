import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Pricing — Ziipwaste",
  description:
    "Explore Ziipwaste pricing and unlock full access to investors, fundraising tools, and exclusive features.",
  url: "/pricing",
  keywords:
    "Ziipwaste pricing, startup tools, investor database, fundraising plans, Ziipwaste features",
});

export default function Page() {
  return (
    <main className="main-container">
      <PageWrapper />
    </main>
  );
}
