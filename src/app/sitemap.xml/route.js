const URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zippwaste.com";

export async function GET() {
  const sitemapFiles = ["sitemap-main.xml", "sitemap-companies.xml"];
  const lastModified = new Date().toISOString();

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapFiles
    .map(
      (file) => `
  <sitemap>
    <loc>${URL}/${file}</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>`
    )
    .join("")}
</sitemapindex>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export const dynamic = "force-static";
