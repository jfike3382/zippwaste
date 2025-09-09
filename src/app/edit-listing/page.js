import PageWrapper from "./page-wrapper";
import generateMetadata from "@/utils/seo-metadata/static";

export const metadata = generateMetadata({
  title: "Edit Listing - Zippwaste",
  description:
    "Edit your listing details, access analytics, and increase your incoming traffic.",
  url: "/edit-listing",
  keywords: "edit listing, update listing",
});

export default function Page() {
  return (
    <main>
      <PageWrapper />
    </main>
  );
}
