import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_FILE_UPLOAD_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export async function StartupLogo(data) {
  return apiRequest(`startup_submission/startup_logo`, "POST", data, true);
}

export async function ContactLogo(data) {
  return apiRequest(`startup_submission/contact_logo`, "POST", data, true);
}

export function UserLogo(data) {
  return apiRequest(`settings/user_logo`, "POST", data, true);
}
