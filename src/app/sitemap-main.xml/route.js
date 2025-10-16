import blogPosts from "@/data/blog-content.json";

const URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zippwaste.com";

function generateSitemapXml(urls) {
  const lastModified = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`
    )
    .join("")}
</urlset>`;
}

export async function GET() {
  const staticRoutes = [
    "",
    "/login",
    "/register",
    "/forgot-password",
    "/companies",
    "/pricing",
    "/blog",
    "/privacy-policy",
    "/terms-of-use",
  ].map((route) => `${URL}${route}`);

  const blogRoutes = blogPosts.map((post) => `${URL}/blog/${post.slug}`);

  const allUrls = [...staticRoutes, ...blogRoutes];

  const xmlContent = generateSitemapXml(allUrls);

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
    },
  });
}

export const dynamic = "force-static";
