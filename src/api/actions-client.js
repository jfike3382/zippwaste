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

// Listing APIs
export const ListingApi = {
  getCompanyInfo: () => {
    return apiRequest(`listing/get_info`, "GET", null, true);
  },

  editCompanyInfo: (data) => {
    return apiRequest(`listing/edit_info`, "POST", data, true);
  },

  publishCompany: () => {
    return apiRequest(`listing/publish`, "POST", null, true);
  },

  unlistCompany: () => {
    return apiRequest(`listing/unlist`, "POST", null, true);
  },

  claimListing: (data) => {
    return apiRequest(`listing/claim`, "POST", data, false);
  },
};

// Support APIs
export const SupportApi = {
  SubmitContactForm: (data) => {
    return apiRequest(`support/contact_us`, "POST", data, false);
  },
};
