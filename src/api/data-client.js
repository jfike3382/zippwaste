import createApiClient from "./api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_DATA_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export const SoloApi = {
  company: (slug) => {
    const headers = {
      "X-Secret-Key": process.env.CRON_SECRET_KEY,
    };
    return apiRequest(`solo/company/${slug}`, "GET", null, false, headers);
  },

  blogPost: (slug) => {
    return apiRequest(`solo/blog_post/${slug}`, "GET", null, false);
  },
};

export const TableApi = {
  companies: (filters = {}) => {
    return apiRequest("table/companies", "POST", filters, false);
  },

  blogPosts: (filters = {}) => {
    return apiRequest("table/blog_posts", "GET", null, false);
  },
};
