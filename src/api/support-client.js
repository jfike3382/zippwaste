import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_SUPPORT_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export async function SubmitContactForm(data) {
  return apiRequest("/contact_form/submit", "POST", data);
}

export async function SubmitFeaturingInvestorForm(data) {
  return apiRequest("/contact_form/featured_investor", "POST", data);
}

// Settings APIs
export const SettingsApi = {
  getUserInfo: () => {
    return apiRequest(`settings/get_info`, "GET", null, true);
  },

  changeEmail: (data) => {
    return apiRequest(`settings/change_email`, "POST", data, true);
  },

  changeName: (data) => {
    return apiRequest(`settings/change_name`, "POST", data, true);
  },

  changePassword: (data) => {
    return apiRequest(`settings/change_password`, "POST", data, true);
  },

  googleConnect: (data) => {
    return apiRequest(`google/connect`, "POST", data, true);
  },

  googleDisconnect: (data) => {
    return apiRequest(`google/disconnect`, "POST", data, true);
  },
};

// Auth APIs
export const AuthApi = {
  getMe: () => {
    return apiRequest(`/auth/me`, "GET", null, true);
  },
};