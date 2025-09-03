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
  setCookie("user_pricing_package", user.pricing_package);
  setCookie("user_logo", user.logo?.url || "");
  if (user.company_page) {
    setCookie("user_company", user.company_page);
  }
  window.location.href = authPaths.includes(currentPath) ? "/" : currentPath;
};

export const logout = () => {
  removeCookie("auth_token");
  removeCookie("user_email");
  removeCookie("user_name");
  removeCookie("user_pricing_package");
  removeCookie("user_export_credits");
  removeCookie("user_ai_credits");
  removeCookie("user_logo");
  removeCookie("user_company");
  window.location.href = "/";
};
