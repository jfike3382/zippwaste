export default function Metadata(item, slug) {
  if (!item) {
    return {
      title: "Profile Not Found | Zippwaste",
      description: "This profile could not be found.",
    };
  }
  return generateCompanyMetadata(item, slug);
}

function generateCompanyMetadata(item, slug) {
  return {
    title: `${item.name} – Zippwaste`,
    description: item.tagline || `${item.name} company profile on Zippwaste`,
    openGraph: {
      title: `${item.name} – Zippwaste`,
      description: item.tagline || `${item.name} company profile on Zippwaste`,
      images: item.logo?.url ? [{ url: item.logo.url }] : [],
      url: `https://zippwaste.com/company/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://zippwaste.com/company/${slug}`,
    },
    keywords: `${item.name} company page, fundraising, detailed info, contacts, reviews, founders`,
  };
}
