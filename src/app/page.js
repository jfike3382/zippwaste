import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Zippwaste: Find Investors, Pitch Them, Raise Money",
  description:
    "Discover top investors, fundraising strategies, and expert guides to scale your startup successfully.",
  url: "/",
  keywords:
    "startup fundraising, venture capital, find investors, startup growth, funding strategies, investor database",
});

export default async function Page() {
  return (
    <main className="main-container">
      <PageWrapper />
    </main>
  );
}
