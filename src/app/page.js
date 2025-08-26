import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Business Directory by Zip Code | Search, Filter & Connect",
  description:
    "Discover local businesses by zip code with advanced search and filters. Claim your listing, manage memberships, and grow visibility with our custom online directory.",
  url: "/",
  keywords:
    "business directory, search by zip code, company listings, local businesses, directory platform, Wized Xano Webflow Memberstack, custom directory, claim business listing, membership tiers",
});

export default async function Page() {
  return (
    <main className="main-container">
      <PageWrapper />
    </main>
  );
}
