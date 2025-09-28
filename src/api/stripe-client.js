import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_STRIPE_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export async function ManageSubscription(data) {
  return apiRequest("/checkout/subscription", "POST", data, true);
}

export async function ZippWorksMediaSubscription(data) {
  return apiRequest("/checkout/zippworks_media", "POST", data, true);
}
