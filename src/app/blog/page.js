import { cache } from "react";
import { TableApi } from "@/api/data-client";
import PageWrapper from "./page-wrapper";
import generateMetadata from "@/utils/seo-metadata/static";
import Footer from "@/components/global-elements/footer";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Read expert insights, fundraising strategies, and growth hacks for startups. Stay ahead with the latest trends.",
  url: "/blog",
  keywords:
    "startup blog, founder tips, fundraising strategies, growth hacking, venture capital insights, startup news",
});

const getBlogPosts = cache(async () => {
  try {
    const response = await TableApi.blogPosts();
    return response.main_data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
});

export default async function Page() {
  const data = await getBlogPosts();

  return (
    <>
      <main>
        <div className="flex min-h-screen">
          <div className="flex flex-1 ">
            <PageWrapper posts={data || []} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
