import generateMetadata from "@/utils/seo-metadata/static";
import PageWrapper from "./page-wrapper";

export const metadata = generateMetadata({
  title: "Settings",
  description:
    "Update your account details, manage preferences, and customize your experience on the platform.",
  url: "/settings",
  keywords:
    "account settings, profile management, user preferences, investor platform settings",
});

export default function Page() {
  return (
    <main className="main-container items-center">
      <PageWrapper />
    </main>
  );
}
