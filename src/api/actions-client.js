import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_ACTIONS_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

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
};
