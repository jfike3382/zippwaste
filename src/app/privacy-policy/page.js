import PageWrapper from "./page-wrapper";
import generateMetadata from "@/utils/seo/metadata";

export const metadata = generateMetadata({
  title:
    "Stroke - Your personal AI. Create anything with AI that sounds (and feels) like you",
  description:
    "Train your own AI and use it for anything. Work on docs, craft content, or write an entire book with your digital AI twin.",
  url: "/privacy-policy",
  keywords:
    "Stroke, AI desktop app, content creation, AI writing tool, creative workflow, desktop AI, train AI, personal AI",
});

export default function Page() {
  return (
    <main>
      <PageWrapper />
    </main>
  );
}
