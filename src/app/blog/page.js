import { TableApi } from "@/api/data-client";
import PageWrapper from "./page-wrapper";
import generateMetadata from "@/utils/seo-metadata/static";
import Footer from "@/components/global-elements/footer";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

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
  // Set comprehensive no-cache headers
  const headersList = headers();

  // Add cache control headers for all levels
  const response = new Response();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Cloudflare-CDN-Cache-Control", "no-store");

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
