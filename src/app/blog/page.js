import { TableApi } from "@/api/data-client";
import PageWrapper from "./page-wrapper";
import generateMetadata from "@/utils/seo-metadata/static";
import Footer from "@/components/global-elements/footer";
import { headers } from "next/headers";

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Read expert insights, fundraising strategies, and growth hacks for startups. Stay ahead with the latest trends.",
  url: "/blog",
  keywords:
    "startup blog, founder tips, fundraising strategies, growth hacking, venture capital insights, startup news",
});

const getBlogPosts = async () => {
  try {
    const response = await TableApi.blogPosts();
    return response.main_data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
};

export default async function Page() {
  // Set no-cache headers
  const headersList = headers();

  const data = await getBlogPosts();

  return (
    <>
      <main>
        <div className="flex flex-1 ">
          <PageWrapper posts={data || []} />
        </div>
      </main>
      <Footer />
    </>
  );
}
