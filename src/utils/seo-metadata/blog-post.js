export default function Metadata(item, slug) {
  if (!item) {
    return {
      title: "Blog Post Not Found | Zippwaste",
      description: "This blog post could not be found.",
    };
  }
  return generateBlogPostMetadata(item, slug);
}

function generateBlogPostMetadata(item, slug) {
  return {
    title: `${item.name} – Zippwaste`,
    description: item.subtitle || `Default blog description.`,
    openGraph: {
      title: `${item.name} – Zippwaste`,
      description: item.subtitle || `Default blog description.`,
      images: item.logo?.url ? [{ url: item.logo.url }] : [],
      url: `https://zippwaste.com/blog/${slug}`,
      type: "article",
    },
    images: item?.cover_image ? [{ url: item.cover_image?.url }] : [],
    alternates: {
      canonical: `https://zippwaste.com/blog/${slug}`,
    },
    keywords: `${item.name}, blog, tips, strategies, growth, dumpster rentals, junk removals`,
  };
}
