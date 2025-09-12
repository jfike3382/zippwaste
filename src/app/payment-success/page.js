import PageWrapper from "./page-wrapper";

// Add generateMetadata for robots meta tag
export function generateMetadata() {
  return {
    robots: "noindex, nofollow",
  };
}

export default function Page() {
  return (
    <main>
      <PageWrapper />
    </main>
  );
}
