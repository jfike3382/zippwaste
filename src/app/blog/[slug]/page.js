export const runtime = "edge";

import { cache } from "react";
import { notFound } from "next/navigation";
import { SoloApi } from "@/api/data-client";
import Metadata from "@/utils/seo-metadata/blog-post";


import PageWrapper from "./page-wrapper";
import Footer from "@/components/global-elements/footer"


const getBlogPost = cache(async (slug) => {
  try {
    const response = await SoloApi.blogPost(slug);
    return response;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  params = await params;
  const data = await getBlogPost(params.slug);
  return Metadata(data?.main_data, params.slug);
}

export default async function Page({ params }) {
  params = await params;
  const data = await getBlogPost(params.slug);

  if (!data?.main_data) {
    notFound();
  }

  return (
    <>
      <main>
        <PageWrapper post={data.main_data} />
      </main>
      <Footer />
    </>
  );
}
