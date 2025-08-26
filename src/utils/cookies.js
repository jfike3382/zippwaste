import Cookies from "js-cookie";
export { Cookies };

const defaultOptions = { secure: true, sameSite: "Strict" };

export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name) => Cookies.get(name) || null;

export const removeCookie = (name, options = {}) => {
  Cookies.remove(name, options);
};

export const setAuthCookies = (user, auth_token) => {
  const authPaths = ["/login", "/forgot-password", "/register"];
  const currentPath = window.location.pathname;

  setCookie("auth_token", auth_token);
  setCookie("user_email", user.email);
  setCookie("user_name", user.name);
  setCookie("user_pricing_plan", user.pricing_plan);
  setCookie("user_export_credits", user.export_credits);
  setCookie("user_ai_credits", user.ai_credits);
  setCookie("user_logo", user.logo?.url || "");
  if (user.startup_page) {
    setCookie("user_startup", user.startup_page);
  }
  window.location.href = authPaths.includes(currentPath) ? "/" : currentPath;
};

export const logout = () => {
  removeCookie("auth_token");
  removeCookie("user_email");
  removeCookie("user_name");
  removeCookie("user_pricing_plan");
  removeCookie("user_export_credits");
  removeCookie("user_ai_credits");
  removeCookie("user_logo");
  removeCookie("user_startup");
  window.location.href = "/";
};
