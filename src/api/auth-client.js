import createApiClient from "@/api/api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
const apiRequest = createApiClient(API_BASE_URL);

export async function LoginOrRegister(data) {
  return apiRequest("auth/login_register", "POST", {
    name: data.name,
    email: data.email,
    password: data.password,
    auth_type: data.auth_type,
    utm_source: data.utm_source,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
  });
}

export async function GoogleContinue(data) {
  return apiRequest("/soc_auth/google", "POST", {
    code: data.code,
    redirect_uri: data.redirect_uri,
    utm_source: data.utm_source,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
  });
}

export async function PassRequestCode(data) {
  return apiRequest("pass/request_code", "POST", {
    email: data.email,
  });
}

export async function PassVerifyCode(data) {
  return apiRequest("pass/verify_code", "POST", {
    email: data.email,
    one_time_code: data.verification_code,
  });
}

export async function PassSetNewPass(data) {
  return apiRequest("pass/reset_pass", "POST", {
    email: data.email,
    new_password: data.new_password,
  });
}
