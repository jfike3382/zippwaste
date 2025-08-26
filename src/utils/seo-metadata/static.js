export default function createMetadata({
  title,
  description,
  url,
  type = "website",
  keywords = "",
}) {
  const baseUrl = "https://raizer.app";
  const canonicalUrl = `${baseUrl}${url}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type,
      images: [
        {
          url: "https://pub-94a22c498b47418da8c19468f92b9e47.r2.dev/zippwaste_snippet.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}
