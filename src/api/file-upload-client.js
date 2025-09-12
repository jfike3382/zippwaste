import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_FILE_UPLOAD_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export async function CompanyLogo(data) {
  return apiRequest(`company_logo`, "POST", data, true);
}
