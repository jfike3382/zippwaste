export const runtime = "edge";

import { cache } from "react";
import { notFound } from "next/navigation";

import { UserState } from "@/utils/server-user-state";

import { SoloApi } from "@/api/data-client";
import PageWrapper from "./page-wrapper";
import Metadata from "@/utils/seo-metadata/company-profile";

const getProfile = cache(async (slug) => {
  const { isCustomer } = await UserState();
  try {
    let response;
    if (isCustomer) {
      response = await SoloApi.investorPrivate(slug);
    } else {
      response = await SoloApi.investor(slug);
    }
    return response;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  params = await params;
  const data = await getProfile(params.slug);
  return Metadata(data?.main_data, params.slug);
}

export default async function Page({ params }) {
  params = await params;
  const data = await getProfile(params.slug);

  if (!data?.main_data) {
    notFound();
  }

  return (
    <main>
      <PageWrapper item={data.main_data} similar={data.similar} />
    </main>
  );
}
