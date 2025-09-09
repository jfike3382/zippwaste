import companiesSlugs from "@/data/companies-slugs.json";

const URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zippwaste.com";
const MAX_URLS_PER_SITEMAP = 40000; // changed from 50000

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
  const companiesUrls = companiesSlugs
    .slice(0, MAX_URLS_PER_SITEMAP)
    .map((slug) => `${URL}/company/${slug.replace(/&/g, "&amp;")}`);

  // Fallback: If no URLs, return a valid empty sitemap
  const xmlContent = generateSitemapXml(
    companiesUrls.length ? companiesUrls : []
  );

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export const dynamic = "force-static";
